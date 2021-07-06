<template>
    <div v-if="sequenceError">{{ sequenceError }}</div>
    <div v-else-if="sequence">
        <dl>
            <dt>Cepa</dt>
            <dd><i>{{ sequence.strain.name }}</i> {{ sequence.code }}</dd>
            <dt>Fecha de la secuencia</dt>
            <dd>{{ date(sequence.sequenceDate) }}</dd>
            <dt>Nombre de los ficheros subidos</dt>
            <dd>{{ sequence.originalFilenames.join(', ') }}</dd>
            <div v-if="sequence.genomeToolToken">
                <dt>Fecha de solicitud del trimming</dt>
                <dd>{{ date(sequence.trimRequestDate) }}</dd>
            </div>
            <dt>Archivos trimmeados</dt>
            <dd v-if="sequence.trimmedPair === false">Se produjo un error en el proceso del trimming</dd>
            <dd v-else-if="sequence.trimmedPair" class="m-0">
                <button class="btn" @click="downloadTrimmedFiles()" :disabled="downloading">Descargar</button>
                <span v-if="downloadError">Se produjo un error en la descarga. Código {{ downloadError }}</span>
            </dd>
            <dd v-else>El trimming aún está en proceso</dd>
        </dl>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Api from '../Api'
import Utils from "@/Utils";

export default {
    name: 'Sequence',
    data: () => ({
        error: null,
        downloadInProgress: false
    }),
    computed: {
        sequence() {
            return this.$store.getters.sequence
        },
        ...mapGetters(['sequenceError']),
        downloadError() {
            return this.error
        },
        downloading() {
            return this.downloadInProgress
        }
    },
    methods: {
        date(dateString) {
            const date = new Date(dateString)
            return date.toLocaleDateString();
        },
        downloadTrimmedFiles() {
            this.downloadInProgress = true
            document.getElementById('app').classList.add('cursor-progress')

            const vm = this
            const label = `${this.sequence.originalFilenames[0].split('_')[0]}.zip`
            Api.getSequenceTrimmedFiles(this.sequence._id.$oid, this.$store.getters.token)
                .then(response => {
                    Utils.download(response, label)
                }).catch(e => {
                    vm.error = e.response.status
                }).finally(() => {
                    document.getElementById('app').classList.remove('cursor-progress')
                    vm.downloadInProgress = false
            })
        }
    },
    mounted() {
        this.$store.dispatch('getSequence', this.$route.params.id)
    }
}
</script>

<style>
.cursor-progress {
    cursor: progress !important;
}
</style>
