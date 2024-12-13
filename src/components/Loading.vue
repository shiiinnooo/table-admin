<template>
    <div v-if="show" class="w-screen h-screen absolute items-center flex z-50" style="background: rgba(200, 200, 200, 0.35)">
        <ProgressSpinner />
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue' 
import bus from '@/utils/mitt'

const show = ref(false)

onMounted(() => {
    bus.on("handleLoadingShow", () => {
        show.value = true
    })
    bus.on("handleLoadingHide", () => {
        show.value = false
    })
})

onUnmounted(() => {
	bus.off('handleLoadingShow')
    bus.off('handleLoadingHide')
})

</script>