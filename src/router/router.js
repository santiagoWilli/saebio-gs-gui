import { createRouter, createWebHashHistory } from 'vue-router'
import store from "@/store";
import Home from "@/components/Home";
import Login from "@/components/Login";
import Sequences from "@/components/Sequences";
import References from "@/components/References";
import Sequence from "@/components/Sequence";
import Strains from "@/components/Strains";
import Reports from "@/components/Reports";
import ReportForm from "@/components/ReportForm";

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/sequences', component: Sequences },
    { path: '/sequences/:id', component: Sequence, name: 'Sequence' },
    { path: '/references', component: References },
    { path: '/strains', component: Strains },
    { path: '/reports', component: Reports },
    { path: '/reports/new', component: ReportForm },
];

const router = createRouter({
    history: createWebHashHistory(),
    mode: 'hash',
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