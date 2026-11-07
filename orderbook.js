// Simulasi Struktur Order Book (Spot Market Exchange) di Node.js

class OrderBook {
    constructor() {
        // Daftar antrean order (Buy/Bid dan Sell/Ask)
        this.bids = []; // Pembeli (Harga tertinggi di atas)
        this.asks = []; // Penjual (Harga terendah di atas)
    }

    // Fungsi untuk menambahkan order baru ke pasar
    addOrder(type, price, amount, userId) {
        const order = { id: Date.now(), price, amount, userId };
        
        if (type === 'BUY') {
            this.bids.push(order);
            // Urutkan bids dari harga tertinggi ke terendah
            this.bids.sort((a, b) => b.price - a.price);
            console.log(`[BUY ORDER] User ${userId} pasang beli ${amount} USDT di harga ${price}`);
        } else if (type === 'SELL') {
            this.asks.push(order);
            // Urutkan asks dari harga terendah ke tertinggi
            this.asks.sort((a, b) => a.price - b.price);
            console.log(`[SELL ORDER] User ${userId} pasang jual ${amount} USDT di harga ${price}`);
        }
        
        this.matchOrder();
    }

    // Fungsi pencocokan otomatis (Matching Engine sederhana)
    matchOrder() {
        while (this.bids.length > 0 && this.asks.length > 0) {
            let highestBid = this.bids[0];
            let lowestAsk = this.asks[0];

            // Jika harga beli >= harga jual, transaksi terjadi (Matched!)
            if (highestBid.price >= lowestAsk.price) {
                console.log("\n>>> TRANSAKSI BERHASIL MATCHED! <<<");
                console.log(`Harga Eksekusi: ${lowestAsk.price} USDT`);
                console.log(`Jumlah: ${Math.min(highestBid.amount, lowestAsk.amount)} USDT`);
                console.log("----------------------------------------\n");

                // Logika pengurangan sisa saldo/amount sederhana
                if (highestBid.amount > lowestAsk.amount) {
                    highestBid.amount -= lowestAsk.amount;
                    this.asks.shift(); // Hapus ask yang sudah lunas
                } else if (highestBid.amount < lowestAsk.amount) {
                    lowestAsk.amount -= highestBid.amount;
                    this.bids.shift(); // Hapus bid yang sudah lunas
                } else {
                    this.bids.shift();
                    this.asks.shift();
                }
            } else {
                break; // Harga belum cocok
            }
        }
    }

    // Menampilkan kondisi Order Book saat ini
    displayOrderBook() {
        console.log("\n========== ORDER BOOK TERKINI ==========");
        console.log("ASKS (Penjual):", this.asks);
        console.log("BIDS (Pembeli):", this.bids);
        console.log("========================================\n");
    }
}

// --- Simulasi Penggunaan ---
const market = new OrderBook();

// User A ingin Jual USDT di harga 16000
market.addOrder('SELL', 16000, 100, 'User_A');

// User B ingin Beli USDT di harga 15500
market.addOrder('BUY', 15500, 50, 'User_B');

// User C masuk dan Beli USDT di harga 16000 (Cocok dengan User A!)
market.addOrder('BUY', 16000, 100, 'User_C');

// Tampilkan kondisi buku order terakhir
market.displayOrderBook();