const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>FARA/USDT - Spot Trading Pro</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #121212; color: #e0e0e0; margin: 0; padding: 0; }
                header { background: #1a1a1a; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #2a2a2a; }
                .nav-links { display: flex; gap: 20px; font-weight: 500; font-size: 0.95em; }
                .nav-links span { color: #888; cursor: pointer; }
                .nav-links span.active { color: #00ffcc; border-bottom: 2px solid #00ffcc; padding-bottom: 4px; }
                .trading-pair { font-size: 1.2em; font-weight: bold; color: #fff; padding: 10px 20px; background: #181818; border-bottom: 1px solid #2a2a2a; display: flex; align-items: center; gap: 10px; }
                .main-layout { display: grid; grid-template-columns: 1fr 320px; gap: 10px; padding: 15px; max-width: 1200px; margin: auto; }
                .left-section { display: flex; flex-direction: column; gap: 15px; }
                .chart-box { background: #1e1e1e; padding: 15px; border-radius: 8px; height: 260px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid #2a2a2a; }
                .chart-header { display: flex; gap: 15px; font-size: 0.85em; color: #888; border-bottom: 1px solid #2a2a2a; padding-bottom: 8px; }
                .chart-header span.active { color: #00ffcc; }
                .fake-chart { flex-grow: 1; display: flex; align-items: flex-end; gap: 4px; padding-top: 10px; }
                .bar { width: 8px; background: #00ff88; border-radius: 2px; height: 50%; }
                .bar.red { background: #ff4d4d; }
                .trading-panel { background: #1e1e1e; padding: 15px; border-radius: 8px; border: 1px solid #2a2a2a; }
                .tab-switch { display: flex; background: #121212; border-radius: 6px; padding: 3px; margin-bottom: 15px; }
                .tab-btn { flex: 1; text-align: center; padding: 8px; font-weight: bold; border-radius: 4px; cursor: pointer; font-size: 0.9em; }
                .tab-btn.buy-tab.active { background: #00ff88; color: #121212; }
                .tab-btn.sell-tab { color: #888; }
                .input-group { margin-bottom: 12px; }
                .input-group label { display: block; font-size: 0.8em; color: #888; margin-bottom: 4px; }
                .input-box { background: #121212; border: 1px solid #333; border-radius: 6px; padding: 8px 12px; display: flex; justify-content: space-between; align-items: center; color: #fff; font-size: 0.9em; }
                .input-box input { background: transparent; border: none; color: #fff; width: 100%; outline: none; font-size: 1em; }
                .action-btn { width: 100%; padding: 12px; border: none; border-radius: 6px; font-weight: bold; font-size: 1em; cursor: pointer; margin-top: 10px; }
                .btn-buy { background: #00ff88; color: #121212; }
                .right-section { background: #1e1e1e; padding: 15px; border-radius: 8px; border: 1px solid #2a2a2a; font-size: 0.85em; }
                .orderbook-header { display: grid; grid-template-columns: 1fr 1fr; color: #888; padding-bottom: 8px; border-bottom: 1px solid #2a2a2a; margin-bottom: 8px; }
                .book-row { display: grid; grid-template-columns: 1fr 1fr; padding: 4px 0; }
                .book-row.ask { color: #ff4d4d; }
                .book-row.bid { color: #00ff88; }
                .current-price-box { font-size: 1.3em; font-weight: bold; padding: 10px 0; text-align: center; border-top: 1px solid #2a2a2a; border-bottom: 1px solid #2a2a2a; margin: 8px 0; color: #00ff88; }
            </style>
        </head>
        <body>
            <header>
                <div class="nav-links">
                    <span>Konversi</span>
                    <span class="active">Spot</span>
                    <span>Futures</span>
                    <span>Option</span>
                </div>
                <div style="font-size: 0.85em; color: #00ffcc;">👛 Dompet Utama: TNEDcy...JD32</div>
            </header>

            <div class="trading-pair">
                <span>FARA/USDT</span> <span style="font-size: 0.6em; background: #2a2a2a; padding: 2px 6px; border-radius: 4px; color: #00ffcc;">10x</span>
            </div>

            <div class="main-layout">
                <div class="left-section">
                    <div class="chart-box">
                        <div class="chart-header">
                            <span>15m</span>
                            <span class="active">1j</span>
                            <span>4j</span>
                            <span>1H</span>
                        </div>
                        <div class="fake-chart">
                            <div class="bar red" style="height: 40%;"></div>
                            <div class="bar" style="height: 55%;"></div>
                            <div class="bar red" style="height: 30%;"></div>
                            <div class="bar" style="height: 75%;"></div>
                            <div class="bar red" style="height: 50%;"></div>
                            <div class="bar" style="height: 85%;"></div>
                        </div>
                    </div>

                    <div class="trading-panel">
                        <div class="tab-switch">
                            <div class="tab-btn buy-tab active">Beli FARA</div>
                        </div>
                        <div class="input-group">
                            <label>Harga (USDT)</label>
                            <div class="input-box"><input type="number" value="1.50" step="0.01"><span>USDT</span></div>
                        </div>
                        <div class="input-group">
                            <label>Jumlah FARA</label>
                            <div class="input-box"><input type="number" placeholder="0"><span>FARA</span></div>
                        </div>
                        <button class="action-btn btn-buy" onclick="alert('Order Berhasil Dipasang!')">Beli FARA</button>
                    </div>
                </div>

                <div class="right-section">
                    <div class="orderbook-header"><span>Harga (USDT)</span><span style="text-align: right;">Jumlah (FARA)</span></div>
                    <div class="book-row ask"><span>1.55</span><span style="text-align: right;">10,000</span></div>
                    <div class="book-row ask"><span>1.52</span><span style="text-align: right;">25,000</span></div>
                    <div class="current-price-box">1.50 USDT</div>
                    <div class="book-row bid"><span>1.49</span><span style="text-align: right;">12,000</span></div>
                    <div class="book-row bid"><span>1.45</span><span style="text-align: right;">50,000</span></div>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log('Server FARA Pro aktif di http://localhost:3000');
});