import { API_BASE } from './config.js';
import { state } from './state.js';

export async function apiRequest(endpoint, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;

    // Add custom header if we have a cookie
    if (state.cookie) {
        options.headers = {
            ...options.headers,
            'X-NZM-Cookie': state.cookie
        };
    }

    const response = await fetch(url, options);

    if (response.status === 401) {
        throw new Error('UNAUTHORIZED');
    }

    return await response.json();
}

export const api = {
    // Auth
    getQqQR: () => apiRequest('/auth/qr'),
    checkQqQR: (sig) => apiRequest(`/auth/check?qrsig=${sig}`),
    getWxQR: () => apiRequest('/auth/wx-qr'),
    checkWxQR: (uuid) => apiRequest(`/auth/wx-check?uuid=${uuid}`),

    // Data
    getStats: () => apiRequest('/stats'),
    getCollection: (type = 'all') => apiRequest(`/collection?type=${type}`),
    getMatchDetail: (roomId) => apiRequest(`/detail?room_id=${roomId}`)
};
