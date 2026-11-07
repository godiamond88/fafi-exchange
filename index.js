const { TronWeb } = require('tronweb');

// Inisialisasi TronWeb
const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io'
});

// Fungsi untuk Membuat Dompet TRC20 Baru
async function createWallet() {
    try {
        const account = await tronWeb.createAccount();
        console.log("--- DOMPET BARU BERHASIL DIBUAT ---");
        console.log("Alamat Dompet (Public Address):", account.address.base58);
        console.log("Private Key:", account.privateKey);
    } catch (error) {
        console.error("Gagal membuat dompet:", error);
    }
}

createWallet();