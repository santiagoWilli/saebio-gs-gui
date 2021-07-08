<template>
    <div v-if="requestMessage" :class="requestFailure ? 'text-danger' : 'text-success'" class="mb-3">{{ requestMessage }}</div>
    <div>
        <label for="strain">Género y especie</label>
        <select id="strain" name="strain" class="mx-2" ref="strain" @change="getSequencesAndReferences">
            <option disabled selected value="0">Selecciona un género y especie</option>
            <option
                v-for="strain in strains"
                :key="strain"
                :value="strain._id.$oid"
            >{{ strain.name }}</option>
        </select>
    </div>
    <div v-if="references.length > 0" class="mt-2">
        <label for="reference">Referencia</label>
        <select id="reference" name="reference" class="mx-2" v-model="reference">
            <option disabled selected :value="null">Selecciona una referencia</option>
            <option
                v-for="reference in references"
                :key="reference._id.$oid"
                :value="reference._id.$oid"
            >{{ reference.code ? `${strain(reference)} ${reference.code}` : reference.reportName }}</option>
        </select>
    </div>
    <div v-if="sequences.length > 0" class="mt-2">
        <span>Secuencias</span>
        <div v-for="(sequence, i) in sequences" :key="i" class="mx-3">
            <input :id="`seq${i}`" type="checkbox" :value="sequence._id.$oid" v-model="checkedSequences" class="mx-1" />
            <label :for="`seq${i}`">{{ `${strain(sequence)} ${sequence.code}` }}</label>
        </div>
    </div>
    <template v-if="references.length > 0 && sequences.length > 3">
        <button @click="requestAnalysis" class="d-block btn btn-outline-dark mt-2" :disabled="unableToRequest">Solicitar</button>
    </template>
    <div v-else class="mt-2">No puedes solicitar un informe sin disponer de un mínimo de cuatro secuencias y al menos una referencia del género y especie seleccionado</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Api from "@/Api";
import ErrorMessage from "@/ErrorMessage";

export default {
    name: "ReportForm",
    data() {
        return {
            reference: null,
            checkedSequences: [],
            requestFailure: false,
            requestMessage: null
        }
    },
    methods: {
        getSequencesAndReferences() {
            this.$store.dispatch('getSequencesWithStrain', this.$refs.strain.value)
            this.$store.dispatch('getReferencesWithStrain', this.$refs.strain.value)
        },
        strain(object) {
            return this.indexedStrains[object.strain.$oid] ? this.indexedStrains[object.strain.$oid].name : ""
        },
        requestAnalysis() {
            document.getElementById('app').classList.add('cursor-progress')
            const vm = this
            Api.requestAnalysis(this.reference, this.checkedSequences, this.$store.getters.token)
                .then(r => {
                    console.log(r.data)
                    vm.requestMessage = `Se ha solicitado correctamente el análisis. El ID del informe es ${r.data.id}`
                    vm.requestFailure = false
                })
                .catch(e => {
                    vm.requestMessage = ErrorMessage.request(e.response.status)
                    vm.requestFailure = true
                })
                .finally(() => {
                    document.getElementById('app').classList.remove('cursor-progress')
                    vm.checkedSequences = []
                    vm.reference = null
                })
        }
    },
    computed: {
        ...mapGetters(['strains']),
        ...mapGetters(['indexedStrains']),
        ...mapGetters(['references']),
        ...mapGetters(['sequences']),
        strainId() {
            return this.$refs.strain.value
        },
        unableToRequest() {
            return this.reference == null || this.checkedSequences.length < 4;
        }
    },
    mounted() {
        this.$store.dispatch('getStrains')
        this.$store.dispatch('getIndexedStrains')
        this.$store.dispatch('getSequencesWithStrain', null)
        this.$store.dispatch('getReferencesWithStrain', null)
        this.$refs.strain.value = 0
    }
}
</script>

<style scoped>
.cursor-progress {
    cursor: progress !important;
}
</style>