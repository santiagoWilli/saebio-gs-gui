<template>
    <div>
        <Table :headers="headers">
            <tr
                v-for="sequence in sequences"
                :key="getId(sequence)"
                @click="goToSequenceWithId(getId(sequence))"
                @mouseover="hoveredTr = getId(sequence)"
                @mouseleave="hoveredTr = null"
                :class="{ 'table-secondary cursor-pointer': hovered === getId(sequence) }"
            >
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

export default {
    name: 'Sequences',
    components: {Table},
    data() {
        return {
            headers: ['Nombre original', 'Fecha', 'Trimmed'],
            hoveredTr: null
        }
    },
    computed: {
        ...mapGetters(['sequences']),
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
        }
    },
    mounted() {
        this.$store.dispatch('getSequences')
            .then(r => {
                if (!r) this.$router.push('/login')
            })
    }
}
</script>

<style scoped>
    .cursor-pointer {
        cursor: pointer;
    }
</style>
