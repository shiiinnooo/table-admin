import bus from '@/utils/mitt'
// import i18n from '@/i18n'

// const { t } = i18n.global

class Response {
    success (message, isHtml = false) {
        const response = {
            message,
            title: t('Utils_systemInfo'),
            type: 'success',
            isHtml // message 是否使用 html
        }
        bus.emit('handleSetResponse', response)
    }
    warning (message, isHtml = false) {
        const response = {
            message,
            title: t('Utils_systemInfo'),
            type: 'warning',
            isHtml // message 是否使用 html
        }
        bus.emit('handleSetResponse', response)
    }
    
    error (error, isHtml = false, item) {
        const response = {
            // message: typeof error !== 'string' || typeof error == 'string' && error.length != 7 ? error : `Error_${error}`,
            message: `Error_${error}`,
            item, // 提供 error code i18n 帶入參數的訊息
            title: t('Utils_error'),
            type: 'error',
            errorCode: error,
            isHtml // message 是否使用 html
        }
        if (typeof error !== 'string' || typeof error == 'string' && error.length != 7) {
            console.error(error)
        } else {
            bus.emit('handleSetResponse', response)
        }
    }
}
export default new Response()