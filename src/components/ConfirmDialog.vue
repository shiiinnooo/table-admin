<template>
    <Dialog 
        :header="dialog.header"
        v-model:visible="visible"
        :style="{ width: '400px' }"
        :modal="true"
        @after-hide="hide"
    >
        <div class="flex py-2">
            <i class="pi pi-exclamation-triangle mr-4" style="font-size: 2rem" />
            <div>
                <p>{{ dialog.message }}</p>
                <p class="text-red-600 mt-4">{{ dialog.item }}</p>
            </div>
        </div>
        <template #footer>
            <Button label="取消" @click="visible.value = false" severity="secondary" />
            <Button label="刪除" @click="confirm" severity="danger" autofocus />
        </template>
    </Dialog>
</template>

<script setup>
import { onBeforeMount, onMounted, onUnmounted, reactive, ref } from 'vue'
import bus from '@/utils/mitt'
import { date } from 'zod'

const visible = ref(false)

const dialog = reactive({
    header: '',
    message: '',
    item: '',
    payload: '',
    confirmFunction: ''
})

onMounted(() => {
    bus.on('handleShowConfirmDialog', (msg) => {
        Object.keys(dialog).forEach(key => {
            dialog[key] = msg[key]
        })
        visible.value = true
    })
    bus.on('handleCloseConfirmDialog', () => {
        visible.value = false
    })
})

onUnmounted(() => {
    bus.off('handleShowConfirmDialog')
    bus.off('handleCloseConfirmDialog')
})

const confirm = () => {
    bus.emit(dialog.confirmFunction, dialog.payload)
}

const hide = () => {
    Object.keys(dialog).forEach(key => {
        dialog[key] = ''
    })
}
</script>