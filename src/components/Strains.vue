<template>
    <div>
        <div v-if="removeStrainError" class="text-center text-danger mb-4">{{ removeStrainError }}</div>
        <Table :headers="headers">
            <tr
                v-for="strain in strains"
                :key="strain._id.$oid"
                :ref="strain._id.$oid"
            >
                <td>{{ strain.name }}</td>
                <td>{{ strain.keys.join(', ') }}</td>
                <td>
                    <button class="btn">
                        <font-awesome-icon icon="edit" />
                    </button>
                    <button class="btn" @click="deleteStrain(strain)">
                        <font-awesome-icon icon="minus-square" />
                    </button>
                </td>
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
            deleteError: null
        }
    },
    computed: {
        ...mapGetters(['strains']),
        ...mapGetters(['removeStrainError'])
    },
    methods: {
        deleteStrain(strain) {
            this.$store.dispatch('deleteStrain', strain)
        }
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
