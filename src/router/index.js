import { createRouter, createWebHashHistory } from 'vue-router';

import AppLayout from '@/layout/AppLayout.vue';

const routes = [
    {
        path: '/',
        redirect: { path: "admin/product" },
        component: AppLayout,
        children: [
            {
                path: "admin/product",
                name: "Product",
                component: () => import('@/pages/Product.vue')
            },
            {
                path: "admin/order",
                name: "Order",
                component: () => import('@/pages/Order.vue')
            },
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: () => import('@/pages/Login.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: "NotFound",
        component: () => import('@/pages/NotFound.vue'),
    },
]

const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from) => {
    const token = JSON.parse(localStorage.getItem('access'))?.token ?? ''

    if (!token) {
        if (to.path !== '/login') return { path: '/login', replace: true }
    } else {
        if (to.path == '/login') return {
            path: '/admin/product', replace: true
        }
    }
})

export default router;
