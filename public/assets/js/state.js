export const state = {
    cookie: localStorage.getItem('nzm_cookie'),
    data: null,
    collection: null,
    currentTab: 'stats',
    currentModeFilter: 'all',
    currentPage: 1,
    bossDamagePromise: null
};

// 轮询状态
export const pollState = {
    qrTimer: null,
    qrSig: '',
    isQRPollingActive: false,

    wxQrTimer: null,
    wxQrUuid: '',
    isWxQRPollingActive: false,
    wxQrPollingInFlight: false
};
