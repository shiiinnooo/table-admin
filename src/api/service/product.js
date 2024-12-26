export default function Product(http) {
    return {
        // 取得產品列表
        getList(params = { page: 1 }) {
            return http.get(`/admin/products`, params)
        },
        // 新增產品
        add (payload) {
            return http.post(`/admin/product`, payload)
        },
        // 修改產品
        update (uid, payload) {
            return http.put(`/admin/product/${uid}`, payload)
        },
        // 刪除產品
        delete (uid) {
            return http.delete(`/admin/product/${uid}`)
        },
        // 上傳檔案
        upload (file) {
            return http.post(`/admin/upload`, file)
        }
    }
}