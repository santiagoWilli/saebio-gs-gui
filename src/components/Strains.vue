<template>
    <div>
        <div v-if="strainError" class="text-center text-danger mb-4">{{ strainError }}</div>
        <button
            class="btn btn-outline-dark mb-3"
            @click.prevent="toggleCreateStrainForm"
        >{{ showCreateStrainForm ? 'Ocultar' : 'Añadir' }}</button>

        <div v-if="showCreateStrainForm" class="border-left my-3">
            <strain-form />
        </div>

        <Table :headers="headers">
            <tr
                v-for="strain in strains"
                :key="strain._id.$oid"
                :ref="strain._id.$oid"
            >
                <td>{{ strain.name }}</td>
                <td v-if="strainEdited.id === strain._id.$oid">
                    <input type="text" @keypress.enter="editStrain" v-model="strainEdited.key">
                </td>
                <td v-else>{{ strain.keys.join(', ') }}</td>
                <td>
                    <button
                        class="btn"
                        @click="toggleEditStrain(strain)"
                    ><font-awesome-icon icon="edit" /></button>
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
import StrainForm from "@/components/StrainForm";
import Utils from "@/Utils";

export default {
    name: 'Strains',
    components: {StrainForm, Table},
    data() {
        return {
            headers: ['Nombre', 'Abreviaciones', 'Acciones'],
            showCreateStrainForm: false,
            strainEdited: {
                id: null,
                key: null
            }
        }
    },
    computed: {
        ...mapGetters(['strains']),
        ...mapGetters(['strainError'])
    },
    methods: {
        deleteStrain(strain) {
            this.$store.dispatch('deleteStrain', strain)
        },
        toggleCreateStrainForm() {
            this.showCreateStrainForm = !this.showCreateStrainForm
        },
        toggleEditStrain(strain) {
            if (this.strainEdited.id === null || this.strainEdited.id !== Utils.getId(strain)) {
                this.strainEdited.id = Utils.getId(strain)
                this.strainEdited.key = strain.keys.join(', ')
            } else {
                this.editStrain()
            }
        },
        editStrain() {
            this.strainEdited.key = this.strainEdited.key.replace(/ /g, '').split(',')
            this.$store.dispatch('editStrain', this.strainEdited)
            this.strainEdited.id = null
            this.strainEdited.key = null
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
    .border-left {
        border-left-style: solid;
        border-left-width: 0.15rem;
    }
</style>
