const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk membaca JSON & file statis
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// --- DATA SIMULASI AKUN / DATABASE SEMENTARA ---
let userAccount = {
    username: "ryank_creative",
    fullName: "Rian Rawalangi",
    balanceFara: 10000.00, // Saldo FARA awal
    balanceUsdt: 500.00,
    viewsCount: 0,
    loveCount: 0,
    referralCount: 14,
    faraCommission: 450.20
};

// --- ROUTING HALAMAN MODULAR 5 MENU UTAMA ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/trading', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'trading.html'));
});

app.get('/reels', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'reels.html'));
});

app.get('/wallet', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'wallet.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'profile.html'));
});

// --- API BACKEND: ATURAN REWARD FARA ---

// 1. Endpoint Klaim Reward Views (1 FARA per 1000 views)
app.post('/api/reward/views', (req, res) => {
    const { viewsAdded } = req.body; // jumlah views baru
    userAccount.viewsCount += (viewsAdded || 0);

    // Setiap kelipatan 1000 views dapat 1 FARA dari developer
    let earnedFara = Math.floor(userAccount.viewsCount / 1000) * 1.00;
    
    res.json({ 
        success: true, 
        message: 'Views diperbarui', 
        totalViews: userAccount.viewsCount, 
        earnedFara: earnedFara 
    });
});

// 2. Endpoint Kirim Love / Mawar (Gift ke Kreator)
app.post('/api/reward/gift', (req, res) => {
    const { giftType, amount } = req.body; // 'love' (0.01) atau 'rose' (0.01)
    let rewardValue = giftType === 'love' ? 0.01 : 0.01;

    userAccount.balanceFara += rewardValue; // Saldo FARA kreator bertambah

    res.json({ 
        success: true, 
        message: `Berhasil menerima ${giftType} (+${rewardValue} FARA)`, 
        newBalanceFara: userAccount.balanceFara 
    });
});

// 3. Endpoint Bonus Kemitraan / Referral (0.1 FARA per mitra baru)
app.post('/api/reward/referral', (req, res) => {
    userAccount.referralCount += 1;
    userAccount.faraCommission += 0.10; // Dapat 0.1 FARA dari developer

    res.json({ 
        success: true, 
        message: 'Mitra baru berhasil direferensikan!', 
        totalReferral: userAccount.referralCount,
        commissionFara: userAccount.faraCommission 
    });
});

// Jalankan Server Express
app.listen(PORT, () => {
    console.log(`🚀 FARA Pro Server berjalan di http://localhost:${PORT}`);
});