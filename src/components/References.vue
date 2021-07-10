<template>
    <div>
        <div
            v-if="uploadReferenceMessage"
            class="text-center mb-2"
            :class="uploadReferenceError ? 'text-danger' : 'text-success'"
        >{{ uploadReferenceMessage }}</div>
        <div class="d-flex justify-content-between">
            <ReferenceUpload />
            <div class="d-flex">
                <div>
                    <label for="strain">Mes</label>
                    <select id="month" v-model="month" class="mx-1" @change="updateReferences">
                        <option
                            v-for="n in 12"
                            :key="`month${n}`"
                            :value="n"
                        >{{ n }}</option>
                    </select>
                </div>
                <div>
                    <label for="strain">Año</label>
                    <select id="year" v-model="year" class="mx-1" @change="updateReferences">
                        <option
                            v-for="n in currentYear()"
                            :key="`year${n}`"
                            :value="yearFrom(n)"
                        >{{ yearFrom(n) }}</option>
                    </select>
                </div>
                <div>
                    <div>
                        <label for="strain">Género y especie</label>
                        <select id="strain" v-model="strainId" class="mx-1">
                            <option :value="null">Todas</option>
                            <option
                                v-for="strain in strainsFilter"
                                :key="strain._id.$oid"
                                :value="strain._id.$oid"
                            >{{ strain.name }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <Table :headers="headers">
            <tr
                v-for="(reference, index) in references"
                :key="index"
            >
                <td><i>{{ strain(reference) }}</i> <span v-if="reference.code">{{ reference.code }}</span></td>
                <td>{{ reference.reportName ? reference.reportName : 'Subida por el usuario' }}</td>
                <td>
                    <button class="btn" @click="downloadReference(reference)">
                        <font-awesome-icon icon="cloud-download-alt" />
                    </button>
                </td>
            </tr>
        </Table>
    </div>
</template>

<script>
import Table from "@/components/Table";
import Api from "@/Api";
import Utils from "@/Utils";
import ReferenceUpload from "@/components/ReferenceUpload";
import {mapGetters} from "vuex";

export default {
    name: 'References',
    components: {ReferenceUpload, Table},
    data() {
        return {
            headers: ['Cepa', 'Generada tras el informe', 'Descargar'],
            strainId: null,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear()
        }
    },
    computed: {
        references() {
            if (this.strainId == null) return this.$store.getters.references
            return this.$store.getters.references.filter(s => s.strain.$oid === this.strainId)
        },
        strains() {
            return this.$store.getters.indexedStrains
        },
        strainsFilter() {
            return this.$store.getters.strains
        },
        ...mapGetters(['uploadReferenceError']),
        ...mapGetters(['uploadReferenceMessage'])
    },
    methods: {
        downloadReference(reference) {
            const label = `${this.strainKey(reference)}${reference.code ?? ''}.fa`
            Api.getReference(Utils.getId(reference), this.$store.getters.token)
                .then(response => {
                    Utils.download(response, label)
                })
        },
        strain(reference) {
            return this.strains[reference.strain.$oid] ? this.strains[reference.strain.$oid].name : ""
        },
        strainKey(reference) {
            return this.strains[reference.strain.$oid] ? this.strains[reference.strain.$oid].keys[0] : ""
        },
        currentYear() {
            return parseInt(new Date().getFullYear().toString().substring(2,4))
        },
        yearFrom(n) {
            if (n.toString().length === 1) return `200${n}`
            return n.toString().length === 2 ? `20${n}` : `2${n}`
        },
        updateReferences() {
            this.$store.dispatch('getReferences', { year: this.year, month: this.month })
                .then(r => {
                    if (!r) {
                        this.$store.dispatch('logout')
                        this.$router.push('/login')
                    }
                })
        }
    },
    mounted() {
        this.updateReferences()
        this.$store.dispatch('getIndexedStrains')
        this.$store.dispatch('getStrains')
    }
}
</script>

<style scoped>
</style>
