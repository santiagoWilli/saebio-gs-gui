<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5 px-4">
        <router-link to="/" class="navbar-brand btn">Sæbio</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div v-if="token" class="navbar-nav">
                <router-link to="/sequences" class="nav-item nav-link">Secuencias</router-link>
                <router-link to="/references" class="nav-item nav-link">Referencias</router-link>
                <router-link to="/strains" class="nav-item nav-link">Definiciones</router-link>
                <router-link to="/reports" class="nav-item nav-link">Informes</router-link>
            </div>
            <div v-if="token" id="navbar-logout">
                <button class="btn text-dark nav-item nav-link float-end" @click.prevent="logout">Cerrar sesión</button>
            </div>
            <div v-if="token == null && $route.path !== '/login'" id="navbar-login">
                <button class="btn text-dark nav-item nav-link float-end" @click.prevent="$router.push('/login')">Iniciar sesión</button>
            </div>
        </div>
    </nav>
    <div id="content">
        <router-view/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    name: 'App',
    methods: {
        ...mapActions(['readToken']),
        logout() {
            this.$store.dispatch('logout')
            this.$router.push('/')
        }
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

/*noinspection CssInvalidPropertyValue*/
#navbar-logout, #navbar-login {
    width: -moz-available;          /* WebKit-based browsers will ignore this. */
    width: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
    width: fill-available;
}
#navbar-logout > button, #navbar-login > button {
    color: rgba(0,0,0,.9)
}

#content {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}

dd {
    margin-left: 0.75rem !important;
}

.router-link-active {
    color: rgba(0,0,0,.9);
    font-weight: 500;
}
</style>
