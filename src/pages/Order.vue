<template>
    <div class="card">
        <div class="flex justify-between mb-5">
            <div class="font-semibold text-xl">訂單管理</div>
            <Button 
                type="button"
                icon="pi pi-trash"
                label="刪除所有訂單"
                severity="danger"
                @click="openDeleteConfirmDialog(true)"
                :disabled="!order.list.length"
            />
        </div>
        <DataTable :value="order.list" :rows="10">
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
                <template #body="{ data }">
                    <div class="flex">
                        <Button icon="pi pi-search" severity="secondary" rounded @click="openOrderModal(data.id)"></Button>
                        <Button icon="pi pi-times" severity="danger" variant="text" rounded @click="openDeleteConfirmDialog(false, data)"></Button>
                    </div>
                </template>
            </Column>
        </DataTable>
        <Paginator v-if="order.pagination?.total_pages" :first="first" :rows="10" :totalRecords="order.pagination.total_pages * 10" @page="pageChange" class="flex justify-end" />
    </div>
    <OrderModal />
</template>

<script setup>
import { onBeforeMount, onUnmounted, reactive, ref } from 'vue'
import dayjs from 'dayjs/esm'

import API from '@/api'
import Response from '@/utils/response'
import bus from '@/utils/mitt'
import Global from '@/utils/global'

import OrderModal from './components/OrderModal.vue'

const order = reactive({
    list: [],
    pagination: {}
})

const first = ref(0) // 可以記錄當前頁數，如果 20 就代表前面有 20 筆，目前第三頁（每頁 10 筆)

onBeforeMount(() => {
    getOrderList()
    bus.on('handleDeleteOrder', (id) => {
        deleteOrder(id)
    })
    bus.on('handleDeleteAllOrder', () => {
        deleteAllOrder()
    })
})

onUnmounted(() => {
    bus.off('handleDeleteOrder')
    bus.off('handleDeleteAllOrder')
})

const getOrderList = (page = 1) => {
    bus.emit("handleLoadingShow")
    API.Order.getList({ page }).then(
        (res) => {
            order.list = res.orders
            order.pagination = res.pagination
            first.value = (res.pagination.current_page - 1) * 10
            bus.emit("handleLoadingHide")
        },
        (err) => {
            bus.emit("handleLoadingHide")
        }
    )
}

const pageChange = (state) => {
    first.value = state.first
    getOrderList(state.page + 1)
}

const openOrderModal = (id) => {
    bus.emit('handleOpenOrderModal', id)
}

const openDeleteConfirmDialog = (isAll, data) => {
    bus.emit('handleShowConfirmDialog', {
        header: isAll ? '刪除所有訂單' : '刪除訂單',
        message: isAll ? '' : '確認是否刪除以下訂單？(刪除後不可復原)',
        item: isAll ? '確認是否刪除所有訂單？(刪除後不可復原)' : data.id,
        payload: isAll ? '' : data.id,
        confirmFunction: isAll ? 'handleDeleteAllOrder' : 'handleDeleteOrder'
    })
}

const deleteOrder = (id) => {
    bus.emit('handleLoadingShow')
    API.Order.delete(id).then(
        (res) => {
            bus.emit('handleCloseConfirmDialog')
            getOrderList(first.value / 10 + 1)
            Response.success(res.message)
        },
        (err) => {
            Response.error(err.message)
            bus.emit('handleLoadingHide')
        }
    )
}

const deleteAllOrder = () => {
    bus.emit('handleLoadingShow')
    API.Order.deleteAll().then(
        (res) => {
            bus.emit('handleCloseConfirmDialog')
            getOrderList()
            Response.success(res.message)
        },
        (err) => {
            Response.error(err.message)
            bus.emit('handleLoadingHide')
        }
    )
}
</script>