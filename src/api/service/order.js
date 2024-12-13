export default function Order(http) {
    return {
        // 取得訂單列表
        getList(params = { page: 1 }) {
            return http.get(`/admin/orders`, params)
        },
        // // 取得分析單列表
        // getAnalysisList(payload = {}) {
        //     return http.post(`/analyze`, payload)
        // },
        // // 取得分析單單筆資料
        // getAnalysisInfo(sheet_num) {
        //     return http.get(`/analyze/${sheet_num}`)
        // },
        // // 上傳分析單檔案
        // uploadAnalysisFiles(payload = {}) {
        //     return http.post(`/analyze/file`, payload)
        // },
        // // 刪除分析單檔案（單筆）
        // deleteAnalysisFile(file_uid) {
        //     return http.delete(`/analyze/file/${file_uid}`)
        // },
        // // 下載分析單檔案
        // downloadAnalysisFile(file_uid) {
        //     return http.download(`/analyze/file/download/${file_uid}`)
        // },
    }
}