<template>
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
export default {
    name: "SequenceUpload",
    methods: {
        chooseFile() {
            this.$refs.fileInput.click()
        },
        upload() {
            document.getElementById('app').classList.add('cursor-progress')
            this.$store.dispatch('uploadSequence', this.$refs.fileInput.files)
                .then(() => {
                    document.getElementById('app').classList.remove('cursor-progress')
                })
        }
    }
}
</script>

<style scoped>
.cursor-progress {
    cursor: progress !important;
}
</style>