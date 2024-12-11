<template>
    <router-view />
</template>

<script setup>
import API from '@/api'

API.init()
</script>