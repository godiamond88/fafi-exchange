// Data Array 24 Gift FAFI dari Terendah ke Tertinggi
export const fafiGifts = [
    { id: 1, name: "Kertas Lipat", price: 0.01, icon: "/assets/icons/kertas_lipat.png" },
    { id: 2, name: "Permen Lolipop", price: 0.02, icon: "/assets/icons/lolipop.png" },
    { id: 3, name: "Bibir Merah", price: 0.03, icon: "/assets/icons/bibir_merah.png" },
    { id: 4, name: "Cangkir Kopi FAFI", price: 0.05, icon: "/assets/icons/cangkir_kopi.png" },
    { id: 5, name: "Tahu Bulat", price: 0.08, icon: "/assets/icons/tahu_bulat.png" },
    { id: 6, name: "Sayap Peri Kupu-Kupu", price: 0.10, icon: "/assets/icons/sayap_peri.png" },
    { id: 7, name: "Donat Coklat", price: 0.25, icon: "/assets/icons/donat.png" },
    { id: 8, name: "Bintang Berkilau", price: 0.40, icon: "/assets/icons/bintang.png" },
    { id: 9, name: "Buket Mawar Putih", price: 0.50, icon: "/assets/icons/buket_mawar.png" },
    { id: 10, name: "Topi Fedora Keren", price: 0.75, icon: "/assets/icons/topi_fedora.png" },
    { id: 11, name: "Kalung Liontin Hati", price: 1.00, icon: "/assets/icons/kalung.png" },
    { id: 12, name: "Kotak Musik Antik", price: 2.00, icon: "/assets/icons/kotak_musik.png" },
    { id: 13, name: "Nasi Tumpeng Mini", price: 2.50, icon: "/assets/icons/tumpeng.png" },
    { id: 14, name: "Kue Pelangi", price: 3.50, icon: "/assets/icons/kue_pelangi.png" },
    { id: 15, name: "Jaket Bomber FAFI", price: 4.00, icon: "/assets/icons/jaket.png" },
    { id: 16, name: "Gitar Akustik Unik", price: 6.50, icon: "/assets/icons/gitar.png" },
    { id: 17, name: "Piala Bunga Emas", price: 8.00, icon: "/assets/icons/piala_bunga.png" },
    { id: 18, name: "Mobil Klasik Eropa", price: 10.00, icon: "/assets/icons/mobil_klasik.png" },
    { id: 19, name: "Kapal Layar Phinisi", price: 25.00, icon: "/assets/icons/phinisi.png" },
    { id: 20, name: "Mahkota Kecil Permata", price: 50.00, icon: "/assets/icons/mahkota_kecil.png" },
    { id: 21, name: "Medali Bintang Emas", price: 100.00, icon: "/assets/icons/medali.png" },
    { id: 22, name: "Piala Bergilir FAFI", price: 250.00, icon: "/assets/icons/piala_bergilir.png" },
    { id: 23, name: "Super Sultan Mahkota", price: 500.00, icon: "/assets/icons/super_sultan.png" },
    { id: 24, name: "Tahta FAFI Utama", price: 1000.00, icon: "/assets/icons/tahta_utama.png" }
];

export function setupGiftModal(gridElementId) {
    const gridContainer = document.getElementById(gridElementId);
    if (!gridContainer) return;

    gridContainer.innerHTML = '';

    fafiGifts.forEach(gift => {
        const card = document.createElement('div');
        card.className = 'gift-card';
        card.style.setProperty('--bg-icon', `url('${gift.icon}')`);
        
        card.innerHTML = `
            <div class="gift-info">
                <div class="gift-name" title="${gift.name}">${gift.name}</div>
                <div class="gift-price">🟡 ${gift.price}</div>
            </div>
        `;

        card.addEventListener('click', () => {
            console.log(`Mengirim gift: ${gift.name} seharga ${gift.price} FARA`);
            alert(`Berhasil mengirim ${gift.name} (${gift.price} FARA)!`);
        });

        gridContainer.appendChild(card);
    });
}