<template>
    <div>
        <div class="d-flex justify-content-between">
            <router-link to="/report/new" class="btn btn-outline-dark mb-3" href="">Nuevo</router-link>
            <div>
                <div class="d-inline-block mx-1">
                    <label for="strain">Género y especie</label>
                    <select id="strain" v-model="strainId" class="mx-1">
                        <option :value="null">Todas</option>
                        <option
                            v-for="strain in strains"
                            :key="strain._id.$oid"
                            :value="strain._id.$oid"
                        >{{ strain.name }}</option>
                    </select>
                </div>
                <input type="text" placeholder="Buscar ID..." id="search" v-model="search">
            </div>
        </div>
        <Table :headers="headers">
            <tr
                v-for="(report, index) in reports"
                :key="index"
            >
                <td><i>{{ strain(report) }}</i></td>
                <td>{{ report._id.$oid }}</td>
                <td>{{ date(report) }}</td>
                <template v-if="report.files">
                    <td>Finalizado</td>
                    <td>
                        <router-link :to="`/reports/${report._id.$oid}`" class="btn">
                            <font-awesome-icon icon="eye" />
                        </router-link>
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
import { mapGetters } from 'vuex'
import Table from "@/components/Table";
import Api from "@/Api";
import Utils from "@/Utils";

export default {
    name: 'Reports',
    components: {Table},
    data() {
        return {
            headers: ['Género y especie', 'ID', 'Fecha', 'Estado', ''],
            search: '',
            strainId: null
        }
    },
    computed: {
        reports() {
            if (this.search.trim().length === 0) {
                if (this.strainId == null) return this.$store.getters.reports
                return this.$store.getters.reports.filter(r => r.strain.$oid === this.strainId)
            }
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.strainId = null
            return this.$store.getters.reports.filter(r => r._id.$oid.includes(this.search.trim()))
        },
        ...mapGetters(['strains']),
        indexedStrains() {
            return this.$store.getters.indexedStrains
        }
    },
    methods: {
        downloadReportLog(report) {
            const label = `${report.name}.log`
            Api.getReportLog(Utils.getId(report), this.$store.getters.token)
                .then(response => {
                    Utils.download(response, label)
                })
        },
        strain(report) {
            return this.indexedStrains[report.strain.$oid] ? this.indexedStrains[report.strain.$oid].name : ""
        },
        date(report) {
            const date = new Date(report.requestDate + ' GMT+00:00')
            return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        }
    },
    mounted() {
        this.$store.dispatch('getReports')
            .then(r => {
                if (!r) {
                    this.$store.dispatch('logout')
                    this.$router.push('/login')
                }
            })
        this.$store.dispatch('getIndexedStrains')
        this.$store.dispatch('getStrains')
    }
}
</script>

<style scoped>
#search, #strain {
    float: right;
}
</style>
