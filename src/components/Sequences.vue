<template>
    <div>
        <Table :headers="headers">
            <tr
                v-for="sequence in sequences"
                :key="sequence.id"
            >
                <td>{{ originalName(sequence) }}</td>
                <td>{{ sequence.sequenceDate }}</td>
                <td>{{ sequence.trimmedPair ? 'Sí' : 'No' }}</td>
            </tr>
        </Table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Table from "@/components/Table";

export default {
    name: 'Sequences',
    components: {Table},
    data() {
        return {
            headers: ['Nombre original', 'Fecha', 'Trimmed'],
        }
    },
    computed: {
        ...mapGetters(['sequences'])
    },
    methods: {
        originalName(sequence) {
            const filename = sequence.originalFilenames[0].split('_')
            return `${filename[0]}_${filename[1]}`
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
</style>
