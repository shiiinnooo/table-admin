export default function Order(http) {
    return {
        // 取得訂單列表
        getList(params = { page: 1 }) {
            return http.get(`/admin/orders`, params)
        },
        // 取得訂單資訊
        getInfo(id) {
            return http.get(`/order/${id}`)
        },
        // 刪除訂單
        delete(id) {
            return http.delete(`/admin/order/${id}`)
        },
        // 刪除所有訂單
        deleteAll() {
            return http.delete(`/admin/orders/all`)
        },
    }
}