import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/components/Home";
import Login from "@/components/Login";
import Sequences from "@/components/Sequences";
import References from "@/components/References";
import store from "@/store";

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/sequences', component: Sequences },
    { path: '/references', component: References },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path !== '/login' && store.getters.token == null) {
        next('/login')
    } else if (to.path === '/login' && store.getters.token != null) {
        next('/')
    } else {
        next()
    }
})

export default router