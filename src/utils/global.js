class Global {
    // 千分位格式化
    toThousands(num) {
        let result = []
        let counter = 0
        num = (num || 0).toString().split('')
        for (let i = num.length - 1; i >= 0; i--) {
            counter++
            result.unshift(num[i])
            if (!(counter % 3) && i != 0) result.unshift(',')
        }
        return result.join('')
    }
}

export default new Global()