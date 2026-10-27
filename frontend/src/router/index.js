
import { createRouter, createWebHistory } from 'vue-router'

import {HomeAdminView, HomeUserView} from "../views/index.js";
const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeUserView,
    },
    {
        path: '',
        name: 'home',
        component: HomeUserView,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
