<template>
    <div class="card">
        <div class="flex justify-between mb-5">
            <div class="font-semibold text-xl">訂單管理</div>
            <Button type="button" icon="pi pi-trash" label="刪除所有訂單" severity="danger" @click="clearFilter()" />
        </div>
        <DataTable :value="order.list" :rows="10">
            <!-- :paginator="{
                totalRecord: order.pagination.total_pages * 10
            }" -->
            <!-- 
            showGridlines
            :rows="10"
            dataKey="id"
            :rowHover="true"
            v-model:filters="filters1"
            filterDisplay="menu"
            :filters="filters1"
            :globalFilterFields="['name', 'country.name', 'representative.name', 'balance', 'status']"
            -->
            <template #empty>
                <div class="min-h-48 flex items-center">No Data</div>
            </template>
            <Column field="create_at" header="訂單建立時間" style="min-width: 200px">
                <template #body="{ data }">
                    {{ dayjs.unix(data.create_at).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </Column>
            <Column field="id" header="訂單編號" style="min-width: 220px"></Column>
            <Column field="total" header="金額" style="min-width: 150px">
                <template #body="{ data }">
                    {{ `NT. ${Global.toThousands(data.total)}` }}
                </template>
            </Column>
            <Column field="is_paid" header="付款狀態" style="min-width: 150px">
                <template #body="{ data }">
                    <Tag :value="data.is_paid ? '已付款' : '未付款'" :severity="data.is_paid ? 'success' : 'danger'" />
                </template>
            </Column>
            <Column field="paid_date" header="付款時間" style="min-width: 200px">
                <template #body="{ data }">
                    {{ data.paid_date ? dayjs.unix(data.paid_date).format('YYYY-MM-DD HH:mm:ss') : '-' }}
                </template>
            </Column>
            <Column field="action" header="功能" style="min-width: 150px">
                <template #body>
                    <div class="flex">
                        <Button icon="pi pi-search" severity="secondary" rounded></Button>
                        <Button icon="pi pi-times" severity="danger" variant="text" rounded></Button>
                    </div>
                </template>
            </Column>
        </DataTable>
        <Paginator :rows="10" :totalRecords="order.pagination.total_pages * 10" @page="pageChange" class="flex justify-end" />
    </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue'
import dayjs from 'dayjs/esm'

import API from '@/api'
import Response from '@/utils/response'
import bus from '@/utils/mitt'
import Global from '@/utils/global'

const order = reactive({
    list: [],
    pagination: {}
})

onBeforeMount(() => {
    getOrderList()
})

const getOrderList = (page = 1) => {
    bus.emit("handleLoadingShow")
    API.Order.getList({ page }).then(
        (res) => {
            console.log(res)
            order.list = res.orders
            order.pagination = res.pagination
            bus.emit("handleLoadingHide")
        },
        (err) => {
            console.log(err)
            bus.emit("handleLoadingHide")
        }
    )
}

const pageChange = (state) => {
    getOrderList(state.page + 1)
}
</script>