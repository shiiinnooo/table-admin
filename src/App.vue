<template>
    <router-view />
    <Response />
    <ConfirmDialog />
    <Loading />
</template>

<script setup>
import API from '@/api'

import Response from '@/components/Response.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import Loading from '@/components/Loading.vue'

API.init()
</script>