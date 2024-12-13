<template>
    <div class="card">
        <div class="flex justify-between mb-5">
            <div class="font-semibold text-xl">產品列表</div>
            <Button type="button" icon="pi pi-plus" label="新增產品" />
        </div>
        <DataTable :value="product.list" :rows="10">
            <template #empty>
                <div class="min-h-48 flex items-center">No Data</div>
            </template>
            <Column field="category" header="分類" style="min-width: 90px"></Column>
            <Column field="imageUrl" header="圖片" style="min-width: 120px">
                <template #body="{ data }">
                    <div :style="`
                        width: 120px; height: 120px; 
                        background: url(${data.imageUrl});
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: cover;
                    `">
                        <!-- <img :src="data.imageUrl" :alt="data.title" width="120" height="120" style="object-fit: cover"> -->
                    </div>
                </template>
            </Column>
            <Column field="title" header="產品名稱" class="font-bold" style="min-width: 240px"></Column>
            <Column field="origin_price" header="原價" style="min-width: 120px">
                <template #body="{ data }">
                    {{ `NT. ${Global.toThousands(data.origin_price)}` }}
                </template>
            </Column>
            <Column field="price" header="售價" style="min-width: 120px">
                <template #body="{ data }">
                    {{ `NT. ${Global.toThousands(data.price)}` }}
                </template>
            </Column>
            <Column field="is_enabled" header="啟用狀態" style="min-width: 120px">
                <template #body="{ data }">
                    <Tag :value="data.is_enabled ? '啟用' : '未啟用'" :severity="data.is_enabled ? 'success' : 'secondary'" />
                </template>
            </Column>
            <Column field="action" header="功能" style="min-width: 100px">
                <template #body>
                    <div class="flex">
                        <Button icon="pi pi-pencil" severity="secondary" rounded></Button>
                        <Button icon="pi pi-times" severity="danger" variant="text" rounded></Button>
                    </div>
                </template>
            </Column>
        </DataTable>
        <Paginator :first="first" :rows="10" :totalRecords="product.pagination.total_pages * 10" @page="pageChange" class="flex justify-end" />
    </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue'

import API from '@/api'
import Response from '@/utils/response'
import bus from '@/utils/mitt'
import Global from '@/utils/global'

const product = reactive({
    list: [],
    pagination: {}
})

const first = ref(0) // 可以記錄當前頁數，如果 20 就代表前面有 20 筆，目前第三頁

onBeforeMount(() => {
    getProductList()
})

const getProductList = (page = 1) => {
    bus.emit('handleLoadingShow')
    API.Product.getList({ page }).then(
        (res) => {
            console.log(res)
            product.list = res.products
            product.pagination = res.pagination
            bus.emit('handleLoadingHide')
        },
        (err) => {
            console.log(err)
            bus.emit('handleLoadingHide')
        }
    )
}

const pageChange = (state) => {
    console.log(state)
    getProductList(state.page + 1)
}
</script>