export default {
    // 資安通報
    path: "/response",
    name: "Response",
    children: [
        //  -------- 監控單 -------------
        // 檢視監控單列表
        {
            path: "monitor",
            name: "ResponseMonitor",
            component: () => import('@/pages/response/monitor/ResponseMonitor.vue'),
            meta: {
                requireAuth: true,
                auth: 'RESPONSE_MONITOR-VIEW',
                sideBar: {
                    openKey: 'response',
                    activeKey: 'response_monitor',
                },
                breadcrumb: [
                    { name: 'Response', routerLink: '' },
                    { name: 'ResponseMonitor', routerLink: '' },
                ]
            }
        },
        // 檢視監控單詳細資訊
        {
            path: "monitor/view/:sheet_num",
            name: "ResponseMonitorView",
            component: () => import('@/pages/response/monitor/ResponseMonitorDetail.vue'),
            meta: {
                requireAuth: true,
                auth: 'RESPONSE_MONITOR-VIEW',
                sideBar: {
                    openKey: 'response',
                    activeKey: 'response_monitor',
                },
                breadcrumb: [
                    { name: 'Response', routerLink: '' },
                    { name: 'ResponseMonitor', routerLink: '' },
                    { name: 'ResponseMonitorView', routerLink: '' }
                ]
            }
        },
        // 修改監控單
        {
            path: "monitor/edit/:sheet_num",
            name: "ResponseMonitorUpdate",
            component: () => import('@/pages/response/monitor/ResponseMonitorDetail.vue'),
            meta: {
                requireAuth: true,
                auth: 'RESPONSE_MONITOR-UPDATE',
                sideBar: {
                    openKey: 'response',
                    activeKey: 'response_monitor',
                },
                breadcrumb: [
                    { name: 'Response', routerLink: '' },
                    { name: 'ResponseMonitor', routerLink: '' },
                    { name: 'ResponseMonitorUpdate', routerLink: '' }
                ]
            }
        },
        // 監控單轉送分析單
        {
            path: "monitor/forward",
            name: "ResponseMonitorForward",
            component: () => import('@/pages/response/monitor/ResponseMonitorForward.vue'),
            meta: {
                requireAuth: true,
                auth: 'RESPONSE_MONITOR-FORWARD',
                sideBar: {
                    openKey: 'response',
                    activeKey: 'response_monitor',
                },
                breadcrumb: [
                    { name: 'Response', routerLink: '' },
                    { name: 'ResponseMonitor', routerLink: '' },
                    { name: 'ResponseMonitorForward', routerLink: '' }
                ]
            }
        },
        // --------- 分析單 --------------
        {
            path: "analysis",
            name: "ResponseAnalysis",
            component: () => import('@/pages/response/analysis/ResponseAnalysis.vue'),
            meta: {
                requireAuth: true,
                auth: 'RESPONSE_ANALYSIS-VIEW',
                sideBar: {
                    openKey: 'response',
                    activeKey: 'response_analysis',
                },
                breadcrumb: [
                    { name: 'Response', routerLink: '' },
                    { name: 'ResponseAnalysis', routerLink: '' },
                ]
            }
        },
        {
            path: "analysis/view/:sheet_num",
            name: "ResponseAnalysisView",
            component: () => import('@/pages/response/analysis/ResponseAnalysisDetail.vue'),
            meta: {
                requireAuth: true,
                auth: 'RESPONSE_ANALYSIS-VIEW',
                sideBar: {
                    openKey: 'response',
                    activeKey: 'response_analysis',
                },
                breadcrumb: [
                    { name: 'Response', routerLink: '' },
                    { name: 'ResponseAnalysis', routerLink: '' },
                    { name: 'ResponseAnalysisView', routerLink: '' }
                ]
            }
        },
        {
            path: "analysis/edit/:sheet_num",
            name: "ResponseAnalysisUpdate",
            component: () => import('@/pages/response/analysis/ResponseAnalysisDetail.vue'),
            meta: {
                requireAuth: true,
                auth: 'RESPONSE_ANALYSIS-VIEW',
                sideBar: {
                    openKey: 'response',
                    activeKey: 'response_analysis',
                },
                breadcrumb: [
                    { name: 'Response', routerLink: '' },
                    { name: 'ResponseAnalysis', routerLink: '' },
                    { name: 'ResponseAnalysisUpdate', routerLink: '' }
                ]
            }
        },
        // 通報流程
        {
            path: "setting",
            name: "ResponseSetting",
            component: () => import('@/pages/response/setting/ResponseSetting.vue'),
            meta: {
                requireAuth: true,
                auth: 'RESPONSE_SETTING-VIEW',
                sideBar: {
                    openKey: 'response',
                    activeKey: 'response_setting',
                },
                breadcrumb: [
                    { name: 'Response', routerLink: '' },
                    { name: 'ResponseSetting', routerLink: '' },
                ]
            }
        },
        {
            path: "setting/add",
            name: "ResponseSettingAdd",
            component: () => import('@/pages/response/setting/ResponseSettingDetail.vue'),
            meta: {
                requireAuth: true,
                auth: 'RESPONSE_SETTING-CREATE',
                sideBar: {
                    openKey: 'response',
                    activeKey: 'response_setting',
                },
                breadcrumb: [
                    { name: 'Response', routerLink: '' },
                    { name: 'ResponseSetting', routerLink: '' },
                    { name: 'ResponseSettingAdd', routerLink: '' }
                ]
            }
        },
        {
            path: "setting/edit/:uid",
            name: "ResponseSettingUpdate",
            component: () => import('@/pages/response/setting/ResponseSettingDetail.vue'),
            meta: {
                requireAuth: true,
                auth: 'RESPONSE_SETTING-UPDATE',
                sideBar: {
                    openKey: 'response',
                    activeKey: 'response_setting',
                },
                breadcrumb: [
                    { name: 'Response', routerLink: '' },
                    { name: 'ResponseSetting', routerLink: '' },
                    { name: 'ResponseSettingUpdate', routerLink: '' }
                ]
            }
        },
        {
            path: "setting/view/:uid",
            name: "ResponseSettingView",
            component: () => import('@/pages/response/setting/ResponseSettingDetail.vue'),
            meta: {
                requireAuth: true,
                auth: 'RESPONSE_SETTING-VIEW',
                sideBar: {
                    openKey: 'response',
                    activeKey: 'response_setting',
                },
                breadcrumb: [
                    { name: 'Response', routerLink: '' },
                    { name: 'ResponseSetting', routerLink: '' },
                    { name: 'ResponseSettingView', routerLink: '' }
                ]
            }
        },
        //  -------- 標籤管理 -------------
        // 檢視標籤管理列表
        {
            path: "label",
            name: "ResponseLabel",
            component: () => import('@/pages/response/label/ResponseLabel.vue'),
            meta: {
                requireAuth: true,
                auth: 'RESPONSE_LABEL-VIEW',
                sideBar: {
                    openKey: 'response',
                    activeKey: 'response_label',
                },
                breadcrumb: [
                    { name: 'Response', routerLink: '' },
                    { name: 'ResponseLabel', routerLink: '' },
                ]
            }
        },
        // 新增標籤資訊
        {
            path: "label/add",
            name: "ResponseLabelAdd",
            component: () => import('@/pages/response/label/ResponseLabelDetail.vue'),
            meta: {
                requireAuth: true,
                auth: 'RESPONSE_LABEL-CREATE',
                sideBar: {
                    openKey: 'response',
                    activeKey: 'response_label',
                },
                breadcrumb: [
                    { name: 'Response', routerLink: '' },
                    { name: 'ResponseLabel', routerLink: '' },
                    { name: 'ResponseLabelAdd', routerLink: '' }
                ]
            }
        },
        // 編輯標籤資訊
        {
            path: "label/edit/:uid",
            name: "ResponseLabelUpdate",
            component: () => import('@/pages/response/label/ResponseLabelDetail.vue'),
            meta: {
                requireAuth: true,
                auth: 'RESPONSE_LABEL-UPDATE',
                sideBar: {
                    openKey: 'response',
                    activeKey: 'response_label',
                },
                breadcrumb: [
                    { name: 'Response', routerLink: '' },
                    { name: 'ResponseLabel', routerLink: '' },
                    { name: 'ResponseLabelUpdate', routerLink: '' }
                ]
            }
        },
        // 檢視標籤資訊
        {
            path: "label/view/:uid",
            name: "ResponseLabelView",
            component: () => import('@/pages/response/label/ResponseLabelDetail.vue'),
            meta: {
                requireAuth: true,
                auth: 'RESPONSE_LABEL-VIEW',
                sideBar: {
                    openKey: 'response',
                    activeKey: 'response_label',
                },
                breadcrumb: [
                    { name: 'Response', routerLink: '' },
                    { name: 'ResponseLabel', routerLink: '' },
                    { name: 'ResponseLabelView', routerLink: '' }
                ]
            }
        },
    ]
}