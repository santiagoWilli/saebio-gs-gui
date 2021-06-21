<template>
    <div>
        <Table :headers="headers">
            <tr
                v-for="(report, index) in reports"
                :key="index"
            >
                <td><i>{{ strain(report) }}</i></td>
                <td>{{ report.requestDate }}</td>
                <template v-if="report.files">
                    <td>Finalizado</td>
                    <td>
                        <button class="btn" @click="downloadReport(report)">
                            <font-awesome-icon icon="cloud-download-alt" />
                        </button>
                    </td>
                </template>
                <template v-else-if="report.files == null">
                    <td>En proceso</td>
                    <td></td>
                </template>
                <template v-else>
                    <td>Fallido</td>
                    <td v-if="report.log">
                        <button class="btn" @click="downloadReportLog(report)">
                            <font-awesome-icon icon="file-download" />
                        </button>
                    </td>
                    <td v-else></td>
                </template>
            </tr>
        </Table>
    </div>
</template>

<script>
import Table from "@/components/Table";
import {mapGetters} from "vuex";
import Api from "@/Api";
import Utils from "@/Utils";

export default {
    name: 'Reports',
    components: {Table},
    data() {
        return {
            headers: ['Cepa', 'Fecha', 'Estado', 'Descargar'],
        }
    },
    computed: {
        ...mapGetters(['reports']),
        strains() {
            return this.$store.getters.indexedStrains
        }
    },
    methods: {
        downloadReport(report) {
            const label = `${report.name}.html`
            Api.getReportFile(Utils.getId(report), this.$store.getters.token)
                .then(response => {
                    Utils.download(response, label)
                })
        },
        downloadReportLog(report) {
            const label = `${report.name}.log`
            Api.getReportLog(Utils.getId(report), this.$store.getters.token)
                .then(response => {
                    Utils.download(response, label)
                })
        },
        strain(report) {
            return this.strains[report.strain.$oid] ? this.strains[report.strain.$oid].name : ""
        }
    },
    mounted() {
        this.$store.dispatch('getReports')
            .then(r => {
                if (!r) this.$router.push('/login')
            })
        this.$store.dispatch('getIndexedStrains')
    }
}
</script>

<style scoped>
</style>
