<template>
    <div class="w-100 h-100">
        <div v-if="error" class="text-danger text-center">{{ error }}</div>
        <template v-else>
            <div id="loader" v-if="reportFile == null">
                <clip-loader :loading="reportFile == null" size="15vh"></clip-loader>
            </div>
            <div v-else>
                <button class="btn btn-outline-dark mb-4 d-block" @click="downloadReport()">
                    <font-awesome-icon icon="cloud-download-alt" /> Descargar
                </button>
                <div id="download-files">
                    <template
                        v-for="(filename, i) in filenames"
                        :key="filename"
                    ><a
                            :href="`/#${$route.path}/${filename}`" target="_blank"
                            class="mx-1"
                        >{{ filename }}</a>
                        <br v-if="(i+1) % 7 === 0">
                    </template>
                </div>
            </div>
            <iframe id="iframe" ref="iframe" class="w-100 h-100"></iframe>
        </template>
    </div>
</template>

<script>
import Api from '../Api'
import Utils from "@/Utils";
import ErrorMessage from "@/ErrorMessage";

export default {
    name: 'Report',
    data: () => ({
        error: null,
        report: null,
        reportFile: null,
        filenames: [
            'jobinfo.csv', 'seqdata.csv', 'identification.csv', 'mlst.csv', 'resistome.csv',
            'virulome.csv', 'assembly.csv', 'reference.csv', 'core.csv', 'core.newick',
            'snpdist.csv', 'pan.csv', 'tools.csv', 'databases.csv'
        ]
    }),
    methods: {
        downloadReport() {
            if (this.reportFile != null) Utils.download(this.reportFile, `${this.report.name}.html`)
        },
        getReportHTML() {
            const vm = this
            Api.getReportHTML(this.$route.params.id, this.$store.getters.token)
                .then(response => {
                    document.getElementById('content').style.height = '100vh'
                    vm.$refs.iframe.src = URL.createObjectURL(response.data)

                    vm.$refs.iframe.addEventListener("load", function() {
                        vm.$refs.iframe.contentWindow.document.getElementsByTagName('h1')[0].innerText = vm.report.name
                        let iframe = vm.$refs.iframe.contentWindow.document
                        let cells = iframe.getElementById('jobinfo').getElementsByTagName('td')
                        cells[cells.length - 1].innerText = window.location.href

                        iframe.body.innerHTML = vm.replaceLinks(iframe.body.innerHTML)

                        vm.reportFile = response
                        vm.reportFile.data = iframe.documentElement.innerHTML
                        vm.$refs.iframe.style.display = 'initial'
                    })
                })
                .catch(e => {
                    if (e.response.status === 401) {
                        vm.$store.dispatch('logout')
                        vm.$router.push('/login')
                    } else {
                        vm.error = 'El informe no se pudo cargar.'
                    }
                })
        },
        replaceLinks(html) {
            this.filenames.forEach(name => {
                html = html.replace(`<span class="file-download-bar">Download:  <a href="${name}" class="file-download">⬇${name}</a></span>`, '')
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
                vm.$refs.iframe.style.display = 'none'
                vm.report = response.data
                vm.getReportHTML()
            })
            .catch(e => {
                if (e.response.status === 401) {
                    vm.$store.dispatch('logout')
                    vm.$router.push('/login')
                } else {
                    vm.error = ErrorMessage.getResource(e.response.status)
                }
            })
    },
    unmounted() {
        document.getElementById('content').style.height = 'inherit'
    }
}
</script>

<style scoped>
#download-files {
    max-width: 100%;
    overflow: scroll;
}

#loader {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
</style>