<template>
    <router-view />
    <Response />
</template>

<script setup>
import API from '@/api'

import Response from '@/components/Response.vue'

API.init()
</script>