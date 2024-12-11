import { useI18n } from 'vue-i18n'

import {
    IP,
    IPORSEGMENT,
    IPORDOMAIN,
    NUMBER,
    EMAIL,
    CELLPHONE,
    // DOMAIN,
    PORT,
    UPPERCASEORNUMBER,
    // PASSWORD
} from './validateRules'

export default function validateRules() {
    const { t } = useI18n()
    // 必填
    const required = {
        required: true,
        message: () => t('Validation_required'),
        trigger: 'change',
    }
    // 必填（數字型態）
    const requiredNumber = {
        required: true,
        message: () => t('Validation_required'),
        trigger: 'blur',
    }
    // IP 或 該網段格式
    const ipSegment = {
        pattern: IPORSEGMENT,
        message: () => t('Validation_ipSegment'),
        trigger: 'change'
    }
    // Port 格式
    const port = {
        pattern: PORT,
        message: () => t('Validation_port'),
        trigger: 'change'
    }
    // number 改成僅判斷是否為數字（不判斷必填）
    const number = {
        pattern: NUMBER,
        message: () => t('Validation_number'),
        trigger: 'change'
    }
    // 判斷是否為大寫字母或數字
    const uppercaseOrNumber = {
        pattern: UPPERCASEORNUMBER,
        message: () => t('Validation_uppercaseOrNumber'),
        trigger: 'change'
    }
    // email 格式
    const email = {
        pattern: EMAIL,
        message: () => t('Validation_email'),
        trigger: 'change'
    }
    // 手機號碼格式
    const cellphone = {
        pattern: CELLPHONE,
        message: () => t('Validation_phoneNum'),
        trigger: 'change'
    }
    // 至少包含一個數字
    const leastOneNum = {
        pattern: new RegExp(/\d+/),
        message: () => t('Validation_leastOneNum'),
        trigger: 'change'
    }
    // 至少包含一個英文大寫
    const leastOneUpperCase = {
        pattern: new RegExp(/^(?=.*?[A-Z])/),
        message: () => t('Validation_leastOneUpperCase'),
        trigger: 'change'
    }
    // 至少包含一個英文小寫
    const leastOneLowerCase = {
        pattern: new RegExp(/^(?=.*?[a-z])/),
        message: () => t('Validation_leastOneLowerCase'),
        trigger: 'change'
    }
    // 至少包含一個特殊符號
    const leastOneSpecial = {
        pattern: new RegExp(/^(?=[^`"']*[\W_])[^\s'"`]*$/),
        message: () => t('Validation_leastOneSpecial'),
        trigger: 'change'
    }
    // 不可包含引號
    const notQuotation = {
        pattern: new RegExp(/^[^'"`]*$/),
        message: () => t('Validation_notQuotation'),
        trigger: 'change'
    }
    // 不可有空白
    const space = {
        validator: (rule, value) => {
            const reg = new RegExp(/[\s]/)
            if (value.match(reg)) return Promise.reject(t('Validation_space'))
            return Promise.resolve()
        },
        trigger: 'change'
    }
    // 密碼規則
    // const password = {
    //     pattern: PASSWORD,
    //     message: () => t('Validation_password'),
    //     trigger: 'change'
    // }
    // 不可全部數字
    const notAllNumber = {
        validator: (rule, value) => {
            const reg = NUMBER
            if (value.match(reg)) {
                return Promise.reject(t('Validation_notAllNumber'))
            }
            return Promise.resolve()
        },
        trigger: 'change'
    }
    // 不可有特殊字元
    const specialChar = {
        validator: (rule, value) => {
            const reg = new RegExp(/^(?=.*\W)/)
            if (value.match(reg)) {
                return Promise.reject(t('Validation_specialChar'))
            }
            return Promise.resolve()
        },
        trigger: 'change'
    }
    // 不可有中文
    const chineseChar = {
        validator: (rule, value) => {
            const reg = new RegExp('([\u4E00-\u9FFF])')
            if (value.match(reg)) {
                return Promise.reject(t('Validation_chinese'))
            }
            return Promise.resolve()
        },
        trigger: 'change'
    }
    // 不可全型文字
    const fullWidthChar = {
        validator: (rule, value) => {
            // const reg = new RegExp('([\uFF41-\uFF5A\uFF21-\uFF3A\uFF10-\uFF19])')
            const reg = new RegExp(/[\uFF00-\uFFEF]/)
            if (value.match(reg)) {
                return Promise.reject(t('Validation_fullWidthWord'))
            }
            return Promise.resolve()
        },
        trigger: 'change'
    }
    // IP 或 Domain 格式
    const ipDomain = {
        pattern: IPORDOMAIN,
        message: () => t('Validation_ipAndDomain'),
        trigger: 'change'
    }
    // const ipDomain = {
    //     validator: (rule, value) => {
    //         const ip = IP
    //         const domain = DOMAIN
    //         if (value === '') return Promise.resolve()
    //         if (value.match(ip)) {
    //             return Promise.resolve()
    //         } else {
    //             if (value.match(domain) || value == '') {
    //                 return Promise.resolve()
    //             } else {
    //                 return Promise.reject(t('Validation_ipAndDomain'))
    //             }
    //         }
    //     },
    //     trigger: 'change'
    // }
    // 至少輸入一組關鍵字
    const keyword = {
        validator: (rule, value) => {
            const flag = value.some(el => el.keyword != '')
            if (flag) return Promise.resolve()
            return Promise.reject(t('Validation_keyword'))
        },
        trigger: 'change'
    }
    // IP 格式 (或其他套用 IP 規則的驗證)
    const ip = (type = 'ip') => {
        return {
            pattern: IP,
            message:
                () => t(`Validation_${type}`),
            trigger: 'change'
        }
    }
    // 長度等於 （通常設為0，驗證下拉式選單是否必選）
    const length = (val) => {
        return {
            validator: (rule, value) => {
                if (value.length == val) {
                    return Promise.reject(t('Validation_excluded'))
                }
                return Promise.resolve()
            },
            trigger: 'change'
        }
    }
    // 長度必須等於
    const equal = (val) => {
        return {
            validator: (rule, value) => {
                if (value.length != val) {
                    return Promise.reject(`${t('Validation_equal')} ${val}`)
                }
                return Promise.resolve()
            },
            trigger: 'change'
        }
    }
    // 長度不可小於
    const min = (val) => {
        return {
            validator: (rule, value) => {
                if (value.length < val) {
                    return Promise.reject(`${t('Validation_min')} ${val}`)
                }
                return Promise.resolve()
            },
            trigger: 'change'
        }
    }
    // 長度不可超過
    const max = (val) => {
        return {
            validator: (rule, value) => {
                if (value.length > val) {
                    return Promise.reject(`${t('Validation_max')} ${val}`)
                }
                return Promise.resolve()
            },
            trigger: 'change'
        }
    }
    // 數字不可小於
    const lessNumber = (number) => {
        return {
            validator: (rule, value) => {
                if (value < number) return Promise.reject(`${t('Validation_lessNumber')} ${number}`)
                return Promise.resolve()
            },
            trigger: 'change'
        }
    }
    return {
        required,
        requiredNumber,
        email,
        leastOneNum,
        leastOneUpperCase,
        leastOneLowerCase,
        leastOneSpecial,
        notQuotation,
        number,
        uppercaseOrNumber,
        space,
        // password,
        notAllNumber,
        chineseChar,
        specialChar,
        fullWidthChar,
        cellphone,
        ipDomain,
        ipSegment,
        keyword,
        port,
        ip,
        length,
        min,
        max,
        equal,
        lessNumber
    }
}
