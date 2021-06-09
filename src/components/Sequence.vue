<template>
    <div v-if="sequenceError">{{ sequenceError }}</div>
    <div v-else-if="sequence">
        <dl>
            <dt>Cepa</dt>
            <dd><i>{{ sequence.strain.name }}</i> {{ sequence.code }}</dd>
            <dt>Fecha de la secuencia</dt>
            <dd>{{ date(sequence) }}</dd>
            <dt>Nombre de los ficheros subidos</dt>
            <dd>{{ originalNames(sequence) }}</dd>
            <div v-if="sequence.genomeToolToken">
                <dt>Fecha de solicitud del trimming</dt>
                <dd>{{ date(sequence.trimRequestDate) }}</dd>
            </div>
            <dt>Archivos trimmeados</dt>
            <dd v-if="sequence.trimmedPair === false">Se produjo un error en el proceso del trimming</dd>
            <dd v-else-if="sequence.trimmedPair" class="ml-0">
                <button class="btn">Descargar</button>
            </dd>
            <dd v-else>El trimming aún está en proceso</dd>
        </dl>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'References',
    computed: {
        ...mapGetters(['sequence']),
        ...mapGetters(['sequenceError'])
    },
    methods: {
        date(dateString) {
            const date = new Date(dateString)
            return date.toLocaleDateString();
        },
        originalNames(sequence) {
            let result = ''
            for (let i in sequence.originalFilenames) result += `${sequence.originalFilenames[i]}, `
            return result.substring(0, result.length - 2)
        }
    },
    mounted() {
        this.$store.dispatch('getSequence', this.$route.params.id)
    }
}
</script>

<style scoped>
</style>
