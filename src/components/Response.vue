<template>
    <Toast />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue' 
import { useToast } from 'primevue/usetoast'

import bus from '@/utils/mitt'

const toast = useToast()

onMounted(() => {
    bus.on("handleSetResponse", (response) => {
        setResponse(response)
    })
})

onUnmounted(() => {
	bus.off('handleSetResponse')
})

const setResponse = (msg) => {
    toast.add(msg)
}
</script>