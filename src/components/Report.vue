<template>
    <div>
        <button class="btn btn-outline-dark mb-4" @click="downloadReport()">
            <font-awesome-icon icon="cloud-download-alt" /> Descargar
        </button>
    </div>
    <iframe id="iframe" ref="iframe" class="w-100 h-100"></iframe>
</template>

<script>
import Api from '../Api'
import Utils from "@/Utils";

export default {
    name: 'Report',
    data: () => ({
        report: null,
        reportFile: null
    }),
    methods: {
        downloadReport() {
            if (this.reportFile != null) Utils.download(this.reportFile, `${this.$route.params.id}.html`)
        },
        getReportHTML() {
            const vm = this
            Api.getReportFile(this.$route.params.id, this.$store.getters.token)
                .then(response => {
                    document.getElementById('content').style.height = '100vh'
                    vm.reportFile = response
                    vm.$refs.iframe.src = URL.createObjectURL(response.data)

                    vm.$refs.iframe.addEventListener("load", function() {
                        console.log(document.getElementById('iframe').contentWindow.document)
                        vm.$refs.iframe.contentWindow.document.getElementsByTagName('h1')[0].innerText = vm.report.name
                        let cells = vm.$refs.iframe.contentWindow.document.getElementById('jobinfo').getElementsByTagName('td')
                        cells[cells.length - 1].innerText = window.location.href // Nullarbor folder path replaced
                        vm.$refs.iframe.style.display = 'initial' // show iframe
                    })
                })
        }
    },
    mounted() {
        const vm = this
        Api.getReport(this.$route.params.id, this.$store.getters.token).then(response => {
            vm.report = response.data
            vm.$refs.iframe.style.display = 'none'
            vm.getReportHTML()
        })
    },
    unmounted() {
        document.getElementById('content').style.height = 'inherit'
    }
}
</script>