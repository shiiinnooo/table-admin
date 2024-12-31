<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <AppMenuItem v-if="!item.separator" :item="item" :index="i"></AppMenuItem>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<script setup>
import { ref } from 'vue'

import AppMenuItem from './AppMenuItem.vue'

const model = ref([
    {
        label: '後台管理',
        items: [
            { label: '產品列表', icon: 'pi pi-fw pi-id-card', to: '/admin/product' },
            { label: '訂單管理', icon: 'pi pi-fw pi-check-square', to: '/admin/order' }
        ]
    },
])
</script>

<style lang="scss" scoped></style>
