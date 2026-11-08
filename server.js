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
    balanceFara: 10000.00,
    balanceUsdt: 500.00,
    viewsCount: 0,
    loveCount: 0,
    referralCount: 14,
    faraCommission: 450.20
};

// --- ROUTING HALAMAN MODULAR UTAMA (Mendukung dengan/tanpa .html) ---
app.get(['/', '/index', '/index.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get(['/trading', '/trading.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'trading.html'));
});

app.get(['/reels', '/reels.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'reels.html'));
});

app.get(['/wallet', '/wallet.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'wallet.html'));
});

app.get(['/profile', '/profile.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'profile.html'));
});

// Halaman Detail Profil Pengguna (Milik Sendiri)
app.get(['/user_profile', '/user_profile.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'user_profile.html'));
});

// Halaman Profil Kreator Lain
app.get(['/creator_profile', '/creator_profile.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'creator_profile.html'));
});

// --- API BACKEND: ATURAN REWARD FARA ---
app.post('/api/reward/views', (req, res) => {
    const { viewsAdded } = req.body;
    userAccount.viewsCount += (viewsAdded || 0);
    let earnedFara = Math.floor(userAccount.viewsCount / 1000) * 1.00;
    res.json({ success: true, message: 'Views diperbarui', totalViews: userAccount.viewsCount, earnedFara: earnedFara });
});

app.post('/api/reward/gift', (req, res) => {
    const { giftType } = req.body;
    let rewardValue = 0.01;
    userAccount.balanceFara += rewardValue;
    res.json({ success: true, message: `Berhasil menerima ${giftType}`, newBalanceFara: userAccount.balanceFara });
});

app.post('/api/reward/referral', (req, res) => {
    userAccount.referralCount += 1;
    userAccount.faraCommission += 0.10;
    res.json({ success: true, message: 'Mitra baru berhasil direferensikan!', totalReferral: userAccount.referralCount, commissionFara: userAccount.faraCommission });
});

// Jalankan Server Express
app.listen(PORT, () => {
    console.log(`🚀 FARA Pro Server berjalan di http://localhost:${PORT}`);
});