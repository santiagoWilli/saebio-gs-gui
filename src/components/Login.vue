<template>
    <div id="login-form" class="mx-auto">
        <form @submit.prevent="login(user)">
            <div class="form-group">
                <label for="username">Nombre de usuario</label>
                <input type="text" class="form-control" id="username" v-model="user.username">
            </div>
            <div class="form-group">
                <label for="password">Nombre de usuario</label>
                <input type="password" class="form-control" id="password" v-model="user.password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

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
    methods: {
        ...mapActions(['login'])
    }
}
</script>

<style scoped>
#login-form {
    width: 60%;
}
</style>
