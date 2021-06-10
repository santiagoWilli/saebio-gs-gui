<template>
    <div>
        <Table :headers="headers">
            <tr
                v-for="strain in strains"
                :key="strain._id.$oid"
            >
                <td>{{ strain.name }}</td>
                <td>{{ strain.keys.join(', ') }}</td>
                <td></td>
            </tr>
        </Table>
    </div>
</template>

<script>
import Table from "@/components/Table";
import {mapGetters} from "vuex";

export default {
    name: 'Strains',
    components: {Table},
    data() {
        return {
            headers: ['Nombre', 'Abreviaciones', 'Acciones'],
        }
    },
    computed: {
        ...mapGetters(['strains'])
    },
    mounted() {
        this.$store.dispatch('getStrains')
            .then(r => {
                if (!r) this.$router.push('/login')
            })
    }
}
</script>

<style scoped>
</style>
