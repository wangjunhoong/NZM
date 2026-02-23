import { state, pollState } from './state.js';
import { dom, showError } from './ui_components.js';
import { api } from './api.js';

export async function startQRLogin() {
    if (pollState.qrTimer) clearInterval(pollState.qrTimer);

    if (dom.qrLoading) dom.qrLoading.style.display = 'flex';
    if (dom.qrOverlay) dom.qrOverlay.style.display = 'none';
    if (dom.qrImg) dom.qrImg.style.display = 'none';
    if (dom.qrStatus) {
        dom.qrStatus.style.display = 'block';
        dom.qrStatus.textContent = '正在获取二维码...';
        dom.qrStatus.style.color = '#aaa';
    }

    try {
        const json = await api.getQqQR();

        if (json.success) {
            if (dom.qrImg) dom.qrImg.src = json.data.qrcode;
            pollState.qrSig = json.data.qrsig;

            if (dom.qrLoading) dom.qrLoading.style.display = 'none';
            if (dom.qrImg) dom.qrImg.style.display = 'block';
            if (dom.qrStatus) dom.qrStatus.textContent = '请使用 手机QQ 扫码登录';

            pollState.isQRPollingActive = true;
            pollState.qrTimer = setInterval(checkQR, 3000);
        } else {
            throw new Error('Get QR Failed');
        }
    } catch (e) {
        if (dom.qrStatus) dom.qrStatus.textContent = '获取二维码失败，请刷新页面重试';
        if (dom.qrOverlay) dom.qrOverlay.style.display = 'flex';
    }
}

export async function checkQR() {
    if (!pollState.qrSig) return;
    try {
        const json = await api.checkQqQR(pollState.qrSig);

        if (json.status === 0) {
            pollState.isQRPollingActive = false;
            clearInterval(pollState.qrTimer);
            pollState.qrTimer = null;
            if (dom.qrStatus) {
                dom.qrStatus.textContent = '登录成功！跳转中...';
                dom.qrStatus.style.color = '#10b981';
            }

            state.cookie = json.data.cookie;
            localStorage.setItem('nzm_cookie', state.cookie);

            // Trigger data load (this will be wired up in main.js)
            window.dispatchEvent(new CustomEvent('auth:success'));
        } else if (json.status === 66 && dom.qrStatus) {
            dom.qrStatus.textContent = '请使用手机QQ扫码';
            dom.qrStatus.style.color = '#aaa';
        } else if (json.status === 67 && dom.qrStatus) {
            dom.qrStatus.textContent = '扫码成功，请在手机上确认';
            dom.qrStatus.style.color = '#f59e0b';
        } else if ((json.status === 65 || (json.message && json.message.includes('失效'))) && dom.qrStatus) {
            pollState.isQRPollingActive = false;
            if (pollState.qrTimer) clearInterval(pollState.qrTimer);
            pollState.qrTimer = null;

            dom.qrStatus.style.display = 'none';
            if (dom.qrOverlay) dom.qrOverlay.style.display = 'flex';
        }
    } catch (e) {
        // ignore poll errors
    }
}

export async function startWxQRLogin() {
    if (pollState.wxQrTimer) clearInterval(pollState.wxQrTimer);

    const wxQrImg = document.getElementById('wx-qr-img');
    const wxQrLoading = document.getElementById('wx-qr-loading');
    const wxQrStatus = document.getElementById('wx-qr-status');

    if (wxQrLoading) wxQrLoading.style.display = 'flex';
    if (dom.wxQrOverlay) dom.wxQrOverlay.style.display = 'none';
    if (wxQrImg) wxQrImg.style.display = 'none';
    if (dom.wxQrStatus) {
        dom.wxQrStatus.style.display = 'block';
        dom.wxQrStatus.textContent = '正在获取微信二维码...';
        dom.wxQrStatus.style.color = '#aaa';
    }

    try {
        const json = await api.getWxQR();

        if (json.success) {
            if (wxQrImg) wxQrImg.src = json.data.qrcode;
            pollState.wxQrUuid = json.data.uuid;

            if (wxQrLoading) wxQrLoading.style.display = 'none';
            if (wxQrImg) wxQrImg.style.display = 'block';
            if (wxQrStatus) wxQrStatus.textContent = '请使用微信扫码登录';

            pollState.isWxQRPollingActive = true;
            pollState.wxQrTimer = setInterval(checkWxQR, 4000);
        } else {
            throw new Error(json.message || '获取二维码失败');
        }
    } catch (e) {
        if (dom.wxQrStatus) dom.wxQrStatus.textContent = '获取微信二维码失败，点击重试';
        if (dom.wxQrOverlay) dom.wxQrOverlay.style.display = 'flex';
        if (wxQrLoading) wxQrLoading.style.display = 'none';
    }
}

export async function checkWxQR() {
    if (!pollState.wxQrUuid) return;
    if (pollState.wxQrPollingInFlight) return;
    pollState.wxQrPollingInFlight = true;

    const wxQrStatus = document.getElementById('wx-qr-status');

    try {
        const json = await api.checkWxQR(pollState.wxQrUuid);

        if (json.status === 0 && json.data?.cookie) {
            pollState.isWxQRPollingActive = false;
            clearInterval(pollState.wxQrTimer);
            pollState.wxQrTimer = null;
            if (wxQrStatus) {
                wxQrStatus.textContent = '登录成功！正在加载数据...';
                wxQrStatus.style.color = '#10b981';
            }

            state.cookie = json.data.cookie;
            localStorage.setItem('nzm_cookie', state.cookie);
            localStorage.setItem('nzm_login_type', 'wechat');

            window.dispatchEvent(new CustomEvent('auth:success'));
        } else if (json.status === -1 || json.success === false) {
            wxQrStatus.textContent = json.message || 'Token交换失败，请重试';
            wxQrStatus.style.color = '#ef4444';
            pollState.isWxQRPollingActive = false;
            clearInterval(pollState.wxQrTimer);
            pollState.wxQrTimer = null;
            if (dom.wxQrOverlay) dom.wxQrOverlay.style.display = 'flex';
        } else if (json.status === 408) {
            wxQrStatus.textContent = '请使用微信扫码登录';
            wxQrStatus.style.color = '#aaa';
        } else if (json.status === 404) {
            wxQrStatus.textContent = '扫码成功，请在手机上确认';
            wxQrStatus.style.color = '#f59e0b';
        } else if (json.status === 402) {
            pollState.isWxQRPollingActive = false;
            clearInterval(pollState.wxQrTimer);
            pollState.wxQrTimer = null;
            if (dom.wxQrStatus) dom.wxQrStatus.style.display = 'none'; // Hide text when card shown
            if (dom.wxQrOverlay) dom.wxQrOverlay.style.display = 'flex';
        }
    } catch (e) {
        // ignore poll errors
    } finally {
        pollState.wxQrPollingInFlight = false;
    }
}

export function switchLoginMethod(method) {
    const qqTab = document.getElementById('method-qq-tab');
    const wechatTab = document.getElementById('method-wechat-tab');
    const qqContainer = dom.qqContainer;
    const wechatContainer = dom.wechatContainer;

    if (method === 'wechat') {
        if (qqTab) qqTab.classList.remove('active');
        if (wechatTab) wechatTab.classList.add('active');
        if (qqContainer) qqContainer.classList.remove('active');
        if (wechatContainer) wechatContainer.classList.add('active');

        if (pollState.qrTimer) { clearInterval(pollState.qrTimer); pollState.qrTimer = null; }
        pollState.isQRPollingActive = false;
        startWxQRLogin();
    } else {
        if (wechatTab) wechatTab.classList.remove('active');
        if (qqTab) qqTab.classList.add('active');
        if (qqContainer) qqContainer.classList.add('active');
        if (wechatContainer) wechatContainer.classList.remove('active');

        if (pollState.wxQrTimer) { clearInterval(pollState.wxQrTimer); pollState.wxQrTimer = null; }
        pollState.isWxQRPollingActive = false;
    }
}
