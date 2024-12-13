<template>
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <router-link to="/admin/product" class="layout-topbar-logo">
                <!-- <img src="/images/billows-sm-primary.png" alt="" width="48"> -->
                <span class="font-bold">TAbLe Admin</span>
            </router-link>
            <button class="layout-menu-button layout-topbar-action ml-2" @click="onMenuToggle">
                <i class="pi pi-bars"></i>
            </button>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
                <div class="relative">
                    <button
                        v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                        type="button"
                        class="layout-topbar-action layout-topbar-action-highlight"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <AppConfigurator />
                </div>
                <div class="relative">
                    <button
                        v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                        type="button"
                        class="layout-topbar-action"
                    >
                        <i class="pi pi-user"></i>
                    </button>
                    <div
                        class="config-panel hidden absolute top-[3.25rem] right-0 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]"
                    >
                        <div class="flex flex-col gap-0 rounded-border">
                            <button
                                v-ripple
                                class="relative overflow-hidden w-full border-b-3 bg-surface-0 dark:bg-surface-900 flex items-center p-3 rounded-none cursor-pointer transition-colors duration-200"
                            >
                                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2" shape="circle" />
                                <span class="inline-flex flex-col items-start">
                                    <span class="font-bold">smile0919a@gmail.com</span>
                                    <span class="text-sm">Admin</span>
                                </span>
                            </button>
                            <button
                                v-ripple
                                class="relative overflow-hidden w-full border-0 bg-surface-0 dark:bg-surface-900 hover:bg-surface-100 dark:hover:bg-surface-800 flex items-center p-3 rounded-none cursor-pointer transition-colors duration-200 border-t"
                                @click.prevent="logout"
                            >
                                <i class="pi pi-sign-out px-2"></i>
                                <span class="px-2 font-bold">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useLayout } from '@/layout/composables/layout'
import AppConfigurator from './AppConfigurator.vue'

import API from '@/api'
import Response from '@/utils/response'
import bus from '@/utils/mitt'

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout()
const router = useRouter()

const logout = () => {
    bus.emit("handleLoadingShow")
    API.Access.logout().then(
        (res) => {
            bus.emit("handleLoadingHide")
            localStorage.clear()
            router.push('/login')
        },
        (err) => {
            bus.emit("handleLoadingHide")
            Response.error(err.message)
        }
    )
}
</script>

