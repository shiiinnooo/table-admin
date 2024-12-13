export default function Access(http) {
    return {
        login (payload) {
            return http.post(`/admin/signin`, payload)
        },
        logout () {
            return http.post(`/logout`)
        },
        checkAuth () {
            return http.post(`/api/user/check`)
        }
    }
}