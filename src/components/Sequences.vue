<template>
    <div>
        <SequenceUpload />
        <Table :headers="headers">
            <tr
                v-for="sequence in sequences"
                :key="getId(sequence)"
                @click="goToSequenceWithId(getId(sequence))"
                @mouseover="hoveredTr = getId(sequence)"
                @mouseleave="hoveredTr = null"
                :class="{ 'table-secondary cursor-pointer': hovered === getId(sequence) }"
            >
                <td><i>{{ strain(sequence) }}</i> <span>{{ sequence.code }}</span></td>
                <td>{{ originalName(sequence) }}</td>
                <td>{{ date(sequence) }}</td>
                <td>{{ sequence.trimmedPair ? 'Sí' : 'No' }}</td>
            </tr>
        </Table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Table from "@/components/Table";
import Utils from "@/Utils";
import SequenceUpload from "@/components/SequenceUpload";

export default {
    name: 'Sequences',
    components: {SequenceUpload, Table},
    data() {
        return {
            headers: ['Cepa', 'Nombre original', 'Fecha', 'Trimmed'],
            hoveredTr: null
        }
    },
    computed: {
        ...mapGetters(['sequences']),
        strains() {
            return this.$store.getters.indexedStrains
        },
        hovered() {
            return this.hoveredTr
        }
    },
    methods: {
        originalName(sequence) {
            const filename = sequence.originalFilenames[0].split('_')
            return `${filename[0]}_${filename[1]}`
        },
        goToSequenceWithId(id) {
            this.$router.push({
                name: 'Sequence',
                params: { id }
            })
        },
        getId(sequence) {
            return Utils.getId(sequence)
        },
        date(sequence) {
            const date = new Date(sequence.sequenceDate)
            return date.toLocaleDateString();
        },
        strain(sequence) {
            return this.strains[sequence.strain.$oid] ? this.strains[sequence.strain.$oid].name : ""
        }
    },
    mounted() {
        this.$store.dispatch('getSequences')
            .then(r => {
                if (!r) this.$router.push('/login')
            })
        this.$store.dispatch('getIndexedStrains')
    }
}
</script>

<style scoped>
    .cursor-pointer {
        cursor: pointer;
    }
</style>
