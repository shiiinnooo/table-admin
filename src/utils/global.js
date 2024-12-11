import dayjs from 'dayjs'
import Storage from './storage'
import i18n from '@/i18n'

const { t } = i18n.global

class Global {
    // 權限判別
    checkAuth (per) {
        const auth = Storage.getLocalUserInfo('auth')
        return auth.includes(per)
    }
    // 更換日期
    changePeriod(type) {
        switch (type) {
        // 近 24 小時
        case 1:
            return {
                start_time: dayjs().add(-1, 'day').add(1, 'hour').format('YYYY-MM-DD HH:00:00'),
                end_time:  dayjs().format('YYYY-MM-DD HH:59:59'),
                name: t('Dashboard_last_24_hours')
            }
            
        // 近 7 天
        case 2:
            return {
                start_time: dayjs().add(-7, 'day').format('YYYY-MM-DD HH:mm:ss'),
                end_time:  dayjs().format('YYYY-MM-DD HH:mm:ss'),
                name: t('Dashboard_last_7_days')
            }
        // 當月
        case 3: 
            return {
                start_time: dayjs().startOf('month').format('YYYY-MM-DD 00:00:00'),
                end_time:  dayjs().endOf('month').format('YYYY-MM-DD 23:59:59'),
                name: t('Dashboard_this_month')
            }
        }
    }
}

export default new Global()