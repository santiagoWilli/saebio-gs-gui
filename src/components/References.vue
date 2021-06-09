<template>
    <div>
        <Table :headers="headers">
            <tr
                v-for="(reference, index) in references"
                :key="index"
            >
                <td>{{ reference.strain }}</td>
                <td>{{ reference.reportName ? reference.reportName : 'Subida por el usuario' }}</td>
                <td>
                    <button class="btn" @click="downloadReference(reference)">
                        <font-awesome-icon icon="cloud-download-alt" />
                    </button>
                </td>
            </tr>
        </Table>
    </div>
</template>

<script>
import Table from "@/components/Table";
import {mapGetters} from "vuex";
import * as Api from "@/api";
import Utils from "@/Utils";

export default {
    name: 'References',
    components: {Table},
    data() {
        return {
            headers: ['Cepa', 'Generada tras el informe', 'Descargar'],
        }
    },
    computed: {
        ...mapGetters(['references'])
    },
    methods: {
        downloadReference(reference) {
            const label = `${reference.strain.$oid}.fa`
            Api.getReference(Utils.getId(reference), this.$store.getters.token)
                .then(response => {
                    Utils.download(response, label, 'text/x-fasta')
                })
        }
    },
    mounted() {
        this.$store.dispatch('getReferences')
            .then(r => {
                if (!r) this.$router.push('/login')
            })
    }
}
</script>

<style scoped>
</style>
