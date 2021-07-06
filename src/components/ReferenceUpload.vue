<template>
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

export default {
    name: "ReferenceUpload",
    methods: {
        chooseFile() {
            this.$refs.fileInput.click()
        },
        upload() {
            if (this.$refs.fileInput.files.length < 1) return
            this.$store.dispatch('uploadReference', this.$refs.fileInput.files[0])
        }
    },
}
</script>

<style scoped>
</style>