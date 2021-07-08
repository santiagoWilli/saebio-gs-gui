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
                        .replace(/<link href="https:\/\/maxcdn\.bootstrapcdn\.com\/bootstrap\/.*" rel="stylesheet">/, '')
                        .replace('<link href="nullarbor.css" rel="stylesheet">', '')

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

<style>
#pan SVG {
    width: 100%;
    height: auto;
    font-family: sans-serif;
}

#iframe H1 {
    text-align: center;
}

.nullarbor-section {
    margin-top: 4ex;
    width: auto;
}

#iframe A.jump-home {
    font-size: smaller;
}

#iframe TT {
    font-size: smaller;
}

/*
TD:first-child {
  font-family: monospace;
  font-size: smaller;
}
*/

#iframe TABLE {
    width: 100%;
    margin: 0 auto;
    clear: both;
    border-collapse: separate;
    border-spacing: 0;
    box-sizing: content-box;
    border-bottom: 1px solid #111;
    font-size: 14px;
}

#iframe A.file-download {
    font-family: monospace;
    padding-left: 1ex;
    background: lightgray;
    border: 1pt dotted gray;
}

#iframe UL.pagination {
    font-size: smaller;
}

#iframe TH {
    background: LightGrey;
    color: Black;
}

#iframe TH, #iframe TD {
    text-align: center !important;
}

#iframe td {
    border-top: 1px solid #ddd !important;
}

/* for vertical TH elements */
#iframe DIV.vertical {
    white-space: nowrap;
    /* try different ways to make it vertical */
    -webkit-writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
    filter: flipv fliph;
    /* make it centered */
    margin-left: auto;
    margin-right: auto;
}

#iframe .binomial {
    text-align: left;
    font-family: serif;
    font-style: italic;
}

.traffic-light {
    font-size: larger;
    font-weight: bold;
}

#iframe .pass {
    color: green;
}

#iframe .fail {
    color: red;
}

#iframe .dunno {
    color: orange;
}

#iframe .dunno:hover {
    cursor: help;
}

#iframe .allele {
    font-style: italic;
}

#iframe .missing {
    color: red;
    font-weight: bold;
}

#iframe .novel {
    color: orange;
}

#iframe SPAN.legend {
    font-size: none;
    border: none;
    padding: 1ex;
}

#iframe SPAN.legend-item {
    padding-left: 3ex;
}
</style>