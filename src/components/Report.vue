<template>
    <div>
        <button class="btn btn-outline-dark mb-4" @click="downloadReport()">
            <font-awesome-icon icon="cloud-download-alt" /> Descargar
        </button>
    </div>
    <div id="iframe" ref="iframe" class="w-100 h-100"></div>
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
            Api.getReportHTML(this.$route.params.id, this.$store.getters.token)
                .then(response => {
                    document.getElementById('content').style.height = '100vh'
                    vm.reportFile = response
                    vm.$refs.iframe.innerHTML = response.data

                    vm.$refs.iframe.getElementsByTagName('h1')[0].innerText = vm.report.name // Nullarbor header replaced
                    let cells = document.getElementById('jobinfo').getElementsByTagName('td')
                    cells[cells.length - 1].innerText = window.location.href // Nullarbor folder path replaced

                    vm.$refs.iframe.innerHTML = vm.replaceLinks(vm.$refs.iframe.innerHTML)

                    vm.$refs.iframe.style.display = 'initial' // display report
                })
        },
        replaceLinks(html) {
            [
                'jobinfo.csv', 'seqdata.csv', 'identification.csv', 'mlst.csv', 'resistome.csv',
                'virulome.csv', 'assembly.csv', 'reference.csv', 'core.csv', 'core.newick',
                'snpdist.csv', 'pan.csv', 'tools.csv', 'databases.csv'
            ]
                .forEach(name => {
                    html = html.replace(
                        `<a href="${name}" class="file-download">⬇${name}</a>`,
                        `<a href="/#${this.$route.path}/${name}" target="_blank">⬇${name}</a>`)
                })

            return html
                .replace('<a href="http://tseemann.github.io/">Torsten Seemann</a>', '<a target="_blank" href="http://tseemann.github.io/">Torsten Seemann</a>')
                .replace('<a href="https://github.com/tseemann/nullarbor">Github</a>', '<a target="_blank" href="https://github.com/tseemann/nullarbor">Github</a>')
                .replace('<a href="https://github.com/tseemann/nullarbor/issues">Nullarbor Issue Tracker</a>', '<a target="_blank" href="https://github.com/tseemann/nullarbor/issues">Nullarbor Issue Tracker</a>')
                .replace('<a href="https://github.com/tseemann/nullarbor/#citation">latest citation</a>', '<a target="_blank" href="https://github.com/tseemann/nullarbor/#citation">latest citation</a>')
        }
    },
    mounted() {
        const vm = this
        Api.getReport(this.$route.params.id, this.$store.getters.token)
            .then(response => {
                vm.report = response.data
                vm.$refs.iframe.style.display = 'none'
                vm.getReportHTML()
            })
            .catch(e => {
                if (e.response.status === 401) {
                    this.$store.dispatch('logout')
                    this.$router.push('/login')
                }
            })
    },
    unmounted() {
        document.getElementById('content').style.height = 'inherit'
    }
}
</script>