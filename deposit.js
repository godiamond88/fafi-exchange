// Script untuk Memantau Transaksi Deposit Masuk ke Dompet Exchange
async function checkDeposit() {
    const targetAddress = 'TNEDcyV4F22pbxyf1DSwYntMvneEYjD32';
    
    try {
        console.log("Memeriksa riwayat transaksi masuk untuk dompet:", targetAddress);
        
        // Memanggil API TronGrid untuk melihat transaksi terkait alamat ini
        const response = await fetch(`https://api.trongrid.io/v1/accounts/${targetAddress}/transactions/trc20?limit=5`);
        const data = await response.json();
        
        if (data.success && data.data && data.data.length > 0) {
            console.log("--- DITEMUKAN TRANSAKSI MASUK (DEPOSIT) ---");
            data.data.forEach((tx, index) => {
                console.log(`${index + 1}. Dari: ${tx.from}`);
                console.log(`   Ke: ${tx.to}`);
                console.log(`   Jumlah: ${tx.value / 1000000} USDT`);
                console.log(`   Waktu: ${new Date(tx.block_timestamp).toLocaleString()}`);
                console.log("----------------------------------------");
            });
        } else {
            console.log("Belum ada transaksi deposit TRC20 yang masuk ke dompet ini.");
        }
        
    } catch (error) {
        console.error("Gagal mengecek deposit:", error);
    }
}

checkDeposit();