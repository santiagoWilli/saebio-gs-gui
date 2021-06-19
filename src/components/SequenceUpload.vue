<template>
    <div
        v-if="uploadSequenceMessage"
        class="text-center mb-2"
        :class="uploadSequenceError ? 'text-danger' : 'text-success'"
    >{{ uploadSequenceMessage }}</div>
    <input
        type="file"
        ref="fileInput"
        multiple
        hidden
        @change="upload"
        accept=".gz">
    <button
        class="btn btn-outline-dark mb-3"
        @click.prevent="chooseFile"
    ><font-awesome-icon icon="cloud-upload-alt" /> Subir</button>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "SequenceUpload",
    methods: {
        chooseFile() {
            this.$refs.fileInput.click()
        },
        upload() {
            this.$store.dispatch('uploadSequence', this.$refs.fileInput.files)
        }
    },
    computed: {
        ...mapGetters(['uploadSequenceError']),
        ...mapGetters(['uploadSequenceMessage']),
    }
}
</script>

<style scoped>
</style>