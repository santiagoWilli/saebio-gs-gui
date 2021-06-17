<template>
    <div
        v-if="uploadMessage"
        class="text-center mb-2"
        :class="uploadError ? 'text-danger' : 'text-success'"
    >{{ uploadMessage }}</div>
    <input
        type="file"
        ref="fileInput"
        hidden
        @change="upload"
        accept=".fa,.gbf">
    <button
        class="btn btn-outline-dark mb-3"
        @click.prevent="chooseFile"
    ><font-awesome-icon icon="cloud-upload-alt" /> Subir</button>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "ReferenceUpload",
    methods: {
        chooseFile() {
            this.$refs.fileInput.click()
        },
        upload() {
            this.$store.dispatch('uploadReference', this.$refs.fileInput.files[0])
        }
    },
    computed: {
        ...mapGetters(['uploadError']),
        ...mapGetters(['uploadMessage']),
    }
}
</script>

<style scoped>
</style>