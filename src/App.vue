<template>
    <nav v-show="token" class="navbar navbar-expand-lg navbar-light bg-light mb-5">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <router-link to="/sequences" class="nav-item nav-link active">Secuencias</router-link>
                <router-link to="/references" class="nav-item nav-link">Referencias</router-link>
            </div>
        </div>
    </nav>
    <router-view/>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    name: 'App',
    methods: {
        ...mapActions(['readToken'])
    },
    computed: {
        ...mapGetters(['token'])
    },
    created() {
        this.readToken()
    }
}
</script>

<style>
#app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
}
</style>
