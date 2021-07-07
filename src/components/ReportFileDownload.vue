<template>
    <div class="text-center text-danger">{{ message }}</div>
</template>

<script>
import Api from "@/Api";
import Utils from "@/Utils";

export default {
    name: "ReportFileDownload",
    data: () => ({
        message: ''
    }),
    created() {
        Api.getReportFile(this.$route.params.id, this.$route.params.file, this.$store.getters.token)
            .then(response => {
                Utils.download(response, this.$route.params.file)
                window.close()
            })
            .catch(e => {
                if (e.response.status === 404) this.message =
                    `El fichero ${this.$route.params.file} del informe ${this.$route.params.id} no existe`
            })
    }
}
</script>