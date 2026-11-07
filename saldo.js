async function checkBalance() {
    const targetAddress = 'TNEDcyV4F22pbxyf1DSwYntMvneEYjD32';
    
    try {
        console.log("Sedang mengecek saldo ke jaringan Tron...");
        
        const response = await fetch(`https://api.trongrid.io/v1/accounts/${targetAddress}`);
        const data = await response.json();
        
        if (data.success && data.data && data.data.length > 0) {
            const balanceInSun = data.data[0].balance || 0;
            const balanceInTRX = balanceInSun / 1000000;
            
            console.log("--- INFORMASI SALDO DOMPET ---");
            console.log("Alamat:", targetAddress);
            console.log("Saldo TRX:", balanceInTRX, "TRX");
        } else {
            console.log("--- INFORMASI SALDO DOMPET ---");
            console.log("Alamat:", targetAddress);
            console.log("Saldo TRX: 0 TRX (Dompet belum aktif atau belum ada transaksi)");
        }
        
    } catch (error) {
        console.error("Gagal mengecek saldo:", error);
    }
}

checkBalance();