// import { useUserStore } from '../../store/module/user'
class Storage {  
    // 取得 LocalStorage 全部 token
    getLocalTokens() {
        return JSON.parse(localStorage.getItem('mssp_token'))
    }

    // 取得 LocalStorage 全部 userInfo
    getLocalUserInfos() {
        return JSON.parse(localStorage.getItem('mssp_userInfo'))
    }

    // 取得 LocalStorage 全部 setting
    getLocalSettings() {
        return JSON.parse(localStorage.getItem('mssp_setting'))
    }

    // 取得 LocalStorage 單一 token
    getLocalToken (type = 'access_token') {
        const token = JSON.parse(localStorage.getItem('mssp_token'))
        return token?.[type]
    }

    // 取得 LocalStorage 單一 userInfo
    getLocalUserInfo (info) {
        const infos = JSON.parse(localStorage.getItem('mssp_userInfo'))
        return infos?.[info]
    }

    // 存入 LocalStorage 全部 token
    setLocalToken (tokens) {
        localStorage.setItem('mssp_token', JSON.stringify(tokens))
    }

    // 存入 LocalStorage 全部 UserInfo
    setLocalUserInfo (infos) {
        localStorage.setItem('mssp_userInfo', JSON.stringify(infos))
    }

    // 存入 LocalStorage 全部 System Setting (time_zone/ language)
    setLocalSetting(infos) {
        localStorage.setItem('mssp_setting', JSON.stringify(infos))
    }

    updateLocalAccessToken (token) {
        // const userStore = useUserStore()
        const currToken = JSON.parse(localStorage.getItem('mssp_token')) || {}
        if (Object.keys(currToken).length > 0) {
            currToken.access_token = token
        } else {
            currToken['access_token'] = token
        }
        // userStore.setAccessToken(token)
        localStorage.setItem('mssp_token', JSON.stringify(currToken))
    }

    // 更新 LocalStorage UserInfo, data: { key: value }
    updateLocalUserInfo (data) {
        // const userStore = useUserStore()
        const currInfo = JSON.parse(localStorage.getItem('mssp_userInfo'))
        Object.entries(data).forEach(([key, value]) => {
            currInfo[key] = value
        })
        // userStore.setInfo(currInfo)
        localStorage.setItem('mssp_userInfo', JSON.stringify(currInfo))
    }

    removeLocalStorage() {
        // localStorage.clear()
        const storage = localStorage
        Object.keys(storage).forEach((val) => {
            if (['mssp_token', 'mssp_userInfo'].includes(val)) localStorage.removeItem(val)
        })
    }
}

export default new Storage()
