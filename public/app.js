const API_BASE = '/api'; // Relative path for Worker
// Placeholder for checkpoint area names (ID -> Name)
const CHECKPOINT_AREAS = {
    "40014": "北欧森林",
    "40101": "下水道",
    "40104": "Z博士",
    "40111": "下水道",
    "40112": "博物馆",
    "40113": "工厂",
    "40121": "下水道",
    "40122": "博物馆",
    "40123": "工厂",
    "40124": "Z博士",
    "40131": "下水道",
    "40132": "博物馆",
    "40133": "工厂",
    "40134": "Z博士",
    "40141": "下水道",
    "40142": "博物馆",
    "40143": "工厂",
    "40144": "Z博士",
    "40151": "下水道",
    "40152": "博物馆",
    "40153": "工厂",
    "40154": "Z博士",
    "40211": "巴黎1区",
    "40212": "巴黎2区",
    "40213": "红磨坊",
    "40221": "巴黎1区",
    "40222": "巴黎2区",
    "40223": "红磨坊",
    "40224": "凯旋门",
    "40231": "巴黎1区",
    "40232": "巴黎2区",
    "40233": "红磨坊",
    "40234": "凯旋门",
    "40235": "死亡骑士",
    "40241": "巴黎1区",
    "40242": "巴黎2区",
    "40243": "红磨坊",
    "40244": "凯旋门",
    "40245": "死亡骑士",
    "40251": "巴黎1区",
    "40252": "巴黎2区",
    "40253": "红磨坊",
    "40254": "凯旋门",
    "40255": "死亡骑士",
    "40411": "海岸鸟居",
    "40412": "城墙",
    "40413": "日式街道",
    "40414": "洞穴",
    "40415": "城堡",
    "40421": "海岸鸟居",
    "40422": "城墙",
    "40423": "日式街道",
    "40424": "洞穴",
    "40425": "城堡",
    "40431": "海岸鸟居",
    "40432": "城墙",
    "40433": "日式街道",
    "40434": "洞穴",
    "40435": "城堡",
    "40441": "海岸鸟居",
    "40442": "城墙",
    "40443": "日式街道",
    "40444": "洞穴",
    "40445": "城堡",
    "40514": "北欧森林",
    "40521": "北欧城市",
    "40523": "地下实验室B",
    "40524": "北欧森林",
    "40529": "地下实验室",
    "40531": "北欧城市",
    "40532": "地下实验室A",
    "40533": "地下实验室B",
    "40534": "北欧森林",
    "40535": "英灵殿",
    "40539": "地下实验室",
    "40541": "北欧城市",
    "40542": "地下实验室A",
    "40543": "地下实验室B",
    "40544": "北欧森林",
    "40545": "英灵殿",
    "40549": "地下实验室",
    "40551": "北欧城市",
    "40552": "地下实验室A",
    "40553": "地下实验室B",
    "40554": "北欧森林",
    "40555": "英灵殿",
    "40559": "地下实验室",
    "40561": "北欧城市",
    "40562": "地下实验室A",
    "40563": "地下实验室B",
    "40564": "北欧森林",
    "40565": "英灵殿",
    "40569": "地下实验室",
    "40611": "漂流",
    "40612": "神庙",
    "40621": "漂流",
    "40622": "神庙",
    "40623": "蛇王",
    "40624": "食人花",
    "40631": "漂流",
    "40632": "神庙",
    "40633": "蛇王",
    "40634": "食人花",
    "40635": "缇娜一阶段",
    "40641": "漂流",
    "40642": "神庙",
    "40643": "蛇王",
    "40644": "食人花",
    "40645": "缇娜一阶段",
    "40646": "缇娜二阶段",
    "40711": "龙顶冰川",
    "40712": "九层妖塔",
    "40721": "龙顶冰川",
    "40722": "九层妖塔",
    "40724": "魔国祭坛",
    "40731": "龙顶冰川",
    "40732": "九层妖塔",
    "40733": "记忆之城",
    "40734": "魔国祭坛",
    "40735": "逆转时间",
    "40741": "龙顶冰川",
    "40742": "九层妖塔",
    "40743": "记忆之城",
    "40744": "魔国祭坛",
    "40745": "逆转时间",
    "40811": "蚁后",
    "40812": "白骆驼",
    "40813": "黑蛇",
    "40821": "蚁后",
    "40822": "白骆驼",
    "40823": "黑蛇",
    "40824": "主教祭司",
    "40825": "奴隶主",
    "40831": "蚁后",
    "40832": "白骆驼",
    "40833": "黑蛇",
    "40834": "主教祭司",
    "40835": "奴隶主",
    "40836": "精绝女王",
    "40841": "蚁后",
    "40842": "白骆驼",
    "40843": "黑蛇",
    "40844": "主教祭司",
    "40845": "奴隶主",
    "40846": "精绝女王"
};

const dom = {
    loginView: document.getElementById('login-view'),
    statsView: document.getElementById('stats-view'),
    qrImg: document.getElementById('qr-img'),
    qrStatus: document.getElementById('qr-status'),
    qrOverlay: document.getElementById('qr-overlay'),
    qrLoading: document.getElementById('qr-loading'),
    qrWrapper: document.getElementById('qr-wrapper'),

    userInfo: document.getElementById('user-info'),
    refreshBtn: document.getElementById('refresh-btn'),
    shareBtn: document.getElementById('share-btn'),
    logoutBtn: document.getElementById('logout-btn'),
    loading: document.getElementById('loading'),
    errorMsg: document.getElementById('error-msg'),

    // Tabs
    statsTab: document.getElementById('stats-tab'),
    collectionTab: document.getElementById('collection-tab'),

    // Stats content
    statsContent: document.getElementById('stats-content'),
    modeStats: document.getElementById('mode-stats'),
    mapStats: document.getElementById('map-stats'),
    matchHistory: document.getElementById('match-history'),
    pageInfo: document.getElementById('page-info'),
    prevPage: document.getElementById('prev-page'),
    nextPage: document.getElementById('next-page'),

    // Fragment sidebar
    fragmentList: document.getElementById('fragment-list'),

    // Collection grids
    weaponGrid: document.getElementById('weapon-grid'),
    trapGrid: document.getElementById('trap-grid'),
    pluginGrid: document.getElementById('plugin-grid'),
    weaponCount: document.getElementById('weapon-count'),
    trapCount: document.getElementById('trap-count'),
    pluginCount: document.getElementById('plugin-count'),

    // Official Summary
    offHuntGames: document.getElementById('off-hunt-games'),
    offTowerGames: document.getElementById('off-tower-games'),
    offPlayTime: document.getElementById('off-play-time'),
    recentGames: document.getElementById('recent-games'),
    recentWin: document.getElementById('recent-win-rate'),
    recentDmg: document.getElementById('recent-avg-damage'),
    recentBossDmg: document.getElementById('recent-boss-damage'),
};

const state = {
    cookie: localStorage.getItem('nzm_cookie'),
    data: null,
    collection: null,
    currentTab: 'stats'
};

// --- 登录方式切换 ---
function switchLoginMethod(method) {
    const qqBtn = document.getElementById('method-qq');
    const wechatBtn = document.getElementById('method-wechat');
    const qqContainer = document.getElementById('qr-login-container');
    const wechatContainer = document.getElementById('wechat-login-container');

    if (method === 'wechat') {
        qqBtn.style.background = '#1f2937';
        qqBtn.style.color = '#9ca3af';
        qqBtn.classList.remove('active');
        wechatBtn.style.background = '#10b981';
        wechatBtn.style.color = '#fff';
        wechatBtn.classList.add('active');
        qqContainer.style.display = 'none';
        wechatContainer.style.display = 'block';
        // Stop QQ QR polling when switching to WeChat
        if (qrTimer) { clearInterval(qrTimer); qrTimer = null; }
        isQRPollingActive = false;
        // Start WeChat QR login
        startWxQRLogin();
    } else {
        wechatBtn.style.background = '#1f2937';
        wechatBtn.style.color = '#9ca3af';
        wechatBtn.classList.remove('active');
        qqBtn.style.background = '#8b5cf6';
        qqBtn.style.color = '#fff';
        qqBtn.classList.add('active');
        qqContainer.style.display = 'block';
        wechatContainer.style.display = 'none';
        // Stop WeChat QR polling when switching to QQ
        if (wxQrTimer) { clearInterval(wxQrTimer); wxQrTimer = null; }
        isWxQRPollingActive = false;
    }
}

// --- WeChat QR Login ---
let wxQrTimer = null;
let wxQrUuid = '';
let isWxQRPollingActive = false;
let wxQrPollingInFlight = false; // Prevent overlapping requests

async function startWxQRLogin() {
    if (wxQrTimer) clearInterval(wxQrTimer);

    const wxQrImg = document.getElementById('wx-qr-img');
    const wxQrLoading = document.getElementById('wx-qr-loading');
    const wxQrOverlay = document.getElementById('wx-qr-overlay');
    const wxQrStatus = document.getElementById('wx-qr-status');

    wxQrLoading.style.display = 'flex';
    wxQrOverlay.style.display = 'none';
    wxQrImg.style.display = 'none';
    wxQrStatus.textContent = '正在获取微信二维码...';
    wxQrStatus.style.color = '#aaa';

    try {
        const res = await fetch(`${API_BASE}/auth/wx-qr`);
        const json = await res.json();

        if (json.success) {
            wxQrImg.src = json.data.qrcode;
            wxQrUuid = json.data.uuid;

            wxQrLoading.style.display = 'none';
            wxQrImg.style.display = 'block';
            wxQrStatus.textContent = '请使用微信扫码登录';

            isWxQRPollingActive = true;
            // Use longer interval since backend long-polls for up to 25s
            wxQrTimer = setInterval(checkWxQR, 4000);
        } else {
            throw new Error(json.message || '获取二维码失败');
        }
    } catch (e) {
        const wxQrStatus = document.getElementById('wx-qr-status');
        wxQrStatus.textContent = '获取微信二维码失败，点击重试';
        document.getElementById('wx-qr-overlay').style.display = 'flex';
        document.getElementById('wx-qr-loading').style.display = 'none';
    }
}

async function checkWxQR() {
    if (!wxQrUuid) return;
    if (wxQrPollingInFlight) return; // Skip if previous request still pending
    wxQrPollingInFlight = true;

    const wxQrStatus = document.getElementById('wx-qr-status');
    const wxQrOverlay = document.getElementById('wx-qr-overlay');

    try {
        const res = await fetch(`${API_BASE}/auth/wx-check?uuid=${wxQrUuid}`);
        const json = await res.json();

        if (json.status === 0 && json.data?.cookie) {
            // Login success
            isWxQRPollingActive = false;
            clearInterval(wxQrTimer);
            wxQrTimer = null;
            wxQrStatus.textContent = '登录成功！正在加载数据...';
            wxQrStatus.style.color = '#10b981';

            state.cookie = json.data.cookie;
            localStorage.setItem('nzm_cookie', state.cookie);
            localStorage.setItem('nzm_login_type', 'wechat');
            loadStats();
        } else if (json.status === -1 || json.success === false) {
            // Code exchange failed
            wxQrStatus.textContent = json.message || 'Token交换失败，请重试';
            wxQrStatus.style.color = '#ef4444';
            // Don't stop polling - let user retry with a new QR
            isWxQRPollingActive = false;
            clearInterval(wxQrTimer);
            wxQrTimer = null;
            wxQrOverlay.style.display = 'flex';
        } else if (json.status === 408) {
            wxQrStatus.textContent = '请使用微信扫码登录';
            wxQrStatus.style.color = '#aaa';
        } else if (json.status === 404) {
            wxQrStatus.textContent = '扫码成功，请在手机上确认';
            wxQrStatus.style.color = '#f59e0b';
        } else if (json.status === 402) {
            isWxQRPollingActive = false;
            clearInterval(wxQrTimer);
            wxQrTimer = null;
            wxQrStatus.textContent = '二维码已失效';
            wxQrOverlay.style.display = 'flex';
        }
    } catch (e) {
        // ignore poll errors
    } finally {
        wxQrPollingInFlight = false;
    }
}

// --- QQ群号弹窗 ---
function showGroupPopup(groupName, groupNumber) {
    // 检查是否是已满的群
    const isFullGroup = (groupName === '一群' || groupName === '二群' || groupName === '三群' || groupName === '四群' || groupName === '五群' || groupName === '六群');
    const displayNumber = isFullGroup ? '群已满人' : groupNumber;
    const numberColor = isFullGroup ? '#ef4444' : '#10b981';

    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:9999;';

    // 创建弹窗
    const popup = document.createElement('div');
    popup.style.cssText = 'background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);border:2px solid #ef4444;border-radius:16px;padding:2rem;max-width:400px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.5);';

    popup.innerHTML = `
        <div style="font-size:1.5rem;font-weight:bold;color:#f59e0b;margin-bottom:1rem;">⚠️ 重要提醒 ⚠️</div>
        <div style="background:#ef4444;color:#fff;padding:1rem;border-radius:8px;margin-bottom:1.5rem;font-weight:bold;line-height:1.6;">
            进群后请务必查看<span style="color:#fbbf24;font-size:1.1rem;">「群公告」</span>！<br>
            不要提问群公告中已有的问题！<br>
            否则将被禁言或移出群聊！
        </div>
        <div style="font-size:1.2rem;color:#94a3b8;margin-bottom:0.5rem;">${groupName}群号</div>
        <div style="font-size:2rem;font-weight:bold;color:${numberColor};margin-bottom:1.5rem;font-family:monospace;letter-spacing:2px;">${displayNumber}</div>
        <div style="display:flex;gap:1rem;justify-content:center;">
            ${isFullGroup ? '' : '<button id="copy-group-btn" style="padding:0.8rem 1.5rem;background:#10b981;color:#fff;border:none;border-radius:8px;font-size:1rem;cursor:pointer;font-weight:bold;">复制群号</button>'}
            <button id="close-group-btn" style="padding:0.8rem 1.5rem;background:#4b5563;color:#fff;border:none;border-radius:8px;font-size:1rem;cursor:pointer;">关闭</button>
        </div>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // 复制按钮事件（仅非满人群显示）
    if (!isFullGroup) {
        popup.querySelector('#copy-group-btn').addEventListener('click', function () {
            navigator.clipboard.writeText(groupNumber);
            this.textContent = '已复制!';
            this.style.background = '#059669';
            setTimeout(() => {
                this.textContent = '复制群号';
                this.style.background = '#10b981';
            }, 1500);
        });
    }

    // 关闭按钮事件
    popup.querySelector('#close-group-btn').addEventListener('click', () => {
        document.body.removeChild(overlay);
    });

    // 点击遮罩关闭
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
}

// --- Init ---
async function init() {
    bindEvents();
    if (state.cookie) {
        await loadStats();
    } else {
        switchView('login');
        startQRLogin();
    }
}

function bindEvents() {
    dom.refreshBtn.addEventListener('click', loadStats);
    if (dom.shareBtn) dom.shareBtn.addEventListener('click', generateShareImage);
    dom.logoutBtn.addEventListener('click', doLogout);

    dom.qrOverlay.addEventListener('click', startQRLogin);

    // Navigation Tabs
    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tab = e.target.dataset.tab;
            switchTab(tab);
        });
    });

    // Collection Quality Filters
    document.querySelectorAll('.filter-btn[data-quality]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn[data-quality]').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const quality = e.target.dataset.quality;
            filterWeapons(quality);
        });
    });

    // Plugin Slot Filters
    document.querySelectorAll('.filter-btn[data-slot]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn[data-slot]').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const slot = e.target.dataset.slot;
            filterPlugins(slot);
        });
    });


    // Pagination
    dom.prevPage.addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderMatchHistory(state.data.gameList); updatePagination(Math.ceil(filteredLength(state.data.gameList) / ITEMS_PER_PAGE)); } });
    dom.nextPage.addEventListener('click', () => {
        const total = Math.ceil(filteredLength(state.data.gameList) / ITEMS_PER_PAGE);
        if (currentPage < total) { currentPage++; renderMatchHistory(state.data.gameList); updatePagination(total); }
    });

    // Mode Tabs
    document.querySelectorAll('.mode-tab').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.mode-tab').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentModeFilter = e.target.dataset.mode;
            currentPage = 1;
            if (state.data) renderMatchHistory(state.data.gameList);
        });
    });
}

// --- QR Logic ---
let qrTimer = null;
let qrSig = '';
let isQRPollingActive = false; // Flag to track if we should be polling

// Page Visibility API: Pause polling when page is hidden to save requests
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause polling
        if (qrTimer) {
            clearInterval(qrTimer);
            qrTimer = null;
        }
        if (wxQrTimer) {
            clearInterval(wxQrTimer);
            wxQrTimer = null;
        }
    } else {
        // Page is visible again, resume polling only if we were actively polling
        if (isQRPollingActive && qrSig && !qrTimer) {
            qrTimer = setInterval(checkQR, 3000);
            // Immediately check once when coming back
            checkQR();
        }
        if (isWxQRPollingActive && wxQrUuid && !wxQrTimer) {
            wxQrTimer = setInterval(checkWxQR, 4000);
            checkWxQR();
        }
    }
});

async function startQRLogin() {
    if (qrTimer) clearInterval(qrTimer);

    dom.qrLoading.style.display = 'flex';
    dom.qrOverlay.style.display = 'none';
    dom.qrImg.style.display = 'none';
    dom.qrStatus.textContent = '正在获取二维码...';
    dom.qrStatus.style.color = '#aaa';

    try {
        const res = await fetch(`${API_BASE}/auth/qr`);
        const json = await res.json();

        if (json.success) {
            dom.qrImg.src = json.data.qrcode;
            qrSig = json.data.qrsig;

            dom.qrLoading.style.display = 'none';
            dom.qrImg.style.display = 'block';
            dom.qrStatus.textContent = '请使用 手机QQ 扫码登录';

            // Start polling
            isQRPollingActive = true;
            qrTimer = setInterval(checkQR, 3000);
        } else {
            throw new Error('Get QR Failed');
        }
    } catch (e) {
        dom.qrStatus.textContent = '获取二维码失败，请刷新页面重试';
        dom.qrOverlay.style.display = 'flex';
    }
}

async function checkQR() {
    if (!qrSig) return;
    try {
        const res = await fetch(`${API_BASE}/auth/check?qrsig=${qrSig}`);
        const json = await res.json();

        // Correct Status Mapping
        if (json.status === 0) {
            // Success - stop polling permanently
            isQRPollingActive = false;
            clearInterval(qrTimer);
            qrTimer = null;
            dom.qrStatus.textContent = '登录成功！跳转中...';
            dom.qrStatus.style.color = '#10b981';

            state.cookie = json.data.cookie;
            localStorage.setItem('nzm_cookie', state.cookie);

            loadStats();
        } else if (json.status === 66) {
            // Waiting for scan
            dom.qrStatus.textContent = '请使用手机QQ扫码';
            dom.qrStatus.style.color = '#aaa';
        } else if (json.status === 67) {
            // Scanned, waiting confirm
            dom.qrStatus.textContent = '扫码成功，请在手机上确认';
            dom.qrStatus.style.color = '#f59e0b';
        } else if (json.status === 65 || (json.message && json.message.includes('失效'))) {
            // QR expired - stop polling permanently
            isQRPollingActive = false;
            clearInterval(qrTimer);
            qrTimer = null;
            dom.qrStatus.textContent = '二维码已失效';
            dom.qrOverlay.style.display = 'flex';
        }
    } catch (e) {
        // ignore poll errors
    }
}

function forceLogout() {
    localStorage.removeItem('nzm_cookie');
    localStorage.removeItem('nzm_login_type');
    location.reload();
}

function showCookieExpiredModal() {
    // Check if duplicate modal exists
    if (document.querySelector('.cookie-expired-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'cookie-expired-overlay';

    overlay.innerHTML = `
        <div class="cookie-expired-modal">
            <span class="cookie-expired-icon">⚠️</span>
            <div class="cookie-expired-title">无法获取数据</div>
            <div class="cookie-expired-text" style="text-align:left; display:inline-block; max-width:100%;">
                <div style="margin-bottom:8px"><strong>可能原因：</strong></div>
                <ul style="margin:0 0 12px 20px; padding:0; list-style-type:disc;">
                    <li>登录凭证已过期 <span style="font-size:0.9em;color:#888">(重新登录即可)</span></li>
                    <li><span style="color:#d4a84b">从未登录过官方小程序</span> (常见)</li>
                </ul>
                <div style="margin-bottom:8px"><strong>解决方案：</strong></div>
                请前往手机QQ/微信搜索小程序<br>
                <strong style="color:#d4a84b; font-size:1.1em;">“逆战未来工具箱”</strong><br>
                进入并<span style="color:#10b981">同意用户协议</span>后，点击下方按钮重试。
            </div>
            <button class="cookie-expired-btn" onclick="forceLogout()" style="margin-top:1.5rem;">我已同意，重新登录</button>
        </div>
    `;

    document.body.appendChild(overlay);
}

function doLogout() {
    if (confirm('确定要退出登录并清除本地缓存吗？')) {
        forceLogout();
    }
}

// --- Data & Rendering ---
async function loadStats() {
    if (!state.cookie) return switchView('login');

    switchView('stats');
    dom.loading.classList.remove('hidden');
    dom.statsContent.classList.add('hidden');

    try {
        const res = await fetch(`${API_BASE}/stats`, {
            headers: { 'X-NZM-Cookie': state.cookie }
        });

        if (res.status === 401) {
            localStorage.removeItem('nzm_cookie');
            state.cookie = null;
            showCookieExpiredModal();
            return;
        }

        const json = await res.json();
        if (json.success) {
            state.data = json.data;
            renderStats(json.data);
            dom.statsContent.classList.remove('hidden');
            // Load fragment progress in sidebar
            loadFragments();
            // Async calc boss damage (fetch all hunt games)
            state.bossDamagePromise = calculateRecentBossDamage(json.data.gameList);
        } else {
            showError('数据获取失败: ' + (json.message || '未知错误'));
            if (json.message === 'Missing Cookie' || json.message === 'Invalid Cookie' || json.message === 'No Data') {
                showCookieExpiredModal();
            }
        }
    } catch (e) {
        showError('请求失败: ' + e.message);
    } finally {
        dom.loading.classList.add('hidden');
    }
}

async function calculateRecentBossDamage(gameList) {
    if (!gameList || !gameList.length) {
        if (dom.recentBossDmg) dom.recentBossDmg.textContent = '-';
        return;
    }

    // filter for 猎场 games (usually mapId 12, 14, 16, 17, 21, 112, 114, 115)
    const huntGames = gameList.filter(g => g.modeName && g.modeName.includes('猎场'));
    if (huntGames.length === 0) {
        if (dom.recentBossDmg) dom.recentBossDmg.textContent = '-';
        return;
    }

    // Fetch a maximum of 10 games to avoid Cloudflare Workers subrequest / timeout limits
    // while providing a meaningful fast sample.
    const gamesToFetch = huntGames.slice(0, 10);
    let totalBossDmg = 0;
    let validCount = 0;

    if (dom.recentBossDmg) dom.recentBossDmg.textContent = '计算中...';

    const delay = ms => new Promise(res => setTimeout(res, ms));

    try {
        // Fetch in batches of 5 to avoid overwhelming the server concurrently
        const batchSize = 5;
        for (let i = 0; i < gamesToFetch.length; i += batchSize) {
            const batch = gamesToFetch.slice(i, i + batchSize);
            const promises = batch.map(g => fetch(`${API_BASE}/detail?room_id=${g.DsRoomId}`, {
                headers: { 'X-NZM-Cookie': state.cookie }
            }).then(r => r.json()).catch(() => null));

            const results = await Promise.all(promises);
            results.forEach(res => {
                if (res && res.success && res.data && res.data.loginUserDetail) {
                    const huntInfo = res.data.loginUserDetail.huntingDetails || {};
                    const dmg = parseInt(huntInfo.damageTotalOnBoss || huntInfo.DamageTotalOnBoss || 0);
                    if (dmg >= 0 && !isNaN(dmg)) {
                        totalBossDmg += dmg;
                        validCount++;
                    }
                }
            });

            // Small delay between batches to avoid rate limits
            if (i + batchSize < gamesToFetch.length) {
                await delay(300);
            }
        }

        let avg = 0;
        if (validCount > 0) avg = Math.floor(totalBossDmg / validCount);

        // Store for share canvas
        if (state.data) state.data.calcAvgBossDamage = avg;

        if (dom.recentBossDmg) {
            dom.recentBossDmg.textContent = avg > 0 ? formatNumber(avg) : '0';
        }
    } catch (e) {
        console.warn('Failed to calculate recent boss damage', e);
        if (dom.recentBossDmg) dom.recentBossDmg.textContent = '获取失败';
    }
}

async function loadMatchDetail(roomId, container, mode) {
    try {
        const res = await fetch(`${API_BASE}/detail?room_id=${roomId}`, {
            headers: { 'X-NZM-Cookie': state.cookie }
        });
        const json = await res.json();
        if (json.success && json.data) {
            renderMatchDetail(json.data, container, mode);
            container.dataset.loaded = 'true';
        } else {
            container.innerHTML = `<div style="text-align:center;color:#ff4444">加载失败</div>`;
        }
    } catch (e) {
        container.innerHTML = `<div style="text-align:center;color:#ff4444">网络错误</div>`;
    }
}

// --- View Helpers ---
function switchView(viewName) {
    if (viewName === 'login') {
        dom.loginView.classList.remove('hidden');
        dom.statsView.classList.add('hidden');
    } else {
        dom.loginView.classList.add('hidden');
        dom.statsView.classList.remove('hidden');
    }
}

function showError(msg) {
    dom.errorMsg.textContent = msg;
    dom.errorMsg.classList.remove('hidden');
    setTimeout(() => dom.errorMsg.classList.add('hidden'), 3000);
}

// --- Reused Render Logic ---
const MAP_NAME = {};
const DIFF_NAME = { '0': '默认', '1': '引导', '2': '普通', '3': '困难', '4': '英雄', '5': '炼狱', '6': '折磨I', '7': '折磨II', '8': '折磨III', '9': '折磨IV', '10': '折磨V', '11': '折磨VI' };

function getModeByMapId(mapId) {
    const id = parseInt(mapId);
    if ([12, 14, 16, 17, 21, 30, 112, 114, 115].includes(id)) return '僵尸猎场';
    if ([300, 304, 306, 308].includes(id)) return '塔防战';
    if ([321, 322, 323, 324].includes(id)) return '时空追猎';
    if (id >= 1000) return '机甲战';
    return '未知';
}

function renderStats(data) {
    // 1. Official Summary
    const os = data.officialSummary || {};
    const huntGames = os.huntGameCount || '-';
    const towerGames = os.towerGameCount || '-';
    let playTime = os.playtime ? `${Math.floor(os.playtime / 60)}时` : '-'; // Use os.playtime directly

    if (dom.offHuntGames) dom.offHuntGames.textContent = huntGames;
    if (dom.offTowerGames) dom.offTowerGames.textContent = towerGames;
    if (dom.offPlayTime) dom.offPlayTime.textContent = playTime;

    dom.recentGames.textContent = data.totalGames;
    dom.recentWin.textContent = data.winRate + '%';
    dom.recentDmg.textContent = formatNumber(data.avgDamage);

    // Modes
    let modeHtml = '';
    for (const [m, info] of Object.entries(data.modeStats)) {
        const rate = info.total > 0 ? ((info.win / info.total) * 100).toFixed(1) : 0;
        modeHtml += `
            <div class="stat-card mode-card">
                <h3>${m}</h3>
                <div class="value">${info.total} <small>场</small></div>
                <div class="details">
                    <span class="win">胜 ${info.win}</span>
                    <span class="loss">负 ${info.loss}</span>
                    <span style="opacity:0.7">${rate}%</span>
                </div>
            </div>`;
    }
    dom.modeStats.innerHTML = modeHtml;

    // Maps
    let mapHtml = '';
    for (const [m, diffs] of Object.entries(data.mapStats)) {
        let total = 0, win = 0;
        let diffStr = '';
        for (const [d, v] of Object.entries(diffs)) {
            total += v.total; win += v.win;
            diffStr += `<div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-top:2px;"><span>${d}</span><span>${v.total}场 (${v.win > 0 ? Math.floor(v.win / v.total * 100) : 0}%)</span></div>`;
        }
        // Find correct image from game list if possible
        const found = data.gameList.find(g => g.mapName === m);
        let img = 'images/maps-304.png';
        if (found && found.icon) img = found.icon;

        // Manual fallbacks only if backend is empty
        if (!found?.icon) {
            if (m.includes('大都会')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-14.png';
            if (m.includes('复活节')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-12.png';
            if (m.includes('风暴')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-1000.png';
            if (m.includes('根除')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-321.png';
            if (m.includes('昆仑神宫')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-16.png';
            if (m.includes('精绝古城')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-17.png';
            if (m.includes('联盟大厦')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-306.png';
            if (m.includes('猎杀南十字')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-323.png';
        }

        const rate = total > 0 ? ((win / total) * 100).toFixed(0) : 0;

        mapHtml += `
            <div class="stat-card map-card" style="background-image: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%), url('${img}'); background-size: cover; background-position: center;">
                <div style="position:relative; z-index:2; height:100%; display:flex; flex-direction:column; justify-content:flex-end;">
                    <h3 style="margin:0 0 0.5rem 0; font-size:1.1rem; text-shadow:0 2px 4px rgba(0,0,0,0.8);">${m}</h3>
                    <div style="font-size:0.8rem; margin-bottom:0.5rem; opacity:0.9;">${total}场 - ${rate}% 胜率</div>
                    <div class="map-diffs" style="margin-top:0.25rem;">${diffStr}</div>
                </div>
            </div>`;
    }
    dom.mapStats.innerHTML = mapHtml;

    renderMatchHistory(data.gameList);
}

let currentModeFilter = 'all';
let currentPage = 1;
const ITEMS_PER_PAGE = 10;

function filteredLength(list) {
    return list.filter(g => {
        const mode = getModeByMapId(g.iMapId);
        if (mode === '机甲') return false;
        if (currentModeFilter === 'all') return true;
        return mode === currentModeFilter;
    }).length;
}

function renderMatchHistory(gameList) {
    if (!dom.matchHistory) return;
    dom.matchHistory.innerHTML = '';

    const filteredList = gameList.filter(g => {
        const mode = getModeByMapId(g.iMapId);
        if (mode === '机甲战') return false;
        if (currentModeFilter === 'all') return true;
        return mode === currentModeFilter;
    });

    if (filteredList.length === 0) {
        dom.matchHistory.innerHTML = '<div class="match-item">暂无符合条件的对局记录</div>';
        updatePagination(0);
        return;
    }

    const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
    if (currentPage > totalPages) currentPage = 1;
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const pageData = filteredList.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    const htmlList = pageData.map((game, idx) => {
        const mode = getModeByMapId(game.iMapId);
        const mapName = game.mapName || MAP_NAME[game.iMapId] || `未知(${game.iMapId})`;
        const diffName = game.diffName || DIFF_NAME[game.iSubModeType] || game.iSubModeType;
        const isWin = game.iIsWin === '1' || game.iIsWin === 1;
        const duration = parseInt(game.iDuration) || 0;
        const durationStr = `${Math.floor(duration / 60)}分${duration % 60}秒`;
        const startTime = game.dtGameStartTime || '';
        const score = parseInt(game.iScore) || 0;

        // Find match image
        const found = gameList.find(g => g.iMapId === game.iMapId); // Or just search in global mapInfo if available, but here we can look up in data.gameList or reuse logic. 
        // Actually the game object itself has iMapId. We can try to find icon from data.gameList if available in scope? 
        // renderMatchHistory payload is just a list. Let's start with default image or try to pass mapIcons map.
        // For simplicity, reuse the same fallback logic or if the object already has it.
        // The 'game' object here comes from filteredList which comes from data.gameList.

        let img = 'images/maps-304.png';
        if (game.icon) img = game.icon;
        if (!game.icon) {
            // Simple fallback based on name or ID if needed, similar to map stats
            if (mapName.includes('大都会')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-14.png';
            else if (mapName.includes('复活节')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-12.png';
            else if (mapName.includes('风暴')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-1000.png';
            else if (mapName.includes('根除')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-321.png';
            else if (mapName.includes('昆仑神宫')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-16.png';
            else if (mapName.includes('精绝古城')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-17.png';
            else if (mapName.includes('联盟大厦')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-306.png';
            else if (mapName.includes('猎杀南十字')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-323.png';
        }

        // Format Date: "01-25 15:13"
        let dateStr = startTime;
        try {
            const d = new Date(startTime);
            const m = (d.getMonth() + 1).toString().padStart(2, '0');
            const dd = d.getDate().toString().padStart(2, '0');
            const hh = d.getHours().toString().padStart(2, '0');
            const mm = d.getMinutes().toString().padStart(2, '0');
            dateStr = `${m}-${dd} ${hh}:${mm}`;
        } catch (e) { }

        return `
            <div class="match-item ${isWin ? 'win' : 'loss'}" data-idx="${startIdx + idx}" data-roomid="${game.DsRoomId}" data-mode="${mode}">
                <div class="match-content-row">
                    <img src="${img}" class="match-thumb" loading="lazy">
                    
                    <div class="match-info-center">
                        <div class="match-info-top">
                            <span class="match-result-text ${isWin ? 'text-red' : ''}">${isWin ? '胜利' : '失败'}</span>
                            <span class="match-mode-text">${mode}</span>
                        </div>
                        <div class="match-info-bottom">
                            <span class="match-map-name">${mapName}-${diffName}</span>
                            <span class="match-date">${dateStr}</span>
                        </div>
                    </div>

                    <div class="match-toggle-btn">
                        <span class="toggle-text"></span>
                        <span class="toggle-icon"></span>
                    </div>

                    <div class="match-info-right">
                        <div class="match-score-text">${formatNumber(score)}</div>
                        <div class="match-duration-text">${Math.floor(duration / 60)}分${duration % 60}秒</div>
                    </div>
                </div>
                
                <div class="match-details" id="detail-${game.DsRoomId}"></div>
            </div>
        `;
    });

    dom.matchHistory.innerHTML = htmlList.join('');

    dom.matchHistory.querySelectorAll('.match-item').forEach(item => {
        item.addEventListener('click', async (e) => {
            if (e.target.closest('.match-details')) return;
            item.classList.toggle('expanded');
            if (item.classList.contains('expanded')) {
                const roomId = item.dataset.roomid;
                const mode = item.dataset.mode;
                const detailContainer = document.getElementById(`detail-${roomId}`);
                if (detailContainer && !detailContainer.dataset.loaded) {
                    detailContainer.innerHTML = '<div style="text-align:center;padding:1rem;">正在加载...</div>';
                    await loadMatchDetail(roomId, detailContainer, mode);
                }
            }
        });
    });

    updatePagination(totalPages);
}

function updatePagination(totalPages) {
    if (!dom.pageInfo) return;
    dom.pageInfo.textContent = `第 ${currentPage} 页 / 共 ${totalPages} 页`;
    dom.prevPage.disabled = currentPage <= 1;
    dom.nextPage.disabled = currentPage >= totalPages;
}

function formatNumber(num) {
    return (num || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getQualityLabel(quality) {
    switch (quality) {
        case 4: return '传说';
        case 3: return '史诗';
        case 2: return '稀有';
        default: return '普通';
    }
}

// Render compact equipment for inline display in player cards
function renderEquipmentCompact(equipmentScheme) {
    if (!equipmentScheme || equipmentScheme.length === 0) {
        return '<p style="color:#888; text-align:center; padding:1rem;">无配装数据</p>';
    }

    const weaponsHtml = equipmentScheme.map(weapon => {
        const weaponName = decodeURIComponent(weapon.weaponName || '');
        const quality = weapon.quality || 1;
        const qualityClass = `weapon-quality-${quality}`;

        // Render plugins (small icons)
        const pluginsHtml = (weapon.commonItems || []).map(plugin => {
            const pluginName = decodeURIComponent(plugin.itemName || '');
            return `
                <div class="plugin-item-compact">
                    <img src="${plugin.pic}" class="compact-plugin-icon" title="${pluginName}" loading="lazy">
                    <span class="plugin-name-compact">${pluginName}</span>
                </div>
            `;
        }).join('');

        return `
            <div class="weapon-card-compact ${qualityClass}">
                <div class="weapon-image-compact">
                    <img src="${weapon.pic}" alt="${weaponName}" loading="lazy" onerror="this.style.opacity='0.3'">
                </div>
                <div class="weapon-name-compact" title="${weaponName}">${weaponName}</div>
                <div class="weapon-plugins-compact">
                    ${pluginsHtml}
                </div>
            </div>
        `;
    }).join('');

    return `<div class="equipment-compact-grid">${weaponsHtml}</div>`;
}

// Toggle between stats and equipment view for a specific match detail
function toggleMatchDetailView(btn) {
    const container = btn.closest('.match-details');
    if (!container) return;

    // Toggle state class on container to track state
    const isEquipmentView = container.classList.toggle('equipment-mode');

    // Toggle hidden classes within this container
    const allStats = container.querySelectorAll('.player-view[id^="stats-"]');
    const allEquip = container.querySelectorAll('.player-view[id^="equipment-"]');
    const playerLists = container.querySelectorAll('.player-list');
    const userDetailRows = container.querySelectorAll('.user-detail-row');

    const toggleIcon = btn.querySelector('#global-toggle-icon');
    const toggleText = btn.querySelector('#global-toggle-text');

    if (isEquipmentView) {
        // Switch to Equipment View
        allStats.forEach(el => el.classList.add('hidden'));
        allEquip.forEach(el => el.classList.remove('hidden'));
        playerLists.forEach(el => el.classList.add('large-mode')); // Enable large mode
        userDetailRows.forEach(el => el.classList.add('large-mode')); // Enable large mode for self

        if (toggleIcon) toggleIcon.innerHTML = '<path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>'; // Grid icon
        if (toggleText) toggleText.textContent = '显示数据';
    } else {
        // Switch to Stats View
        allStats.forEach(el => el.classList.remove('hidden'));
        allEquip.forEach(el => el.classList.add('hidden'));
        playerLists.forEach(el => el.classList.remove('large-mode')); // Disable large mode
        userDetailRows.forEach(el => el.classList.remove('large-mode')); // Disable large mode for self

        if (toggleIcon) toggleIcon.innerHTML = '<path d="M14.5 13.5h2v-3.5h-2v3.5zm-3.5 0h2v-6h-2v6zm-3.5 0h2v-8.5h-2v8.5zm-3.5 0h2v-6h-2v6zm-3.5 3.5h19v-14h-19v14zm1.5-1.5v-11h16v11h-16z"/>'; // Chart icon
        if (toggleText) toggleText.textContent = '显示配装';
    }
}

// Render Checkpoint Times
function renderCheckpointTimes(partitionDetails) {
    if (!partitionDetails || partitionDetails.length === 0) return '';

    // Sort by areaId to maintain correct game progression order
    const sortedCheckpoints = [...partitionDetails].sort((a, b) => {
        return parseInt(a.areaId) - parseInt(b.areaId);
    });

    const checkpointsHtml = sortedCheckpoints.map(checkpoint => {
        const areaName = CHECKPOINT_AREAS[checkpoint.areaId] || `未知环节(${checkpoint.areaId})`;
        const usedTime = parseInt(checkpoint.usedTime) || 0;
        const minutes = Math.floor(usedTime / 60);
        const seconds = usedTime % 60;
        const timeStr = minutes > 0 ? `${minutes}分${seconds}秒` : `${seconds}秒`;

        return `
            <div class="checkpoint-item">
                <div class="checkpoint-name">${areaName}</div>
                <div class="checkpoint-time">${timeStr}</div>
            </div>
        `;
    }).join('');

    return `
        <div class="checkpoint-container">
            <div class="checkpoint-title">区域用时</div>
            <div class="checkpoint-list">${checkpointsHtml}</div>
        </div>
    `;
}

function renderMatchDetail(data, container, mode) {
    const self = data.loginUserDetail;
    const teammates = (data.list || []).filter(p => p.nickname !== self.nickname);
    teammates.sort((a, b) => (parseInt(b.baseDetail.iScore) || 0) - (parseInt(a.baseDetail.iScore) || 0));

    // Hide extra stats for Tower Defense (塔防战) and Time Hunting (时空追猎)
    const showExtra = mode !== '塔防战' && mode !== '时空追猎';

    // Render checkpoint times if available (only for 猎场)
    let checkpointHtml = '';
    if (self.huntingDetails?.partitionDetails && self.huntingDetails.partitionDetails.length > 0) {
        checkpointHtml = renderCheckpointTimes(self.huntingDetails.partitionDetails);
    }

    // Global Toggle Button
    const globalToggleHtml = `
        <div class="global-toggle-container" style="display:flex; justify-content:center; margin-bottom:1rem; position:relative;">
            <button class="global-toggle-btn" onclick="toggleMatchDetailView(this)">
                <svg id="global-toggle-icon" class="line-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                     <path d="M14.5 13.5h2v-3.5h-2v3.5zm-3.5 0h2v-6h-2v6zm-3.5 0h2v-8.5h-2v8.5zm-3.5 0h2v-6h-2v6zm-3.5 3.5h19v-14h-19v14zm1.5-1.5v-11h16v11h-16z"/>
                </svg>
                <span id="global-toggle-text" style="font-size:0.8rem; margin-left:0.4rem;">显示配装</span>
            </button>
        </div>
    `;

    let html = checkpointHtml + globalToggleHtml + '<div class="player-list">';
    teammates.forEach((p, idx) => {
        const info = p.baseDetail;
        const hunt = p.huntingDetails || {};
        const hasExtra = showExtra && ((hunt.damageTotalOnBoss || hunt.DamageTotalOnBoss) > 0 || (hunt.damageTotalOnMobs || hunt.DamageTotalOnMobs) > 0 || hunt.totalCoin > 0);
        const equipmentCompactHtml = renderEquipmentCompact(p.equipmentScheme);
        const playerId = `teammate-${idx}`;

        html += `
            <div class="player-item" data-player-id="${playerId}" style="display:block; position:relative;">
                <!-- Stats View (Default) -->
                <div id="stats-${playerId}" class="player-view">
                    <div style="display:flex; align-items:center; gap:0.75rem;">
                        <img src="${decodeURIComponent(p.avatar)}" class="player-avatar" onerror="this.src='images/maps-304.png'">
                        <div class="player-info">
                            <div class="player-name">${decodeURIComponent(p.nickname)}</div>
                            <div class="player-stats-grid">
                                <div class="stat-group">
                                    <span>积分: ${formatNumber(info.iScore)}</span>
                                    <span>击杀: ${info.iKills}</span>
                                    <span>死亡: ${info.iDeaths}</span>
                                </div>
                                ${hasExtra ? `
                                <div class="stat-group extra">
                                    <span>Boss: ${formatNumber(hunt.damageTotalOnBoss || hunt.DamageTotalOnBoss || 0)}</span>
                                    <span>小怪: ${formatNumber(hunt.damageTotalOnMobs || hunt.DamageTotalOnMobs || 0)}</span>
                                    <span>金币: ${formatNumber(hunt.totalCoin || 0)}</span>
                                </div>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Equipment View (Hidden by default) -->
                <div id="equipment-${playerId}" class="player-view hidden">
                    <div class="player-equipment-inline">
                        <div class="equipment-inline-header">
                            <img src="${decodeURIComponent(p.avatar)}" class="player-avatar-small" onerror="this.src='images/maps-304.png'">
                            <span class="player-name-small">${decodeURIComponent(p.nickname)}</span>
                        </div>
                        ${equipmentCompactHtml}
                    </div>
                </div>
            </div>`;
    });
    html += '</div>';

    const selfInfo = self.baseDetail;
    const selfHunt = self.huntingDetails || {};
    const selfEquipmentCompactHtml = renderEquipmentCompact(self.equipmentScheme);

    html += `
        <div class="user-detail-row" data-player-id="self" style="margin-top:1rem; background:rgba(255,255,255,0.05); padding:1rem; border-radius:0.5rem; position:relative;">
            <!-- Stats View (Default) -->
            <div id="stats-self" class="player-view">
                <div style="display:flex; gap:1rem; align-items:center;">
                    <div style="flex-shrink:0; text-align:center;">
                        <img src="${decodeURIComponent(self.avatar)}" style="width:50px; height:50px; border-radius:50%; border:2px solid var(--accent);">
                        <div style="font-weight:bold; margin-top:0.25rem;">${decodeURIComponent(self.nickname)}</div>
                    </div>
                    <div class="detail-grid" style="flex-grow:1; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));">
                        <div class="detail-item"><div class="label">积分</div><div class="value">${formatNumber(selfInfo.iScore)}</div></div>
                        <div class="detail-item"><div class="label">击杀</div><div class="value">${selfInfo.iKills}</div></div>
                        <div class="detail-item"><div class="label">死亡</div><div class="value">${selfInfo.iDeaths}</div></div>
                        ${showExtra ? `
                        <div class="detail-item"><div class="label">Boss伤害</div><div class="value">${formatNumber(selfHunt.damageTotalOnBoss || selfHunt.DamageTotalOnBoss || 0)}</div></div>
                        <div class="detail-item"><div class="label">小怪伤害</div><div class="value">${formatNumber(selfHunt.damageTotalOnMobs || selfHunt.DamageTotalOnMobs || 0)}</div></div>
                        <div class="detail-item"><div class="label">金币</div><div class="value">${formatNumber(selfHunt.totalCoin || 0)}</div></div>
                        ` : ''}
                    </div>
                </div>
            </div>
            
            <!-- Equipment View (Hidden by default) -->
            <div id="equipment-self" class="player-view hidden">
                <div class="player-equipment-inline">
                    <div class="equipment-inline-header">
                        <img src="${decodeURIComponent(self.avatar)}" class="player-avatar-small" onerror="this.src='images/maps-304.png'">
                        <span class="player-name-small">${decodeURIComponent(self.nickname)}</span>
                    </div>
                    ${selfEquipmentCompactHtml}
                </div>
            </div>
        </div>`;

    container.innerHTML = html;
}

// --- Tab Switching ---
function switchTab(tab) {
    state.currentTab = tab;

    // Update nav tab styles
    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    // Toggle content visibility
    if (tab === 'stats') {
        dom.statsTab.classList.remove('hidden');
        dom.collectionTab.classList.add('hidden');
    } else if (tab === 'collection') {
        dom.statsTab.classList.add('hidden');
        dom.collectionTab.classList.remove('hidden');
        if (!state.collection) {
            loadCollection();
        }
    }
}

// --- Collection Data ---
async function loadCollection() {
    dom.weaponGrid.innerHTML = '<p style="color:#888;">加载中...</p>';
    dom.trapGrid.innerHTML = '<p style="color:#888;">加载中...</p>';
    dom.pluginGrid.innerHTML = '<p style="color:#888;">加载中...</p>';

    try {
        const res = await fetch(`${API_BASE}/collection?type=all`, {
            headers: { 'X-NZM-Cookie': state.cookie }
        });
        const json = await res.json();

        if (json.success) {
            state.collection = json.data;
            renderWeapons(json.data.weapons);
            renderTraps(json.data.traps);
            renderPlugins(json.data.plugins);

            // Update counts
            if (json.data.weaponSummary) {
                dom.weaponCount.textContent = `(${json.data.weaponSummary.owned}/${json.data.weaponSummary.total})`;
            }
            if (json.data.trapSummary) {
                dom.trapCount.textContent = `(${json.data.trapSummary.owned}/${json.data.trapSummary.total})`;
            }
            if (json.data.pluginSummary) {
                dom.pluginCount.textContent = `(${json.data.pluginSummary.owned}/${json.data.pluginSummary.total})`;
            }

            // Render fragment progress
            if (json.data.home && json.data.home.show) {
                renderFragments(json.data.home.show);
            }
        }
    } catch (e) {
        console.error('Failed to load collection:', e);
    }
}

function getQualityBadge(quality) {
    switch (quality) {
        case 4: return '<span class="collection-item-badge badge-legendary">传说</span>';
        case 3: return '<span class="collection-item-badge badge-epic">史诗</span>';
        case 2: return '<span class="collection-item-badge badge-rare">稀有</span>';
        default: return '<span class="collection-item-badge badge-common">普通</span>';
    }
}

function renderWeapons(weapons, filterQuality = 'all') {
    if (!weapons) return;

    let filtered = filterQuality === 'all'
        ? [...weapons]
        : weapons.filter(w => w.quality == filterQuality);

    // 排序：已解锁优先，然后按品质从高到低 (4=传说 > 3=史诗 > 2=稀有 > 1=普通)
    filtered.sort((a, b) => {
        // 先按是否拥有排序（拥有的在前）
        if (a.owned !== b.owned) return a.owned ? -1 : 1;
        // 再按品质排序（高品质在前）
        return (b.quality || 0) - (a.quality || 0);
    });

    dom.weaponGrid.innerHTML = filtered.map(w => `
        <div class="collection-item ${w.owned ? '' : 'not-owned'}" data-quality="${w.quality}">
            ${getQualityBadge(w.quality)}
            <img class="collection-item-img" src="${w.pic}" alt="${w.weaponName}" loading="lazy">
            <div class="collection-item-info">
                <div class="collection-item-name" title="${w.weaponName}">${w.weaponName}</div>
            </div>
        </div>
    `).join('');
}

function filterWeapons(quality) {
    if (state.collection && state.collection.weapons) {
        renderWeapons(state.collection.weapons, quality);
    }
}

function renderTraps(traps) {
    if (!traps) return;

    dom.trapGrid.innerHTML = traps.map(t => `
        <div class="collection-item ${t.owned ? '' : 'not-owned'}">
            <img class="collection-item-img" src="${t.icon}" alt="${t.trapName}" loading="lazy">
            <div class="collection-item-info">
                <div class="collection-item-name" title="${t.trapName}">${t.trapName}</div>
            </div>
        </div>
    `).join('');
}

function renderPlugins(plugins, filterSlot = 'all') {
    if (!plugins) return;

    const filtered = filterSlot === 'all'
        ? plugins
        : plugins.filter(p => p.slotIndex == filterSlot);

    dom.pluginGrid.innerHTML = filtered.map(p => `
        <div class="collection-item ${p.owned ? '' : 'not-owned'}" data-slot="${p.slotIndex}">
            ${getQualityBadge(p.quality)}
            <img class="collection-item-img" src="${p.pic}" alt="${p.itemName}" loading="lazy">
            <div class="collection-item-info">
                <div class="collection-item-name" title="${p.itemName}">${p.itemName}</div>
            </div>
        </div>
    `).join('');
}

function filterPlugins(slot) {
    if (state.collection && state.collection.plugins) {
        renderPlugins(state.collection.plugins, slot);
    }
}

// --- Fragment Progress ---
function renderFragments(fragments) {
    if (!fragments || fragments.length === 0) {
        dom.fragmentList.innerHTML = '<p style="color:#888;font-size:0.9rem;">暂无碎片进度</p>';
        return;
    }

    // 只显示有碎片进度的武器
    const withProgress = fragments.filter(f => f.itemProgress && f.itemProgress.current > 0);

    if (withProgress.length === 0) {
        dom.fragmentList.innerHTML = '<p style="color:#888;font-size:0.9rem;">暂无碎片进度</p>';
        return;
    }

    dom.fragmentList.innerHTML = withProgress.map(f => {
        const progress = f.itemProgress;
        const percent = Math.min(100, (progress.current / progress.required) * 100);
        const isComplete = progress.current >= progress.required;

        return `
            <div class="progress-item">
                <img class="progress-icon" src="${f.pic || ''}" alt="${f.weaponName}">
                <div class="progress-info">
                    <div class="progress-name">${f.weaponName}</div>
                    <div class="progress-bar-track">
                        <div class="progress-bar-fill ${isComplete ? 'complete' : ''}" style="width:${percent}%"></div>
                    </div>
                    <div class="progress-text">${progress.current}/${progress.required}</div>
                </div>
            </div>
        `;
    }).join('');
}

// Load fragments on stats load
async function loadFragments() {
    try {
        const res = await fetch(`${API_BASE}/collection?type=home`, {
            headers: { 'X-NZM-Cookie': state.cookie }
        });
        const json = await res.json();

        if (json.success && json.data.home) {
            renderFragments(json.data.home);
        }
    } catch (e) {
        console.error('Failed to load fragments:', e);
    }
}

// --- Sidebar Toggle & Drag ---
function initSidebar() {
    const sidebar = document.getElementById('progress-sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    const dragHandle = document.getElementById('sidebar-drag-handle');

    if (!sidebar || !toggleBtn) return;

    // Restore collapsed state from localStorage
    const isCollapsed = localStorage.getItem('sidebar_collapsed') === 'true';
    if (isCollapsed) {
        sidebar.classList.add('collapsed');
    }

    // Restore position from localStorage
    const savedPos = localStorage.getItem('sidebar_position');
    if (savedPos) {
        try {
            const pos = JSON.parse(savedPos);
            sidebar.style.right = 'auto';
            sidebar.style.top = 'auto';
            sidebar.style.left = pos.left + 'px';
            sidebar.style.top = pos.top + 'px';
        } catch (e) { }
    }

    // Toggle functionality
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.add('collapsed');
        localStorage.setItem('sidebar_collapsed', 'true');
    });

    // Track if we just finished dragging to prevent click-to-expand
    let justDragged = false;

    // Click collapsed ball to expand (only if not dragging)
    sidebar.addEventListener('click', (e) => {
        if (justDragged) {
            justDragged = false;
            return;
        }
        if (sidebar.classList.contains('collapsed')) {
            sidebar.classList.remove('collapsed');
            localStorage.setItem('sidebar_collapsed', 'false');
        }
    });

    // Drag functionality
    let isDragging = false;
    let hasMoved = false;
    let startX, startY, offsetX, offsetY;

    const startDrag = (e) => {
        // Only drag from header when expanded, or anywhere when collapsed
        if (!sidebar.classList.contains('collapsed') && !e.target.closest('#sidebar-drag-handle')) {
            return;
        }
        if (e.target.closest('#sidebar-toggle')) return;

        isDragging = true;
        hasMoved = false;
        sidebar.classList.add('dragging');

        const rect = sidebar.getBoundingClientRect();

        if (e.type === 'touchstart') {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        } else {
            startX = e.clientX;
            startY = e.clientY;
        }

        // Calculate offset from mouse position to element top-left corner
        offsetX = startX - rect.left;
        offsetY = startY - rect.top;

        e.preventDefault();
    };

    const doDrag = (e) => {
        if (!isDragging) return;

        let clientX, clientY;
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        // Check if moved enough to count as drag
        if (Math.abs(clientX - startX) > 3 || Math.abs(clientY - startY) > 3) {
            hasMoved = true;
        }

        // Calculate new position based on mouse position minus initial offset
        let newLeft = clientX - offsetX;
        let newTop = clientY - offsetY;

        // Boundary constraints
        const maxLeft = window.innerWidth - sidebar.offsetWidth;
        const maxTop = window.innerHeight - sidebar.offsetHeight;

        newLeft = Math.max(0, Math.min(newLeft, maxLeft));
        newTop = Math.max(0, Math.min(newTop, maxTop));

        sidebar.style.right = 'auto';
        sidebar.style.left = newLeft + 'px';
        sidebar.style.top = newTop + 'px';

        e.preventDefault();
    };

    const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        sidebar.classList.remove('dragging');

        // If we actually moved, set flag to prevent click expansion
        if (hasMoved) {
            justDragged = true;
            // Reset after a short delay to allow future clicks
            setTimeout(() => { justDragged = false; }, 100);
        }

        // Save position
        const rect = sidebar.getBoundingClientRect();
        localStorage.setItem('sidebar_position', JSON.stringify({
            left: rect.left,
            top: rect.top
        }));
    };

    // Mouse events
    dragHandle.addEventListener('mousedown', startDrag);
    sidebar.addEventListener('mousedown', (e) => {
        if (sidebar.classList.contains('collapsed')) startDrag(e);
    });
    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', endDrag);

    // Touch events
    dragHandle.addEventListener('touchstart', startDrag, { passive: false });
    sidebar.addEventListener('touchstart', (e) => {
        if (sidebar.classList.contains('collapsed')) startDrag(e);
    }, { passive: false });
    document.addEventListener('touchmove', doDrag, { passive: false });
    document.addEventListener('touchend', endDrag);

    // Handle window resize - keep sidebar within bounds
    const keepInBounds = () => {
        // Skip if sidebar is not visible (e.g., on login page)
        if (sidebar.offsetWidth === 0 || sidebar.offsetHeight === 0) {
            return;
        }

        // Get the original saved position
        const savedPos = localStorage.getItem('sidebar_position');
        let targetLeft, targetTop;

        if (savedPos) {
            try {
                const pos = JSON.parse(savedPos);
                targetLeft = pos.left;
                targetTop = pos.top;
            } catch (e) {
                // No valid saved position, use CSS default (right: 20px)
                return;
            }
        } else {
            // No saved position, let CSS handle default positioning
            return;
        }

        const maxLeft = window.innerWidth - sidebar.offsetWidth;
        const maxTop = window.innerHeight - sidebar.offsetHeight;

        // Clamp position to current window bounds
        const newLeft = Math.max(0, Math.min(targetLeft, maxLeft));
        const newTop = Math.max(0, Math.min(targetTop, maxTop));

        sidebar.style.right = 'auto';
        sidebar.style.left = newLeft + 'px';
        sidebar.style.top = newTop + 'px';

        // DO NOT save - keep original position in localStorage
    };

    window.addEventListener('resize', keepInBounds);

    // Check bounds on initial load only if there's a saved position
    if (localStorage.getItem('sidebar_position')) {
        setTimeout(keepInBounds, 100);
    }
}

// --- Donate Sidebar Toggle & Drag (PC Only) ---
function initDonateSidebar() {
    const sidebar = document.getElementById('donate-sidebar');
    const toggleBtn = document.getElementById('donate-toggle');
    const dragHandle = document.getElementById('donate-drag-handle');

    if (!sidebar || !toggleBtn) return;

    // Restore collapsed state
    if (localStorage.getItem('donate_collapsed') === 'true') {
        sidebar.classList.add('collapsed');
    }

    // Restore position
    const savedPos = localStorage.getItem('donate_position');
    if (savedPos) {
        try {
            const pos = JSON.parse(savedPos);
            sidebar.style.left = pos.left + 'px';
            sidebar.style.top = pos.top + 'px';
        } catch (e) { }
    }

    // Toggle
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.add('collapsed');
        localStorage.setItem('donate_collapsed', 'true');
    });

    let justDragged = false;
    sidebar.addEventListener('click', (e) => {
        if (justDragged) { justDragged = false; return; }
        if (sidebar.classList.contains('collapsed')) {
            sidebar.classList.remove('collapsed');
            localStorage.setItem('donate_collapsed', 'false');
        }
    });

    // Drag
    let isDragging = false, hasMoved = false, startX, startY, offsetX, offsetY;

    const startDrag = (e) => {
        if (!sidebar.classList.contains('collapsed') && !e.target.closest('#donate-drag-handle')) return;
        if (e.target.closest('#donate-toggle')) return;
        isDragging = true; hasMoved = false;
        sidebar.classList.add('dragging');
        const rect = sidebar.getBoundingClientRect();
        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        startX = clientX; startY = clientY;
        offsetX = clientX - rect.left; offsetY = clientY - rect.top;
        e.preventDefault();
    };

    const doDrag = (e) => {
        if (!isDragging) return;
        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
        if (Math.abs(clientX - startX) > 3 || Math.abs(clientY - startY) > 3) hasMoved = true;
        let newLeft = Math.max(0, Math.min(clientX - offsetX, window.innerWidth - sidebar.offsetWidth));
        let newTop = Math.max(0, Math.min(clientY - offsetY, window.innerHeight - sidebar.offsetHeight));
        sidebar.style.left = newLeft + 'px';
        sidebar.style.top = newTop + 'px';
        e.preventDefault();
    };

    const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        sidebar.classList.remove('dragging');
        if (hasMoved) { justDragged = true; setTimeout(() => justDragged = false, 100); }
        const rect = sidebar.getBoundingClientRect();
        localStorage.setItem('donate_position', JSON.stringify({ left: rect.left, top: rect.top }));
    };

    dragHandle.addEventListener('mousedown', startDrag);
    sidebar.addEventListener('mousedown', (e) => { if (sidebar.classList.contains('collapsed')) startDrag(e); });
    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', endDrag);
    dragHandle.addEventListener('touchstart', startDrag, { passive: false });
    sidebar.addEventListener('touchstart', (e) => { if (sidebar.classList.contains('collapsed')) startDrag(e); }, { passive: false });
    document.addEventListener('touchmove', doDrag, { passive: false });
    document.addEventListener('touchend', endDrag);

    // Keep in bounds on resize
    window.addEventListener('resize', () => {
        if (sidebar.offsetWidth === 0) return;
        const pos = localStorage.getItem('donate_position');
        if (!pos) return;
        try {
            const { left, top } = JSON.parse(pos);
            const maxLeft = window.innerWidth - sidebar.offsetWidth;
            const maxTop = window.innerHeight - sidebar.offsetHeight;
            sidebar.style.left = Math.max(0, Math.min(left, maxLeft)) + 'px';
            sidebar.style.top = Math.max(0, Math.min(top, maxTop)) + 'px';
        } catch (e) { }
    });
}

// Initialize sidebars after DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initDonateSidebar();
});

init();


// --- Sponsor Logic ---
const SPONSORS_LIST = [
    "一***橙子🍊", "匿名大佬", "李**cc", "再*吧", "sn0***1ne25", "得*沃", "A**u", "可爱小***oro",
    "盛", "夹*酱", "包*头", "*鹊", "CT**付", "重***城", "匿名大佬", "Ci**ue", "*~", "Z", "Un***tr",
    "后***海", "^_^", "匿名大佬", "雾*酱", "罗*花", "不关**的事", "*白", "怯", "Fl***ed",
    "向着***发", "*丁", "自*琦", "：", "李", "*心", "天*了", "當***雞", "do***73", "匿名大佬",
    "*风", "*恋", "碌**为", "朴", "*博", "酒", "*壹", "除却***是云", "*染", "51*****73", "寻",
    "灵宫****师傅", "X*N", "狴*锁", "赵*天", "匿名大佬", "裎", "靈", "匿名大佬", "邦***熊",
    "匿名大佬", "C*", "Fo****en", "盒**猫",
    // New Sponsors
    "*虚", "公子***TEL", "苹**薇", "T***o", "狼***O", "K*", "匿名大佬", "luc***un", "傲****卡", "匿名大佬",
    "*用", "辰", "墨******", "SF****豆付", "空", "*锋", "JY*****er", "*卿丶", "R****y", "*远.",
    "*然兄", "匿名大佬", "J", "叽里****u", "Fa****ll", "(*****)", "**生.", "*U", "匿名大佬", "益**前",
    "A*", "笑**", "抖**环", "一***憨", "璇", "匿名大佬", "ja****ou", "小*****aa", "*舟", "匿名大佬",
    "渡不****3G", "匿名大佬", "c", "查**人", "骁", "li***ng", "Es***la", "匿名大佬", "匿名大佬", "匿名大佬",
    "**豪", "匿名大佬", ">*0", "十二***。", "是**阿", "匿名大佬", "*林", "**帷*幕**", "丨", "不***.",
    "先*忙", "*灰", "屁*屁", "老***呆", "12*****89", "苏安****子酒", "匿名大佬", "*破", "琦", "匿名大佬",
    "夜*呀", "*.", "匿名大佬",
    "匿名大佬", "*色"
];
let currentSponsorPage = 1;

function renderSponsors() {
    const listEl = document.getElementById('sponsor-list');
    const pageEl = document.getElementById('sponsor-page-num');
    const prevBtn = document.getElementById('prev-sponsor-btn');
    const nextBtn = document.getElementById('next-sponsor-btn');


    if (!listEl) return;

    // About 24 items fit in 2 lines on desktop (12 per line)
    const ITEMS_PER_PAGE = 24;
    const totalPages = Math.ceil(SPONSORS_LIST.length / ITEMS_PER_PAGE);

    if (currentSponsorPage < 1) currentSponsorPage = 1;
    if (currentSponsorPage > totalPages) currentSponsorPage = totalPages;

    const start = (currentSponsorPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageData = SPONSORS_LIST.slice(start, end);

    let html = '';
    pageData.forEach(name => {
        html += `<span class="sponsor-badge">${name}</span> `;
    });
    listEl.innerHTML = html;

    if (pageEl) pageEl.textContent = `${currentSponsorPage}/${totalPages}`;

    if (prevBtn) {
        prevBtn.disabled = currentSponsorPage <= 1;
        prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
        prevBtn.style.cursor = prevBtn.disabled ? 'not-allowed' : 'pointer';
    }
    if (nextBtn) {
        nextBtn.disabled = currentSponsorPage >= totalPages;
        nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
        nextBtn.style.cursor = nextBtn.disabled ? 'not-allowed' : 'pointer';
    }
}

function initSponsors() {
    renderSponsors();

    const prevBtn = document.getElementById('prev-sponsor-btn');
    const nextBtn = document.getElementById('next-sponsor-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentSponsorPage > 1) {
                currentSponsorPage--;
                renderSponsors();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            // Sync with renderSponsors - 24 items
            const ITEMS_PER_PAGE = 24;
            const totalPages = Math.ceil(SPONSORS_LIST.length / ITEMS_PER_PAGE);
            if (currentSponsorPage < totalPages) {
                currentSponsorPage++;
                renderSponsors();
            }
        });
    }
}

// Call initSponsors when DOM is loaded, or append to init
document.addEventListener('DOMContentLoaded', initSponsors);

// --- Share Stats (Canvas) ---
async function generateShareImage() {
    if (!state.data) {
        alert('暂无战绩数据可供分享，请先绑定账号。');
        return;
    }

    const btn = dom.shareBtn;
    if (btn) {
        btn.disabled = true;
        const originalText = btn.textContent;
        btn.textContent = '生成中...';

        try {
            const d = state.data;

            // 0. Fetch User Info from latest match
            let nickname = '指挥官';
            let avatarUrl = '';

            if (d.gameList && d.gameList.length > 0) {
                try {
                    const roomId = d.gameList[0].DsRoomId;
                    const res = await fetch(`${API_BASE}/detail?room_id=${roomId}`, {
                        headers: { 'X-NZM-Cookie': state.cookie }
                    });
                    const detailData = await res.json();
                    if (detailData.success && detailData.data && detailData.data.loginUserDetail) {
                        nickname = decodeURIComponent(detailData.data.loginUserDetail.nickname) || '指挥官';
                        avatarUrl = decodeURIComponent(detailData.data.loginUserDetail.avatar) || '';
                    }
                } catch (err) {
                    console.warn('Failed to fetch latest match detail for user info', err);
                }
            }

            // 0.5 Wait for Boss Damage Calculation if pending
            if (state.bossDamagePromise) {
                btn.textContent = '计算伤害...';
                try {
                    await state.bossDamagePromise;
                } catch (err) {
                    console.warn('Wait for boss damage calculation failed', err);
                }
                btn.textContent = '生成排版...';
            }

            // 1. Prepare Data
            const avgDmg = formatNumber(d.avgDamage) || '0';
            const avgBossDmg = d.calcAvgBossDamage > 0 ? formatNumber(d.calcAvgBossDamage) : '-';
            const winRate = d.winRate + '%';
            const totalGames = d.totalGames || 0;
            const huntGames = d.officialSummary?.huntGameCount || '-';
            const playTime = d.officialSummary?.playtime ? Math.floor(d.officialSummary.playtime / 60) + '时' : '-';

            // All Maps
            let mapArr = [];
            if (d.mapStats) {
                for (const [mName, diffs] of Object.entries(d.mapStats)) {
                    let mTotal = 0;
                    let mWin = 0;
                    for (const v of Object.values(diffs)) {
                        mTotal += v.total;
                        mWin += v.win;
                    }
                    mapArr.push({ name: mName, total: mTotal, win: mWin });
                }
            }
            mapArr.sort((a, b) => b.total - a.total);
            const allMaps = mapArr; // Render all map stats

            // Calculate Dynamic Height
            const hasAvatar = !!avatarUrl;
            const startYOffset = hasAvatar ? 30 : 0;
            const mapRows = Math.ceil(allMaps.length / 2);
            const mapsAreaHeight = mapRows * 140;
            const width = 800;
            const startMapsY = 850 + startYOffset;
            const footerY = startMapsY + Math.max(mapsAreaHeight, 60) + 40;
            const height = footerY + 80;

            // 2. Setup Canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;

            // Helper to get map image
            const getMapImg = (mName) => {
                const found = d.gameList.find(g => g.mapName === mName && g.icon);
                if (found) return found.icon;
                let img = 'images/maps-304.png';
                if (mName.includes('大都会')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-14.png';
                else if (mName.includes('复活节')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-12.png';
                else if (mName.includes('风暴')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-1000.png';
                else if (mName.includes('根除')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-321.png';
                else if (mName.includes('昆仑神宫')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-16.png';
                else if (mName.includes('精绝古城')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-17.png';
                else if (mName.includes('联盟大厦')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-306.png';
                else if (mName.includes('猎杀南十字')) img = 'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-323.png';
                return img;
            };

            // 3. Load Images
            // Collect main background completely random
            const bgPool = [
                'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-14.png',
                'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-12.png',
                'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-1000.png',
                'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-321.png',
                'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-16.png',
                'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-17.png',
                'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-306.png',
                'https://nzm.playerhub.qq.com/playerhub/60106/maps/maps-323.png'
            ];
            if (d.gameList) {
                d.gameList.forEach(g => { if (g.icon && !bgPool.includes(g.icon)) bgPool.push(g.icon); });
            }
            const randomBg = bgPool[Math.floor(Math.random() * bgPool.length)] || 'images/maps-304.png';

            const imageLoads = [];
            const mapImages = [];

            allMaps.forEach((m, i) => {
                const imgObj = new Image();
                imgObj.crossOrigin = 'anonymous';
                const p = new Promise(res => {
                    imgObj.onload = () => { mapImages[i] = imgObj; res(); };
                    imgObj.onerror = () => { mapImages[i] = null; res(); };
                    imgObj.src = getMapImg(m.name);
                });
                imageLoads.push(p);
            });

            const bgImg = new Image();
            bgImg.crossOrigin = 'anonymous';
            imageLoads.push(new Promise(res => {
                bgImg.onload = res;
                bgImg.onerror = res;
                bgImg.src = randomBg;
            }));

            // Load Avatar
            const avatarImg = new Image();
            avatarImg.crossOrigin = 'anonymous'; // Important for CORS
            if (avatarUrl) {
                imageLoads.push(new Promise(res => {
                    avatarImg.onload = () => { res(); };
                    avatarImg.onerror = () => { res(); };
                    avatarImg.src = avatarUrl;
                }));
            }

            await Promise.all(imageLoads);

            // 4. Draw Background & Overlay
            ctx.fillStyle = '#111827';
            ctx.fillRect(0, 0, width, height);

            if (bgImg.width > 0) {
                const scale = Math.max(width / bgImg.width, height / bgImg.height);
                const w = bgImg.width * scale;
                const h = bgImg.height * scale;
                const x = (width - w) / 2;
                const y = (height - h) / 2;
                ctx.drawImage(bgImg, x, y, w, h);
            }

            // Dark Overlay for readability
            ctx.fillStyle = 'rgba(17, 24, 39, 0.85)';
            ctx.fillRect(0, 0, width, height);

            // 5. Draw Content Helpers
            const drawText = (text, x, y, size, color = '#ffffff', align = 'left', weight = 'normal', family = 'sans-serif') => {
                ctx.font = `${weight} ${size}px ${family}`;
                ctx.fillStyle = color;
                ctx.textAlign = align;
                ctx.fillText(text, x, y);
            };
            const drawCard = (x, y, w, h) => {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.roundRect(x, y, w, h, 16);
                ctx.fill();
                ctx.stroke();
            };

            // Title Area (Avatar + Nickname)
            if (hasAvatar && avatarImg.width > 0) {
                // Draw Avatar (Circular)
                ctx.save();
                ctx.beginPath();
                ctx.arc(400, 100, 50, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(avatarImg, 350, 50, 100, 100);
                ctx.restore();

                // Draw Avatar Border
                ctx.save();
                ctx.beginPath();
                ctx.arc(400, 100, 50, 0, Math.PI * 2);
                ctx.lineWidth = 4;
                ctx.strokeStyle = '#fbbf24';
                ctx.stroke();
                ctx.restore();

                drawText(nickname, width / 2, 200, 44, '#ffffff', 'center', 'bold');
            } else {
                drawText(nickname, width / 2, 160, 56, '#ffffff', 'center', 'bold');
            }

            const towerGames = d.officialSummary?.towerGameCount || '-';
            // --- A. Base Stats Card ---
            drawText('官 方 历 史 数 据', 60, 260 + startYOffset, 28, '#fbbf24', 'left', 'bold');
            drawText('(不包含机甲/PVP)', 290, 260 + startYOffset, 20, '#9ca3af', 'left');

            // Render 3 cards side by side
            // 800 width. Margins: 60 left, 60 right. Total width 680 to fill.
            // 3 cars -> width: 213. Gap: 20 -> 213*3 + 40 = 679.
            const baseCardW = 213;
            drawCard(60, 290 + startYOffset, baseCardW, 140);
            drawCard(60 + baseCardW + 20, 290 + startYOffset, baseCardW, 140);
            drawCard(60 + (baseCardW + 20) * 2, 290 + startYOffset, baseCardW, 140);

            drawText('猎场总场次', 80, 335 + startYOffset, 18, '#9ca3af', 'left');
            drawText(huntGames.toString(), 80, 395 + startYOffset, 42, '#ffffff', 'left', 'bold');

            drawText('塔防总场次', 80 + baseCardW + 20, 335 + startYOffset, 18, '#9ca3af', 'left');
            drawText(towerGames.toString(), 80 + baseCardW + 20, 395 + startYOffset, 42, '#ffffff', 'left', 'bold');

            drawText('历史总时长', 80 + (baseCardW + 20) * 2, 335 + startYOffset, 18, '#9ca3af', 'left');
            drawText(playTime, 80 + (baseCardW + 20) * 2, 395 + startYOffset, 42, '#ffffff', 'left', 'bold');

            // --- B. Recent Stats Card (2x2 Grid) ---
            drawText('近 期 战 绩 统 计', 60, 490 + startYOffset, 28, '#fbbf24', 'left', 'bold');
            drawText(`(最近 ${totalGames} 场)`, 290, 490 + startYOffset, 20, '#9ca3af', 'left');

            // Row 1
            drawCard(60, 520 + startYOffset, 330, 120);
            drawCard(410, 520 + startYOffset, 330, 120);
            // Row 2
            drawCard(60, 660 + startYOffset, 330, 120);
            drawCard(410, 660 + startYOffset, 330, 120);

            drawText('近期场次', 90, 565 + startYOffset, 20, '#9ca3af', 'left');
            drawText(totalGames.toString(), 90, 615 + startYOffset, 38, '#ffffff', 'left', 'bold');

            drawText('近期通关率', 440, 565 + startYOffset, 20, '#9ca3af', 'left');
            drawText(winRate, 440, 615 + startYOffset, 38, '#ffffff', 'left', 'bold');

            drawText('场均综合伤害', 90, 705 + startYOffset, 20, '#9ca3af', 'left');
            drawText(avgDmg, 90, 755 + startYOffset, 32, '#ffffff', 'left', 'bold');

            drawText('场均Boss伤害 (近10场)', 440, 705 + startYOffset, 16, '#9ca3af', 'left');
            drawText(avgBossDmg, 440, 755 + startYOffset, 32, '#ffffff', 'left', 'bold');

            // --- C. Top Maps ---
            // (startMapsY already calculated)
            drawText('地 图 统 计', 60, 820 + startYOffset, 28, '#fbbf24', 'left', 'bold');

            if (allMaps.length > 0) {
                allMaps.forEach((m, idx) => {
                    const row = Math.floor(idx / 2);
                    const col = idx % 2;
                    const startX = 60 + col * 350; // 330 card + 20 gap = 350
                    const startY = startMapsY + row * 140;

                    // Draw map card background
                    const mImg = mapImages[idx];
                    ctx.save();
                    ctx.beginPath();
                    ctx.roundRect(startX, startY, 330, 120, 12);
                    ctx.clip();
                    if (mImg && mImg.width > 0) {
                        // scale to fill 330x120
                        const bgScale = Math.max(330 / mImg.width, 120 / mImg.height);
                        const bw = mImg.width * bgScale;
                        const bh = mImg.height * bgScale;
                        const bx = startX + (330 - bw) / 2;
                        const by = startY + (120 - bh) / 2;
                        ctx.drawImage(mImg, bx, by, bw, bh);
                    } else {
                        ctx.fillStyle = '#1f2937';
                        ctx.fill();
                    }

                    // Dark gradient overlay
                    const grad = ctx.createLinearGradient(startX, startY, startX, startY + 120);
                    grad.addColorStop(0, 'rgba(0,0,0,0.1)');
                    grad.addColorStop(1, 'rgba(0,0,0,0.85)');
                    ctx.fillStyle = grad;
                    ctx.fillRect(startX, startY, 330, 120);
                    ctx.restore();

                    // Texts inside card
                    drawText(m.name, startX + 20, startY + 40, 22, '#ffffff', 'left', 'bold');

                    const wr = m.total > 0 ? ((m.win / m.total) * 100).toFixed(1) : 0;

                    // Put Win Rate prominently on the right
                    drawText(`${wr}%`, startX + 310, startY + 95, 24, '#fbbf24', 'right', 'bold');

                    // Stats on Left
                    ctx.font = 'bold 26px sans-serif';
                    const totalWidth = ctx.measureText(m.total.toString()).width;
                    drawText(`${m.total}`, startX + 20, startY + 75, 26, '#ffffff', 'left', 'bold');
                    drawText(`场`, startX + 25 + totalWidth, startY + 73, 14, '#9ca3af', 'left');

                    drawText(`胜 ${m.win} · 负 ${m.total - m.win}`, startX + 20, startY + 105, 18, '#d1d5db', 'left');
                });
            } else {
                drawText('暂无地图数据', width / 2, startMapsY + 40, 24, '#6b7280', 'center');
            }

            // Footer & Watermark
            const date = new Date();
            const dateString = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
            drawText(`生成于 ${dateString} · by HaMan`, width / 2, footerY, 20, '#6b7280', 'center');
            drawText('数据来源 · 逆战未来工具箱小程序', width / 2, footerY + 30, 22, '#4b5563', 'center', 'bold');

            // 6. Output Image
            const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
            const link = document.createElement('a');
            link.download = `战绩汇总_${date.getTime()}.jpg`;
            link.href = dataUrl;
            link.click();

        } catch (e) {
            console.error('生成图片失败', e);
            alert('生成长图时发生错误，请重试。\n' + e.message);
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    }
}
