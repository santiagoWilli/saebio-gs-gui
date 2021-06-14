<template>
    <div id="login-form" class="mx-auto mt-5">
        <form @submit.prevent="login(user)">
            <div class="form-group">
                <label for="username">Nombre de usuario</label>
                <input type="text" class="form-control" id="username" v-model="user.username">
            </div>
            <div class="form-group">
                <label for="password">Nombre de usuario</label>
                <input type="password" class="form-control" id="password" v-model="user.password">
            </div>
            <button type="submit" class="btn btn-primary">Acceder</button>
        </form>
    </div>
    <div v-if="loginError" class="text-center text-danger">{{ loginError }}</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Login',
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    computed: {
        ...mapGetters(['loginError'])
    },
    methods: {
        login(user) {
            this.$store.dispatch('login', user)
                .then(r => {
                    if (r) this.$router.push('/')
                })
        }
    }
}
</script>

<style scoped>
#login-form {
    width: 60%;
}
</style>
