<template>
    <div v-if="show" class="w-screen h-screen fixed top-0 bottom-0 left-0 right-0 items-center flex" style="background: rgba(200, 200, 200, 0.35); z-index: 2000">
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