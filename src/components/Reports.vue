<template>
    <div>
        <router-link to="/reports/new" class="btn btn-outline-dark mb-3" href="">Nuevo</router-link>
        <input type="text" placeholder="Buscar ID..." id="search" v-model="search">
        <Table :headers="headers">
            <tr
                v-for="(report, index) in reports"
                :key="index"
            >
                <td><i>{{ strain(report) }}</i></td>
                <td>{{ report._id.$oid }}</td>
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
import Api from "@/Api";
import Utils from "@/Utils";

export default {
    name: 'Reports',
    components: {Table},
    data() {
        return {
            headers: ['Género y especie', 'ID', 'Fecha', 'Estado', 'Descargar'],
            search: ''
        }
    },
    computed: {
        reports() {
            if (this.search.trim().length === 0) return this.$store.getters.reports
            return this.$store.getters.reports.filter(r => r._id.$oid.includes(this.search.trim()))
        },
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
#search {
    float: right;
}
</style>
