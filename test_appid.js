var testAppIds = [
    '21000501', // Example common ID
    '101479813', // Another common one
    '549000912', // Current QZone ID
    '1105943831', // Potential mobile ID
    '101503919', // Another potential
    '1112224097' // Another potential
];

async function checkAppId(appid) {
    const url = `https://ssl.ptlogin2.qq.com/ptqrshow?appid=${appid}&e=2&l=M&s=3&d=72&v=4&t=0.5`;
    try {
        const res = await fetch(url);
        if (res.ok) {
            console.log(`AppID ${appid} is valid (HTTP ${res.status})`);
            return true;
        }
    } catch (e) {
        console.log(`AppID ${appid} failed: ${e.message}`);
    }
    return false;
}

(async () => {
    console.log("Testing AppIDs...");
    for (const id of testAppIds) {
        await checkAppId(id);
    }
})();
