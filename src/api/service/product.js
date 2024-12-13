export default function Product(http) {
    return {
        // 取得產品列表
        getList(params = { page: 1 }) {
            return http.get(`/admin/products`, params)
        },
    }
}