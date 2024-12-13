<template>
    <router-view />
    <Response />
    <Loading />
</template>

<script setup>
import API from '@/api'

import Response from '@/components/Response.vue'
import Loading from '@/components/Loading.vue'

API.init()
</script>