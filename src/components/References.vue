<template>
    <div>
        <div
            v-if="uploadReferenceMessage"
            class="text-center mb-2"
            :class="uploadReferenceError ? 'text-danger' : 'text-success'"
        >{{ uploadReferenceMessage }}</div>
        <div class="d-flex justify-content-between">
            <ReferenceUpload />
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
            strainId: null
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
            const label = `${this.strainKey(reference)}${reference.code}.fa`
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
        }
    },
    mounted() {
        this.$store.dispatch('getReferences')
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
</style>
