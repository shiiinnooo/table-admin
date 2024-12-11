export default function Product(http) {
    return {
        // 取得使用者資訊 （無權限）
        getInfo() {
            return http.get(`/personal/info`)
        },
        // 編輯使用者資訊 （無權限）
        edit(payload) {
            return http.put(`/personal/info`, payload)
        },
    }
}