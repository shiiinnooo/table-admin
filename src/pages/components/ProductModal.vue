
<template>
    <Dialog 
        v-model:visible="visible"
        modal 
        :header="mode == 'add' ? '新增產品' : '編輯產品'" 
        :style="{ width: '45rem' }"
        @after-hide="hide"
    >
        <!--  :initialValues="initialValues" @submit="onFormSubmit" -->
        <Form 
            v-slot="$form"
            :resolver="resolver"
            :initialValues="initialValues"
            :validateOnValueUpdate="['title', 'category', 'unit', 'price', 'origin_price']"
            @submit="onFormSubmit" 
            class="flex flex-col w-full gap-3"
        >
            <Message v-if="$form.price?.value > $form.origin_price?.value" size="small" icon="pi pi-exclamation-triangle" severity="warn" class="mt-1">原價不可高於售價</Message>
            <Message v-if="!productImage.imagesUrl?.length" size="small" icon="pi pi-exclamation-triangle" severity="warn" class="mt-1">請至少新增一張產品圖片</Message>
            <Tabs :value="productType">
                <TabList>
                    <Tab value="info">產品資訊</Tab>
                    <Tab value="content">產品內容</Tab>
                    <Tab value="image">產品圖片</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="info">
                        <div class="flex flex-col gap-2 w-full p-0">
                            <!-- md:flex-row -->
                            <div class="w-full">
                                <label for="title" class="block">標題</label>
                                <InputText id="title" name="title" type="text" class="w-full" />
                                <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">{{ $form.title.error.message }}</Message>
                            </div>
                            <div class="flex flex-row gap-4">
                                <div class="w-full">
                                    <label for="category">分類</label>
                                    <Select id="category" name="category" v-model="initialValues.category" :options="categoryItems" optionValue="code" optionLabel="name" placeholder="請選擇分類" class="w-full" />
                                    <Message v-if="$form.category?.invalid" severity="error" size="small" variant="simple">{{ $form.category.error.message }}</Message>
                                </div>
                                <div class="w-full">
                                    <label for="unit">單位</label>
                                    <Select id="unit" name="unit" v-model="initialValues.unit" :options="unitItems" optionValue="code" optionLabel="name" placeholder="請選擇單位" class="w-full"></Select>
                                    <Message v-if="$form.unit?.invalid" severity="error" size="small" variant="simple">{{ $form.unit.error.message }}</Message>
                                </div>
                            </div>
                            <div class="flex flex-row gap-4">
                                <div class="w-full">
                                    <label for="origin_price" class="block">原價</label>
                                    <InputNumber id="origin_price" name="origin_price" showButtons :min="1" class="w-full" />
                                    <Message v-if="$form.origin_price?.invalid" severity="error" size="small" variant="simple">{{ $form.origin_price.error.message }}</Message>
                                </div>
                                <div class="w-full">
                                    <label for="price" class="block">售價</label>
                                    <InputNumber id="price" name="price" showButtons :min="1" class="w-full" />
                                    <Message v-if="$form.price?.invalid" severity="error" size="small" variant="simple">{{ $form.price.error.message }}</Message>
                                </div>
                            </div>
                            <Divider style="margin: 10px 0;" />
                            <div class="flex items-center gap-2">
                                <Checkbox inputId="is_enabled" v-model="initialValues.is_enabled" binary name="is_enabled" />
                                <label for="is_enabled">是否啟用</label>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="content">
                        <div class="w-full p-0">
                            <label for="description" class="block">產品描述</label>
                            <Textarea id="description" name="description" rows="5" class="w-full" />
                            <Message v-if="$form.description?.invalid" severity="error" size="small" variant="simple">{{ $form.description.error.message }}</Message>
                        </div>
                    </TabPanel>
                    <TabPanel value="image">
                        <div class="p-0">
                            <div class="flex flex-wrap gap-4 mb-3">
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="uploadFileType" inputId="file" name="file" value="file" />
                                    <label for="file">選擇檔案</label>
                                </div>
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="uploadFileType" inputId="link" name="link" value="link" />
                                    <label for="link">圖片連結</label>
                                </div>
                            </div>
                            <div class="w-full mb-3 bg-slate-200 p-4 rounded" v-if="uploadFileType == 'link'">
                                <label class="block mb-1">圖片連結</label>
                                <InputGroup>
                                    <InputText placeholder="請輸入圖片連結" v-model="imageUrlInput" />
                                    <Button label="上傳連結" :disabled="!imageUrlInput" @click="addImage('link')" />
                                </InputGroup>
                            </div>
                            <div class="w-full bg-slate-200 p-4 rounded" v-if="uploadFileType == 'file'">
                                <label class="block mb-1">選擇檔案</label>
                                <div class="flex justify-between">
                                    <FileUpload ref="fileUpload" mode="basic" accept="image/*" :maxFileSize="1000000" />
                                    <Button label="上傳" @click="addImage('file')" :disabled="!fileUpload?.hasFiles" severity="secondary" />
                                </div>
                            </div>
                            <Divider />
                            <span>圖片列表</span>
                            <div class="flex flex-wrap">
                                <div 
                                    class="basis-1/3 border border-surface-200 dark:border-surface-700 rounded p-4 my-2 relative" 
                                    v-for="image in productImage.imagesUrl"
                                    :key="image"
                                    @mouseenter="iconShowUrl = image"
                                    @mouseleave="iconShowUrl = ''"
                                >
                                    <div class="bg-slate-100 flex justify-center" style="height: 150px;">
                                        <Image alt="Image" preview>
                                            <template #previewicon>
                                                <i class="pi pi-eye"></i>
                                            </template>
                                            <template #image>
                                                <img :src="image" alt="image" style="object-fit: contain; height: 150px;" class="w-full" />
                                            </template>
                                            <template #preview="slotProps">
                                                <img :src="image" alt="preview" style="max-height: 90vh" :style="slotProps.style" @click="slotProps.onClick"/>
                                            </template>
                                        </Image>
                                    </div>
                                    <div class="absolute" style="top: 4px; left: 4px;">
                                        <Button v-if="image == productImage.imageUrl" icon="pi pi-star-fill" style="color: orange" severity="secondary" rounded />
                                        <Button 
                                            v-if="image != productImage.imageUrl && iconShowUrl == image" 
                                            icon="pi pi-star" 
                                            style="color: orange"
                                            severity="secondary"
                                            rounded 
                                            @click="setDefaultImage(image)"  
                                        />
                                    </div>
                                    <div class="absolute" style="top: 4px; right: 4px;" v-if="iconShowUrl == image">
                                        <Button icon="pi pi-trash" severity="secondary" rounded size="small" @click="removeImage(image)" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <div class="flex justify-end gap-2">
                <Button type="button" label="取消" severity="secondary" @click="visible = false"></Button>
                <Button type="submit" label="確認" :disabled="$form.price?.value > $form.origin_price?.value || !productImage.imagesUrl?.length"></Button>
            </div>
        </Form>
    </Dialog>
</template>

<script setup>
import { ref, onBeforeMount, onUnmounted, reactive } from 'vue'
import { Form } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { useToast } from 'primevue/usetoast'

import bus from '@/utils/mitt'
import API from '@/api'
import Response from '@/utils/response'

const toast = useToast()

const visible = ref(false)
const mode = ref('') // add or edit
const productType = ref('info')

// 產品圖片區塊參數
const uploadFileType = ref('file') // file or link
const iconShowUrl = ref('')
const imageUrlInput = ref('')
const fileUpload = ref('') 

const categoryItems = ref([
    { name: '玻璃杯', code: '玻璃杯' },
    { name: '馬克杯', code: '馬克杯' },
    { name: '碗', code: '碗' },
    { name: '盤子', code: '盤子' },
    { name: '其他餐具', code: '其他餐具' },
    { name: '鍋具', code: '鍋具' },
    { name: '砧板', code: '砧板' },
    { name: '托盤', code: '托盤' },
    { name: '香氛系列', code: '香氛系列' },
    { name: 'TAbLe選物', code: 'TAbLe選物' },
])

const unitItems = ref([
    { name: '個', code: 'piece' },
    { name: '組', code: 'group' },
]);

const initialValues = reactive({
    title: '',
    category: '',
    unit: '',
    origin_price: '',
    price: '',
    description: '',
    is_enabled: true,
    id: '', // only edit mode
})

const productImage = reactive({
    imagesUrl: [],
    imageUrl: '',
})

const resolver = zodResolver(
    z.object({
        title: z.string().min(1, { message: '必填' }),
        category: z.string().min(1, { message: '必選' }),
        unit: z.string().min(1, { message: '必選' }),
        origin_price: z.number({ message: '必填' }),
        price: z.number({ message: '必填' }),
        description: z.string().max(1000, {message: '不可超過 1000 字元'}),
        is_enabled: z.any()
    })
)

onBeforeMount(() => {
    bus.on("handleOpenProductModal", (params) => {
        visible.value = true
        mode.value = params.mode
        
        if (mode.value == 'edit') {
            Object.keys(initialValues).forEach(key => {
                initialValues[key] = params.info[key]
            })

            // 產品圖片
            Object.keys(productImage).forEach(key => {
                productImage[key] = params.info[key]
            })
        }
    })
    bus.on("handleCloseProductModal", () => {
        visible.value = false
    })
})

onUnmounted(() => {
	bus.off('handleOpenProductModal')
    bus.off('handleCloseProductModal')
})

// 設定產品預設圖片
const setDefaultImage = (img) => {
    productImage.imageUrl = img
}

// 加入圖片
const addImage = (type) => {
    bus.emit('handleLoadingShow')
    if (type == 'link') {
        productImage.imagesUrl.push(imageUrlInput.value)
        if (productImage.imagesUrl.length == 1) setDefaultImage(imageUrlInput.value)
        imageUrlInput.value = ''
        bus.emit('handleLoadingHide')
    } else {
        const file = fileUpload.value.files[0]
        const formData = new FormData()
        formData.append('file-to-upload', file)

        API.Product.upload(formData).then(
            (res) => {
                Response.success('上傳成功')
                productImage.imagesUrl.push(res.imageUrl)
                if (productImage.imagesUrl.length == 1) setDefaultImage(res.imageUrl)
                fileUpload.value.remove()
                bus.emit('handleLoadingHide')
            },
            (err) => {
                Response.error(err.message)
                bus.emit('handleLoadingHide')
            }
        )
    }
}

// 移除圖片
const removeImage = (img) => {
    const isDefault = img == productImage.imageUrl
    const removeIndex = productImage.imagesUrl.findIndex(el => el == img)
    productImage.imagesUrl.splice(removeIndex, 1)

    // 如果刪除預設圖片，然後圖片列表還有圖片，將設第一張為預設圖片
    if (isDefault && productImage.imagesUrl.length) {
        setDefaultImage(productImage.imagesUrl[0])
    }
}

const onFormSubmit = (e) => {
    const { valid, values } = e

    if (valid) {
        const { imagesUrl, imageUrl } = productImage
        const payload = {
            ...values,
            imagesUrl,
            imageUrl,
        }
        if (mode.value == 'edit') {
            payload['id'] = initialValues.id
            bus.emit('handleUpdateProduct', payload)
        } else {
            bus.emit('handleAddProduct', payload)
        }
    }
}

const hide = () => {
    Object.keys(initialValues).forEach(key => {
        if (key == 'is_enabled') initialValues[key] = true
        else initialValues[key] = ''
    })
    productImage.imagesUrl = []
    productImage.imageUrl = ''
    productType.value = 'info'
    uploadFileType.value = 'file'
    iconShowUrl.value = ''
    imageUrlInput.value = '',
    fileUpload.value = ''
}
</script>

<style lang="scss" scoped>
.p-tabpanels {
    padding-left: .5rem;
    padding-right: .5rem;;
}
.p-fileupload-basic span {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    
}
</style>