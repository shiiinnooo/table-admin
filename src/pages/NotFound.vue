<template>
    <FloatingConfigurator />
    <div class="flex items-center justify-center min-h-screen overflow-hidden">
        <div class="flex flex-col items-center justify-center gap-4">
            <img src="/images/table.png" alt="" width="50">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, color-mix(in srgb, var(--primary-color), transparent 60%) 10%, var(--surface-ground) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 p-[120px] flex flex-col items-center" style="border-radius: 53px">
                    <span class="text-primary font-bold text-3xl mb-5">404</span>
                    <h1 class="text-surface-900 dark:text-surface-0 font-bold text-3xl lg:text-5xl mb-4">Not Found</h1>
                    <div class="text-surface-600 dark:text-surface-200 mb-8">Requested resource is not available.</div>
                    <Button label="Back" @click="goBack" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';

const router = useRouter()

const goBack = () => {
    router.back()
}
</script>
