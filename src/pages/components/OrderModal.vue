<template>
    <Dialog 
        v-model:visible="visible"
        modal 
        :header="'訂單詳情'" 
        :style="{ width: '45rem', padding: '0 0 20px 0' }"
    >
        <Card style="border: 1px solid #e0e0e0; border-radius: 4px; box-shadow: 0">
            <template #content>
                <p class="mb-2">訂單編號：{{ order.id }}</p>
                <p class="mb-2">付款狀態：
                    <Tag 
                        :severity="order.is_paid ? 'success' : 'danger'" 
                        :value="order.is_paid ? '已付款' : '未付款'"
                    />
                    <Button
                        v-if="!order.is_paid"
                        class="ml-2" label="付款連結" severity="contrast" 
                        @click="openLink(order.id)"
                    />
                </p>
                <p v-if="order.is_paid">付款時間：{{ dayjs.unix(order.paid_date).format('YYYY-MM-DD HH:mm:ss') }}</p>
            </template>
        </Card>
        <div class="flex flex-row mt-6 px-3">
            <div class="flex flex-col gap-4 w-1/2 pr-2">
                <div class="font-semibold text-lg">訂購資訊</div>
                <div class="flex flex-col gap-1">
                    <div class="flex">
                        <span class="basis-1/4 font-semibold">建立時間</span>
                        <span class="basis-3/4">{{ dayjs.unix(order.create_at).format('YYYY-MM-DD HH:mm:ss') }}</span>
                    </div>
                    <div class="flex">
                        <span class="basis-1/4 font-semibold">Email</span>
                        <span class="basis-3/4">{{ order.user?.email }}</span>
                    </div>
                    <div class="flex">
                        <span class="basis-1/4 font-semibold">姓名</span>
                        <span class="basis-3/4">{{ order.user?.name }}</span>
                    </div>
                    <div class="flex">
                        <span class="basis-1/4 font-semibold">手機</span>
                        <span class="basis-3/4">{{ order.user?.tel }}</span>
                    </div>
                    <div class="flex">
                        <span class="basis-1/4 font-semibold">地址</span>
                        <span class="basis-3/4">{{ order.user?.address }}</span>
                    </div>
                    <div class="flex">
                        <span class="basis-1/4 font-semibold">備註</span>
                        <span class="basis-3/4">{{ order.message ? order.message : '-' }}</span>
                    </div>
                </div>  
            </div>
            <div class="flex flex-col gap-4 w-1/2">
                <div class="font-semibold text-lg">訂單內容</div>
                <div class="flex flex-col gap-4">
                    <div class="flex items-center gap-4" v-for="(item, id) in order.products" :key="id">
                        <img :src="item.product.imageUrl" alt="image" style="object-fit: cover !important; height: 60px !important; width: 60px !important" />
                        <div class="flex flex-col gap-1">
                            <span>{{ item.product.title }}</span>
                            <span>價格：NT. {{ Global.toThousands(item.product.price) }}</span>
                            <span>數量：{{ item.qty }}</span>
                        </div>
                    </div>
                </div>
                <hr>
                <span class="text-end font-semibold">總計：NT. {{ Global.toThousands(order.total) }}</span>
            </div>
        </div>

    </Dialog>
</template>

<script setup>
import { ref, onBeforeMount, onUnmounted, reactive } from "vue";
import dayjs from 'dayjs/esm'

import API from '@/api'
import Response from '@/utils/response'
import bus from '@/utils/mitt'
import Global from '@/utils/global'

const visible = ref(false)

const order = reactive({
    id: '',
    create_at: '',
    is_paid: '',
    message: '',
    paid_date: '',
    products: '',
    total: '',
    user: ''
})

onBeforeMount(() => {
    bus.on("handleOpenOrderModal", (id) => {
        getOrderInfo(id)
    })
})

onUnmounted(() => {
    bus.off("handleOpenOrderModal")
})

const getOrderInfo = (id) => {
    bus.emit('handleLoadingShow')
    API.Order.getInfo(id).then(
        (res) => {
            Object.keys(order).forEach(key => {
                order[key] = res.order[key]
            })
            bus.emit('handleLoadingHide')
            visible.value = true
        },
        (err) => {
            Response.error(err.message)
            bus.emit('handleLoadingHide')
        }
    )
}

const openLink = (order_id) => {
    window.open(`https://shiiinnooo.github.io/table/#/checkout/step3/${order_id}`, '_blank');
}
</script>