import Http from './http-common'

import Access from './service/access'
import Product from './service/product'
import Order from './service/order'

// const url = import.meta.env.DEV ?
const url = "https://vue3-course-api.hexschool.io"

const API = {
    init() {
        this.$http = new Http(url)

        this.Access = Access(this.$http) // 授權
        this.Product = Product(this.$http) // 產品列表
        this.Order = Order(this.$http) // 訂單管理 
    },
}

export default API

