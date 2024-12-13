import bus from '@/utils/mitt'
// import i18n from '@/i18n'

// const { t } = i18n.global

class Response {
    success (message) {
        bus.emit('handleSetResponse', {
            severity: 'success',
            summary: 'Success Message',
            detail: message,
            life: 3000
        })
    }
    warning (message) {
        bus.emit('handleSetResponse', {
            severity: 'warn',
            summary: 'Warn Message',
            detail: message,
            life: 3000
        })
    }
    
    error (message) {
        bus.emit('handleSetResponse', {
            severity: 'error',
            summary: 'Error Message',
            detail: message,
            life: 3000
        })
    }
}
export default new Response()