<template>
    <div class="card">
        <div class="flex justify-between mb-5">
            <div class="font-semibold text-xl">產品列表</div>
            <Button type="button" icon="pi pi-plus" label="新增產品" @click="openProductModal('add')" />
        </div>
        <DataTable :value="product.list" :rows="10">
            <template #empty>
                <div class="min-h-48 flex items-center">No Data</div>
            </template>
            <Column field="category" header="分類" style="min-width: 100px"></Column>
            <Column field="imageUrl" header="首圖" style="min-width: 120px !important;">
                <template #body="{ data }">
                    <Image alt="Image" preview>
                        <template #previewicon>
                            <i class="pi pi-eye"></i>
                        </template>
                        <template #image>
                            <img :src="data.imageUrl" alt="image" style="object-fit: cover !important; height: 120px !important; width: 120px !important" />
                        </template>
                        <template #preview="slotProps">
                            <img :src="data.imageUrl" alt="preview" style="max-height: 90vh" :style="slotProps.style" @click="slotProps.onClick"/>
                        </template>
                    </Image>
                </template>
            </Column>
            <Column field="title" header="產品名稱" class="font-bold" style="min-width: 240px"></Column>
            <Column field="origin_price" header="原價" style="min-width: 120px">
                <template #body="{ data }">
                    <span v-if="data.origin_price == data.price">{{ `NT. ${Global.toThousands(data.origin_price)}` }}</span>
                    <span v-else class="line-through">{{ `NT. ${Global.toThousands(data.origin_price)}` }}</span>
                </template>
            </Column>
            <Column field="price" header="售價" style="min-width: 120px">
                <template #body="{ data }">
                    <span v-if="data.origin_price == data.price">{{ `NT. ${Global.toThousands(data.price)}` }}</span>
                    <span v-else class="text-red-600">{{ `NT. ${Global.toThousands(data.price)}` }}</span>
                </template>
            </Column>
            <Column field="is_enabled" header="啟用狀態" style="min-width: 120px">
                <template #body="{ data }">
                    <Tag :value="data.is_enabled ? '啟用' : '未啟用'" :severity="data.is_enabled ? 'success' : 'secondary'" />
                </template>
            </Column>
            <Column field="action" header="功能" style="min-width: 100px">
                <template #body="{ data }">
                    <div class="flex">
                        <Button icon="pi pi-pencil" severity="secondary" rounded @click="openProductModal('edit', data)"></Button>
                        <Button icon="pi pi-times" severity="danger" variant="text" rounded @click="openDeleteConfirmDialog(data)"></Button>
                    </div>
                </template>
            </Column>
        </DataTable>
        <Paginator v-if="product.pagination?.total_pages" :first="first" :rows="10" :totalRecords="product.pagination.total_pages * 10" @page="pageChange" class="flex justify-end" />
    </div>
    <ProductModal />
</template>

<script setup>
import { onBeforeMount, onUnmounted, reactive, ref } from 'vue'

import API from '@/api'
import Response from '@/utils/response'
import bus from '@/utils/mitt'
import Global from '@/utils/global'

import ProductModal from './components/ProductModal.vue'

const product = reactive({
    list: [],
    pagination: {}
})

const first = ref(0) // 可以記錄當前頁數，如果 20 就代表前面有 20 筆，目前第三頁（每頁 10 筆)

onBeforeMount(() => {
    getProductList()

    bus.on('handleAddProduct', (info) => {
        addProduct(info)
    })
    bus.on('handleUpdateProduct', (info) => {
        updateProduct(info)
    })
    bus.on('handleDeleteProduct', (id) => {
        deleteProduct(id)
    })
})

onUnmounted(() => {
    bus.off('handleAddProduct')
    bus.off('handleUpdateProduct')
    bus.off('handleDeleteProduct')
})

const getProductList = (page = 1) => {
    bus.emit('handleLoadingShow')
    API.Product.getList({ page }).then(
        (res) => {
            product.list = res.products
            product.pagination = res.pagination
            first.value = (res.pagination.current_page - 1) * 10
            bus.emit('handleLoadingHide')
        },
        (err) => {
            Response.error(err.message)
            bus.emit('handleLoadingHide')
        }
    )
}

const pageChange = (state) => {
    first.value = state.first
    getProductList(state.page + 1)
}

const openProductModal = (mode, info = {}) => {
    bus.emit('handleOpenProductModal', {
        mode,
        info: JSON.parse(JSON.stringify(info)) // 避免傳參考影響
    })
}

const addProduct = (data) => {
    bus.emit('handleLoadingShow')
    API.Product.add({ data }).then(
        (res) => {
            bus.emit('handleCloseProductModal')
            getProductList()
            first.value = 0
            Response.success(res.message)
        },
        (err) => {
            Response.error(err.message)
            bus.emit('handleLoadingHide')
        }
    )
}

const updateProduct = (data) => {
    bus.emit('handleLoadingShow')
    API.Product.update(data.id, { data }).then(
        res => {
            bus.emit('handleCloseProductModal')
            getProductList(first.value / 10 + 1)
            Response.success(res.message)
        },
        (err) => {
            Response.error(err.message)
            bus.emit('handleLoadingHide')
        }
    )
}

const openDeleteConfirmDialog = (data) => {
    bus.emit('handleShowConfirmDialog', {
        header: '刪除產品',
        message: '確認是否刪除以下產品？(刪除後不可復原)',
        item: data.title,
        payload: data.id,
        confirmFunction: 'handleDeleteProduct'
    })
}

const deleteProduct = (id) => {
    bus.emit('handleLoadingShow')
    API.Product.delete(id).then(
        (res) => {
            bus.emit('handleCloseConfirmDialog')
            getProductList(first.value / 10 + 1)
            Response.success(res.message)
        },
        (err) => {
            Response.error(err.message)
            bus.emit('handleLoadingHide')
        }
    )
}
</script>