// 114514

import { getPtqrToken, getGTK } from './utils.js';

export async function handleAuthQR(request) {
    const clientId = '101491592'; // OAuth Client ID
    const authUrl = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=https://nzm.qq.com/&scope=all`;

    console.log(`[QQ QR] Init Discovery: ${authUrl}`);

    let realAppId = '716027609'; // Default known OAuth AppID
    let daid = '383'; // Default known OAuth DAID
    let pt_3rd_aid = clientId;
    let xloginUrl = '';

    try {
        // Step 1: Request Authorize URL
        let resp = await fetch(authUrl, { redirect: 'manual' });
        let location = resp.headers.get('Location');

        if (location) {
            console.log(`[QQ QR] Redirect 1: ${location}`);
            // If it redirects to /show, fetch that page to find the iframe
            if (location.includes('/show')) {
                resp = await fetch(location);
                const html = await resp.text();
                // Look for iframe src or xlogin url
                // src="https://xui.ptlogin2.qq.com/cgi-bin/xlogin?..."
                const iframeMatch = html.match(/src="([^"]*xui\.ptlogin2\.qq\.com\/cgi-bin\/xlogin[^"]*)"/);
                if (iframeMatch) {
                    xloginUrl = iframeMatch[1].replace(/&amp;/g, '&'); // Fix HTML entities
                    console.log(`[QQ QR] Found xlogin iframe: ${xloginUrl}`);

                    const urlObj = new URL(xloginUrl);
                    if (urlObj.searchParams.has('appid')) realAppId = urlObj.searchParams.get('appid');
                    if (urlObj.searchParams.has('daid')) daid = urlObj.searchParams.get('daid');
                } else {
                    console.log('[QQ QR] xlogin iframe not found in /show page, using defaults.');
                }
            } else if (location.includes('xlogin')) {
                // Direct redirect to xlogin
                xloginUrl = location;
                const urlObj = new URL(location);
                if (urlObj.searchParams.has('appid')) realAppId = urlObj.searchParams.get('appid');
                if (urlObj.searchParams.has('daid')) daid = urlObj.searchParams.get('daid');
            }
        }
    } catch (e) {
        console.error(`[QQ QR] Discovery Error: ${e.message}`);
    }

    console.log(`[QQ QR] Final Params - AppID: ${realAppId}, DAID: ${daid}, 3rd_AID: ${pt_3rd_aid}`);

    // 2. Fetch QR Image
    // Note: pt_3rd_aid is critical for OAuth login
    const qrUrl = `https://ssl.ptlogin2.qq.com/ptqrshow?appid=${realAppId}&e=2&l=M&s=3&d=72&v=4&t=0.5${Date.now()}&daid=${daid}&pt_3rd_aid=${pt_3rd_aid}`;

    // We should use the xlogin URL as referer
    const referer = xloginUrl || `https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=${realAppId}&daid=${daid}&style=33&login_text=%E6%8E%88%E6%9D%83%E5%B9%B6%E7%99%BB%E5%BD%95&hide_title_bar=1&hide_border=1&target=self&s_url=https%3A%2F%2Fgraph.qq.com%2Foauth2.0%2Flogin_jump&pt_3rd_aid=${pt_3rd_aid}&pt_feedback_link=https%3A%2F%2Fsupport.qq.com%2Fproducts%2F77942%3FcustomInfo%3Dwww.qq.com`;

    console.log(`[QQ QR] Fetching QR from: ${qrUrl}`);
    const resp = await fetch(qrUrl, {
        headers: {
            'Referer': referer,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    });

    if (!resp.ok) {
        console.error(`[QQ QR] Fetch failed: ${resp.status}`);
        return new Response(JSON.stringify({ success: false, message: `二维码获取失败 HTTP ${resp.status}` }));
    }

    // 3. Get qrsig from headers
    const setCookie = resp.headers.get('set-cookie') || '';
    let qrsig = '';
    const match = setCookie.match(/qrsig=([^;,]+)/);
    if (match) qrsig = match[1];

    console.log(`[QQ QR] Got qrsig: ${qrsig ? 'Yes' : 'No'}`);

    // 4. Convert image to base64
    const arrayBuffer = await resp.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const dataUrl = `data:image/png;base64,${base64}`;

    return new Response(JSON.stringify({
        success: true,
        data: { qrcode: dataUrl, qrsig: qrsig }
    }), { headers: { 'Content-Type': 'application/json' } });
}

export async function handleAuthCheck(request) {
    const url = new URL(request.url);
    const qrsig = url.searchParams.get('qrsig');

    if (!qrsig) return new Response(JSON.stringify({ msg: 'missing qrsig' }));
    console.log(`[QQ Login] Received qrsig: ${qrsig.substring(0, 5)}...`);

    const ptqrtoken = getPtqrToken(qrsig);
    console.log(`[QQ Login] Generated ptqrtoken: ${ptqrtoken}`);

    // Correct params matching the QR code generation
    const appId = '716027609';
    const daid = '383';
    const pt_3rd_aid = '101491592';

    // Exact Redirect URI from Fiddler
    const redirectUri = 'https://milo.qq.com/comm-htdocs/login/qc_redirect.html?parent_domain=https%3A%2F%2Fnzm.qq.com&isMiloSDK=1&isPc=1';

    // u1 is login_jump with the verified redirect_uri
    const u1 = encodeURIComponent(`https://graph.qq.com/oauth2.0/login_jump?response_type=code&client_id=${pt_3rd_aid}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=&state=STATE`);

    const checkUrl = `https://ssl.ptlogin2.qq.com/ptqrlogin?u1=${u1}&ptqrtoken=${ptqrtoken}&ptredirect=0&h=1&t=1&g=1&from_ui=1&ptlang=2052&action=0-0-${Date.now()}&js_ver=21020514&js_type=1&login_sig=&pt_uistyle=40&aid=${appId}&daid=${daid}&pt_3rd_aid=${pt_3rd_aid}&`;
    console.log(`[QQ Login] Check URL: ${checkUrl}`);

    const userAgent = request.headers.get('User-Agent') || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    console.log(`[QQ Login] Client UA: ${userAgent}`);

    try {
        console.log(`[QQ Login] Checking status for qrsig prefix: ${qrsig.substring(0, 5)}...`);
        const resp = await fetch(checkUrl, {
            headers: {
                'Cookie': `qrsig=${qrsig}`,
                'User-Agent': userAgent
            }
        });
        const text = await resp.text();
        console.log(`[QQ Login] ptqrlogin response: ${text.trim()}`);

        if (text.includes("ptuiCB('0'")) {
            // Success! Extract check_sig URL
            const checkSigMatch = text.match(/ptuiCB\('0','0','(.*?)','0','(.*?)', '(.*?)'/);
            if (!checkSigMatch) {
                console.error('[QQ Login] Failed to extract check_sig URL');
                return new Response(JSON.stringify({ success: false, message: '无法获取登录签名' }));
            }

            const checkSigUrl = checkSigMatch[1];
            console.log(`[QQ Login] Found checkSigUrl: ${checkSigUrl}`);

            // 5. Follow check_sig to get cookies
            console.log(`[QQ Login] Found checkSigUrl: ${checkSigUrl}`);
            const sigResp = await fetch(checkSigUrl, {
                redirect: 'manual',
                headers: {
                    'User-Agent': userAgent
                }
            });

            const sigLocation = sigResp.headers.get('Location');
            console.log(`[QQ Login] check_sig Redirect Location: ${sigLocation}`);

            // Extract ALL cookies properly
            let cookieList = [];
            if (typeof sigResp.headers.getSetCookie === 'function') {
                cookieList = sigResp.headers.getSetCookie();
            } else {
                const raw = sigResp.headers.get('set-cookie') || '';
                cookieList = [raw];
            }

            // Parse Key=Value from each cookie string (ignoring attributes)
            const cookieMap = new Map();
            const rawHeader = sigResp.headers.get('set-cookie') || '';
            console.log(`[QQ Login] Raw Set-Cookie: ${rawHeader.substring(0, 150)}...`);

            // robust regex to find "Key=Value" that are NOT attributes
            const kvMatches = rawHeader.matchAll(/([a-zA-Z0-9_]+)=([^;,\s]+)/g);
            for (const m of kvMatches) {
                const k = m[1];
                const v = m[2];
                const lowerK = k.toLowerCase();
                if (['expires', 'path', 'domain', 'httponly', 'secure', 'samesite', 'max-age'].includes(lowerK)) continue;
                if (['wed', 'thu', 'fri', 'sat', 'sun', 'mon', 'tue', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'gmt'].includes(lowerK)) continue;

                // Allow overwriting to get the last value (usually the valid one)
                cookieMap.set(k, v);
            }

            // User's fingerprint cookies (Filtered)
            // Removed conflicting session tokens to rely on new ones
            const userCookies = `ui=607785AE-E678-4701-A497-764D0FC49846; RK=boGUZXEvRm; ptcz=c786dc6971b607216b225c2286030a5f788d5c6dbdf5dafcaebc1abd58600cfc; eas_sid=y1C7E545m1g0X1q0Y5x3I9N1O0; _qimei_uuid42=1990d103a0b10060e28b87e1b78f54e4d5d0589383; _qimei_fingerprint=58c9794e0ac8bdca6abac516582ce27e; _qimei_i_3=45cc2d85c00b568a9397fa61088671e5f5eea1f6150a0080b2da2a592fc0733a606430943989e2adb1a1; _qimei_h38=527fddbbe28b87e1b78f54e40200000211990d; qq_domain_video_guid_verify=5767bb84755b9a66; _qimei_q32=0b1382900c79cd3bfa956a75180e9a41; _qimei_q36=3e02d6fa1162248bbcd679da300013419805; Qs_lvt_323937=1761515531; Qs_pv_323937=327942189078664400; _qimei_i_2=7abf4681c05a528fc7c1af315a8271e2f3e6f6a3410f0585bddb795b2693206d6267369c3089e7a687b1; _qimei_i_1=5ae04d87975d068f95c5ac65598c21e8f0bba5a315535587b0da2c582493206c616335943980ebdc8297fbf8; pgv_pvid=5239924134; _qpsvr_localtk=0.295834881636138; pt_login_type=3;`;

            const constructed = [];
            for (const [k, v] of cookieMap) {
                constructed.push(`${k}=${v}`);
            }
            const dynamicCookies = constructed.join('; ');
            const usefulCookies = userCookies + ' ' + dynamicCookies;

            console.log(`[QQ Login] check_sig cookies length: ${usefulCookies.length}`);
            console.log(`[QQ Login] Sending cookies: ${usefulCookies.substring(0, 100)}...`);

            // 6. Request login_jump (Critical step from Fiddler)
            // The check_sig should redirect to this now that we updated u1
            const jumpUrl = sigLocation || decodeURIComponent(u1);
            console.log(`[QQ Login] Jump URL: ${jumpUrl}`);

            // Extract p_skey for g_tk
            const pSkey = cookieMap.get('p_skey') || cookieMap.get('skey') || '';
            const g_tk = getGTK(pSkey);
            const ui = '607785AE-E678-4701-A497-764D0FC49846'; // From user cookies

            await fetch(jumpUrl, {
                headers: {
                    'Cookie': usefulCookies,
                    'Referer': 'https://xui.ptlogin2.qq.com/',
                    'User-Agent': userAgent
                }
            });

            // 7. Authorize POST (Exact params from Fiddler)
            const authBase = 'https://graph.qq.com/oauth2.0/authorize';
            const authParams = new URLSearchParams();
            authParams.append('response_type', 'code');
            authParams.append('client_id', '101491592');
            authParams.append('redirect_uri', redirectUri);
            authParams.append('scope', '');
            authParams.append('state', 'STATE');
            authParams.append('switch', '');
            authParams.append('from_ptlogin', '1');
            authParams.append('src', '1');
            authParams.append('update_auth', '1');
            authParams.append('openapi', '1010');
            authParams.append('g_tk', g_tk);
            authParams.append('auth_time', Date.now().toString()); // Ensure it's a string
            authParams.append('ui', ui);

            console.log(`[QQ Login] Authorize POST Params: ${authParams.toString()}`);

            const authResp = await fetch(authBase, {
                method: 'POST',
                headers: {
                    'Cookie': usefulCookies,
                    'Referer': 'https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&state=STATE&client_id=101491592&redirect_uri=https%3A%2F%2Fmilo.qq.com%2Fcomm-htdocs%2Flogin%2Fqc_redirect.html%3Fparent_domain%3Dhttps%253A%252F%252Fnzm.qq.com%26isMiloSDK%3D1%26isPc%3D1',
                    'User-Agent': userAgent,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: authParams,
                redirect: 'manual'
            });


            console.log(`[QQ Login] Authorize status: ${authResp.status}`);
            const location = authResp.headers.get('Location');
            console.log(`[QQ Login] Authorize Location: ${location}`);

            if (location) {
                const urlObj = new URL(location);
                let code = urlObj.searchParams.get('code');
                console.log(`[QQ Login] Got Auth Code: ${code}`);

                // If code is missing, maybe it's in the hash or it's an intermediate redirect?
                // The expected redirect is to qc_redirect.html?code=...
                if (!code) {
                    // Try regex just in case
                    const codeMatch = location.match(/[?&]code=([^&]+)/);
                    if (codeMatch) code = codeMatch[1];
                }

                if (code) {
                    // 7. Exchange Code for Token (Using AMS/Milo style)
                    const result = await exchangeCode(code, 'qc', pt_3rd_aid);
                    if (result.success) {
                        const tokenData = result.data;
                        // For acctype=qc, tokenData has: openid, access_token
                        const accessToken = tokenData.access_token;

                        const finalCookie = `acctype=qc; openid=${tokenData.openid}; appid=${pt_3rd_aid}; access_token=${accessToken}`;
                        console.log('[QQ Login] Login successful, returning response.');
                        return new Response(JSON.stringify({
                            success: true, status: 0, message: '登录成功',
                            data: { cookie: finalCookie }
                        }), { headers: { 'Content-Type': 'application/json' } });
                    } else {
                        console.error('[QQ Login] Token exchange failed:', result.error);
                        return new Response(JSON.stringify({ success: false, message: result.error || 'Token交换失败' }));
                    }
                } else {
                    console.error('[QQ Login] No code in Location header');
                }
            } else {
                console.error('[QQ Login] No Location header in Authorize response');
                // Check if it returned 200 OK (which means manual redirect failed or it loaded a page)
                if (authResp.status === 200) {
                    const body = await authResp.text();
                    console.log(`[QQ Login] Auth Reponse Body Preview: ${body.substring(0, 200)}`);
                }
            }
            return new Response(JSON.stringify({ success: false, message: '获取Auth Code失败' }));

        } else if (text.includes("ptuiCB('66'")) {
            return new Response(JSON.stringify({ success: true, status: 66, message: '请使用手机QQ扫码' }));
        } else if (text.includes("ptuiCB('67'")) {
            return new Response(JSON.stringify({ success: true, status: 67, message: '请在手机上确认登录' }));
        } else if (text.includes("ptuiCB('65'")) {
            return new Response(JSON.stringify({ success: true, status: 65, message: '二维码已过期' }));
        } else {
            return new Response(JSON.stringify({ success: false, status: -1, message: '状态异常', raw: text }));
        }
    } catch (e) {
        console.error('[QQ Login] Exception:', e.message);
        console.error('[QQ Login] Stack:', e.stack);
        return new Response(JSON.stringify({ success: false, status: -1, message: '请求失败: ' + e.message }));
    }
}

// --- WeChat QR Login ---
const WX_APPID = 'wxfa0c35392d06b82f';
const WX_REDIRECT_URI = 'https://iu.qq.com/comm-htdocs/login/milosdk/wx_pc_redirect.html';

export async function handleWxQR(request) {
    // Fetch the WeChat QR connect page to get the UUID
    const qrPageUrl = `https://open.weixin.qq.com/connect/qrconnect?appid=${WX_APPID}&redirect_uri=${encodeURIComponent(WX_REDIRECT_URI)}&response_type=code&scope=snsapi_login&state=1`;

    try {
        const resp = await fetch(qrPageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        const html = await resp.text();

        // Extract UUID from the page - look for the QR code image src
        const uuidMatch = html.match(/\/connect\/qrcode\/([a-zA-Z0-9_-]+)/);
        if (!uuidMatch) {
            return new Response(JSON.stringify({ success: false, message: '获取微信二维码失败' }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const uuid = uuidMatch[1];
        const qrImgUrl = `https://open.weixin.qq.com/connect/qrcode/${uuid}`;

        // Fetch the QR image and convert to base64
        const imgResp = await fetch(qrImgUrl);
        const imgBuf = await imgResp.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(imgBuf)));
        const contentType = imgResp.headers.get('content-type') || 'image/jpeg';
        const dataUrl = `data:${contentType};base64,${base64}`;

        return new Response(JSON.stringify({
            success: true,
            data: { qrcode: dataUrl, uuid }
        }), { headers: { 'Content-Type': 'application/json' } });
    } catch (e) {
        return new Response(JSON.stringify({ success: false, message: e.message }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function handleWxCheck(request) {
    const url = new URL(request.url);
    const uuid = url.searchParams.get('uuid');
    if (!uuid) return new Response(JSON.stringify({ success: false, message: 'missing uuid' }));

    try {
        // Poll WeChat's long-polling endpoint with a timeout
        // The endpoint holds connection for ~25s if no status change
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 25000);

        let text;
        try {
            const checkUrl = `https://long.open.weixin.qq.com/connect/l/qrconnect?uuid=${uuid}&_=${Date.now()}`;
            const resp = await fetch(checkUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                signal: controller.signal
            });
            text = await resp.text();
        } catch (e) {
            clearTimeout(timeoutId);
            // Timeout or abort - return waiting status
            if (e.name === 'AbortError') {
                return new Response(JSON.stringify({ success: true, status: 408, message: '等待扫码' }));
            }
            throw e;
        }
        clearTimeout(timeoutId);

        // Parse response: window.wx_errcode=XXX;window.wx_code='YYY';
        const errMatch = text.match(/wx_errcode=(\d+)/);
        const codeMatch = text.match(/wx_code='([^']*)'/);

        const errcode = errMatch ? parseInt(errMatch[1]) : -1;
        const wxCode = codeMatch ? codeMatch[1] : '';

        if (errcode === 405 && wxCode) {
            // User confirmed - exchange code for tokens
            const result = await exchangeCode(wxCode, 'wx', 'wx3ec1209b02a24683');
            if (result.success) {
                const tokenData = result.data;
                const cookie = `acctype=wx; openid=${tokenData.openid}; appid=wx3ec1209b02a24683; access_token=${tokenData.access_token}; refresh_token=${tokenData.refresh_token}`;
                return new Response(JSON.stringify({
                    success: true, status: 0, message: '登录成功',
                    data: { cookie }
                }), { headers: { 'Content-Type': 'application/json' } });
            }
            return new Response(JSON.stringify({
                success: false, status: -1,
                message: result.error || 'Token交换失败'
            }), { headers: { 'Content-Type': 'application/json' } });
        } else if (errcode === 408) {
            return new Response(JSON.stringify({ success: true, status: 408, message: '等待扫码' }));
        } else if (errcode === 404) {
            return new Response(JSON.stringify({ success: true, status: 404, message: '已扫码，请确认' }));
        } else if (errcode === 402 || errcode === 403) {
            return new Response(JSON.stringify({ success: true, status: 402, message: '二维码已过期' }));
        } else {
            return new Response(JSON.stringify({ success: true, status: errcode, message: '未知状态' }));
        }
    } catch (e) {
        return new Response(JSON.stringify({ success: false, message: e.message }));
    }
}

async function exchangeCode(code, acctype, appid) {
    // Determine API endpoint based on account type
    let url;
    const referer = 'https://nzm.qq.com/';
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36';

    if (acctype === 'qc') {
        // QQ Connect (Milo SDK flow) uses userLoginSvr
        const cbName = `miloJsonpCb_${Math.floor(Math.random() * 100000)}`;
        const params = new URLSearchParams({
            a: 'qcCodeToOpenId',
            qc_code: code,
            appid: appid,
            redirect_uri: 'https://milo.qq.com/comm-htdocs/login/qc_redirect.html',
            callback: cbName,
            _: Date.now()
        });
        url = `https://ams.game.qq.com/ams/userLoginSvr?${params}`;
    } else {
        // WeChat uses codeToOpenId.php (Legacy/Standard WX flow)
        const params = new URLSearchParams({
            appid: appid,
            wxcode: code,
            acctype: acctype,
            sServiceType: 'undefined',
            wxcodedomain: 'nzm.qq.com',
            callback: '_cb'
        });
        url = `https://apps.game.qq.com/ams/ame/codeToOpenId.php?${params}`;
    }

    try {
        console.log(`[Token Exchange] Requesting: ${url}`);
        const resp = await fetch(url, {
            headers: {
                'User-Agent': ua,
                'Referer': referer
            }
        });
        const text = await resp.text();
        console.log(`[Token Exchange] Response: ${text.substring(0, 200)}...`);

        // Universal JSONP parser
        // Matches: callback({ ... }) or try{callback({...})}catch(e){}
        const jsonMatch = text.match(/[a-zA-Z0-9_]+\((\{.*?\})\)/);
        if (!jsonMatch) {
            console.error(`[Token Exchange] JSONP Parse Failed: ${text}`);
            return { success: false, error: `JSONP解析失败` };
        }

        const result = JSON.parse(jsonMatch[1]);

        // Handle different response structures
        if (acctype === 'qc') {
            // userLoginSvr returns fields directly
            if (result.iRet === '0' || result.iRet === 0) {
                return { success: true, data: result };
            }
            return { success: false, error: `QQ接口错误: ${result.sMsg || result.iRet}` };
        } else {
            // codeToOpenId.php returns sMsg as JSON string
            if (parseInt(result.iRet) === 0 && result.sMsg) {
                const data = JSON.parse(result.sMsg);
                return { success: true, data: data };
            }
            return { success: false, error: `WX接口错误: ${result.sMsg || result.iRet}` };
        }

    } catch (e) {
        console.error(`[Token Exchange] Exception: ${e.message}`);
        return { success: false, error: `HTTP错误: ${e.message}` };
    }
}
