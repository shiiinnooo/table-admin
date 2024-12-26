import axios from 'axios'
import jwtDecode from 'jwt-decode'
import dayjs from 'dayjs/esm'
import { useRouter } from 'vue-router'

import Response from '@/utils/response'

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
        const router = useRouter()

        this.instance.interceptors.request.use(
            (config) => {             
                const token = JSON.parse(localStorage.getItem('access'))?.token ?? ''
                
                if (token) {
                    if (jwtDecode(token).exp < dayjs().unix()) {
                        localStorage.clear()
                        Response.error('Token 已過期，請重新登入')
                        router.push('/login')
                    } else {
                        config.headers['Authorization'] = token
                    }
                }
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
                return res
            },
            // status code > 2xx 觸發
            (err) => {
                console.error(err)
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
                        if (data.success) resolve(data)
                        else reject(data)
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
    // download(url = "", params = {}) {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             this.instance.get(url, { params: params, responseType: 'blob' })
    //                 .then((response) => {
    //                     resolve(response)
    //                 })
    //                 .catch((error) => {
    //                     reject(error)
    //                 })
    //         } catch (error) {
    //             reject(error)
    //         }
    //     })
    // }

    // HTTP Methods Post - Download File
    // downloadPost(url = "", data) {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             this.instance.post(url, data, { responseType: 'blob' })
    //                 .then((response) => {
    //                     resolve(response)
    //                 })
    //                 .catch((error) => {
    //                     reject(error)
    //                 })
    //         } catch (error) {
    //             reject(error)
    //         }
    //     })
    // }


    // HTTP Methods POST
    post(url = "", data, signal) {
        return new Promise((resolve, reject) => {
            try {
                this.instance.post(url, data, signal)
                    .then((response) => {
                        const { data } = response
                        if (data.success) resolve(data)
                        else reject(data)
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
                        if (data.success) resolve(data)
                        else reject(data)
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
    delete(url = "") {
        return new Promise((resolve, reject) => {
            try {
                this.instance.delete(url)
                    .then((response) => {
                        const { data } = response
                        if (data.success) resolve(data)
                        else reject(data)
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

