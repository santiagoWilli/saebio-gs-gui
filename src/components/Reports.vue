<template>
    <div>
        <div class="d-flex justify-content-between">
            <router-link to="/report/new" class="btn btn-outline-dark mb-3" href="">Nuevo</router-link>
            <div class="d-flex">
                <div>
                    <label for="strain">Mes</label>
                    <select id="month" v-model="month" class="mx-1" @change="updateReports">
                        <option
                            v-for="n in 12"
                            :key="`month${n}`"
                            :value="n"
                        >{{ n }}</option>
                    </select>
                </div>
                <div>
                    <label for="strain">Año</label>
                    <select id="year" v-model="year" class="mx-1" @change="updateReports">
                        <option
                            v-for="n in currentYear()"
                            :key="`year${n}`"
                            :value="yearFrom(n)"
                        >{{ yearFrom(n) }}</option>
                    </select>
                </div>
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
            strainId: null,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear()
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
        },
        currentYear() {
            return parseInt(new Date().getFullYear().toString().substring(2,4))
        },
        yearFrom(n) {
            if (n.toString().length === 1) return `200${n}`
            return n.toString().length === 2 ? `20${n}` : `2${n}`
        },
        updateReports() {
            this.$store.dispatch('getReports', { year: this.year, month: this.month })
                .then(r => {
                    if (!r) {
                        this.$store.dispatch('logout')
                        this.$router.push('/login')
                    }
                })
        }
    },
    mounted() {
        this.updateReports()
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
