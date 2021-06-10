import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";
import Home from "@/components/Home";
import Login from "@/components/Login";
import Sequences from "@/components/Sequences";
import References from "@/components/References";
import Sequence from "@/components/Sequence";
import Strains from "@/components/Strains";

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/sequences', component: Sequences },
    { path: '/sequences/:id', component: Sequence, name: 'Sequence' },
    { path: '/references', component: References },
    { path: '/strains', component: Strains },
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