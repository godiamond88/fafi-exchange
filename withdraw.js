const { TronWeb } = require('tronweb');

const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    privateKey: '80EEBC282F54291382E42F4F305B54A49FF317CE52872DB6FAF2E3BCE9638DE'
});

async function processWithdrawal(recipientAddress, amountTRX) {
    try {
        console.log("--- MEMPROSES PENARIKAN (WITHDRAWAL) ---");
        console.log(`Tujuan WD: ${recipientAddress}`);
        console.log(`Jumlah: ${amountTRX} TRX`);

        // Menggunakan method bawaan tronWeb.trx.sendTransaction langsung dengan alamat base58
        const tx = await tronWeb.trx.sendTransaction(recipientAddress, tronWeb.toSun(amountTRX));
        
        console.log("\n>>> WITHDRAWAL BERHASIL DIKIRIM! <<<");
        console.log("Transaction ID (TXID):", tx.txid);
        console.log("----------------------------------------");

    } catch (error) {
        console.error("Gagal melakukan withdrawal:", error);
    }
}

// Memanggil fungsi penarikan
processWithdrawal('TNEDcyV4F22pbxyf1DSwYntMvneEYjD32', 10);