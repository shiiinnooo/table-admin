export default function Access(http) {
    return {
        login (payload) {
            return http.post(`/admin/signin`, payload)
        },
        // logout () {
        //     return http.post(`/logout`, null)
        // },
        // refreshToken () {
        //     return http.post(`/login/refresh`, null)
        // },
        // verify (payload) {
        //     return http.post(`/login/verify`, payload)
        // },
        // loginForget (payload) {
        //     return http.post(`/login/forget`, payload)
        // }
    }
}