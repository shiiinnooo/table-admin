import axios from 'axios'
import API from '@/api'
// import router from '@/router'
import Storage from '@/utils/storage'
import Response from '@/utils/response'
import { useRoute } from 'vue-router'

export default class Http {
    constructor(url = "", config = {}) {    
        // create axios instance
        this.instance = axios.create({
            baseURL: url,
            ...config
        })
        this.interceptors()
    }

    // axios Interceptors
    interceptors() {
        let isRefreshing = false
        let config = []
        const route = useRoute()

        const subscribeTokenRefresh = (callback) => {
            config.push(callback)
        }

        this.instance.interceptors.request.use(
            (config) => {                
                // const token_type = config.url.includes('login/refresh') ? 'refresh_token' : 'access_token'
                // const token = route.name == 'Login' ? (sessionStorage.getItem("access_token") || Storage.getLocalToken(token_type)) : Storage.getLocalToken(token_type)
                // if (token) config.headers['Authorization'] = `Bearer ${token}`
                return config
            },
            (err) => {
                return Promise.reject(err)
            }
        ),
        this.instance.interceptors.response.use(
            // status code <= 2xx 觸發
            async (res) => {
                if (import.meta.env.DEV) console.log('response', res)
                // const errorCode = res.data.data
                // const originalConfig = res.config
                // const token = Storage.getLocalTokens()
                // // access_token 過期時，置換 token
                // if (errorCode === 'CE40103') {
                //     // 判斷有沒有 token，有就置換，沒有就踢到登入頁
                //     if (token !== null) {
                //         if (!isRefreshing) {
                //             isRefreshing = true
                //             try {
                //                 const response = await API.Access.refreshToken()
                //                 isRefreshing = false
                //                 const { access_token } = response
                //                 Storage.updateLocalAccessToken(access_token)
                                
                //                 config.forEach((callback) => callback(access_token))
                //                 config = []

                //                 const re_response = this.instance(originalConfig)
                //                 return re_response

                //             } catch (err) {
                //                 return Promise.reject(err)
                //             }
                //         } else {
                //             return new Promise((resolve) => {
                //                 subscribeTokenRefresh((newToken) => {
                //                     originalConfig.headers.Authorization = `Bearer ${newToken}`
                //                     resolve(this.instance(originalConfig))
                //                 })
                //             })
                            
                //         }
                //     } else {
                //         Storage.removeLocalStorage()
                //     }
                // }
                // else if (['CE40001', 'CE40101', 'CE40102', 'CE40104', 'CE40105', 'CE40106', 'CE40107'].includes(errorCode)) {
                //     Storage.removeLocalStorage()
                // } 
                return res
            },
            // status code > 2xx 觸發
            (err) => {
                console.error(err)
                // const errorCode = err.code
                // if (errorCode == 'ERR_NETWORK' || errorCode == 'ERR_BAD_RESPONSE') Response.error('NE50001')
                // else if (errorCode == 'ERR_CANCELED') Response.warning('API 請求已取消')
                // else Promise.reject(err)
            }
        )
    }

    // HTTP Methods GET
    get(url = "", params = {}) {
        return new Promise((resolve, reject) => {
            try {
                this.instance.get(url, { params: params })
                    .then((response) => {
                        const { data } = response
                        if (data.status) resolve(data.data)
                        else reject(data.data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }


    // HTTP Methods GET - Download File
    download(url = "", params = {}) {
        return new Promise((resolve, reject) => {
            try {
                this.instance.get(url, { params: params, responseType: 'blob' })
                    .then((response) => {
                        resolve(response)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    // HTTP Methods Post - Download File
    downloadPost(url = "", data) {
        return new Promise((resolve, reject) => {
            try {
                this.instance.post(url, data, { responseType: 'blob' })
                    .then((response) => {
                        resolve(response)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }


    // HTTP Methods POST
    post(url = "", data = {}, signal) {
        console.log(signal)
        return new Promise((resolve, reject) => {
            try {
                this.instance.post(url, data, signal)
                    .then((response) => {
                        const { data } = response
                        if (data.status) resolve(data.data)
                        else reject(data.data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    // HTTP Methods PUT
    put(url = "", data = {}) {
        return new Promise((resolve, reject) => {
            try {
                this.instance.put(url, data)
                    .then((response) => {
                        const { data } = response
                        if (data.status) resolve(data.data)
                        else reject(data.data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    // HTTP Methods DELETE
    delete(url = "", payload = []) {
        return new Promise((resolve, reject) => {
            try {
                this.instance.delete(url, { data: payload })
                    .then((response) => {
                        const { data } = response
                        if (data.status) resolve(data.data)
                        else reject(data.data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
}

