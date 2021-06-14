<template>
    <form class="mx-4" @submit.prevent="createStrain">
        <div class="row g-3 align-items-center mb-2">
            <div class="col-auto">
                <label for="name">Nombre</label>
            </div>
            <div class="col-auto">
                <input type="text" class="form-control" id="name" v-model="strain.name">
            </div>
        </div>
        <div class="row g-3 align-items-center mb-2">
            <div class="col-auto">
                <label for="key">Abreviaciones</label>
            </div>
            <div class="col-auto">
                <input type="text" class="form-control" id="key" v-model="strain.key">
            </div>
        </div>
        <button type="submit" class="btn btn-sm btn-dark">Añadir</button>
    </form>
</template>

<script>
export default {
    name: "StrainForm",
    data() {
        return {
            strain: {
                name : null,
                key: null
            }
        }
    },
    methods: {
        createStrain() {
            if (this.strain.key instanceof Array) return
            this.strain.key = this.strain.key.replace(/ /g, '').split(',')
            this.$store.dispatch('createStrain', this.strain)
        }
    }
}
</script>

<style scoped>
</style>