// Data Resmi 16 Jenjang Pangkat Gifter FAFI (Akumulasi 1 Tahun Terakhir)
export const fafiRanks = [
    { level: 1, name: "WARGA", min: 0, max: 0 },
    { level: 2, name: "SOSIAL", min: 1, max: 9 },
    { level: 3, name: "FRIENDLY", min: 10, max: 24 },
    { level: 4, name: "LOYALIS", min: 25, max: 49 },
    { level: 5, name: "DERMAWAN", min: 50, max: 99 },
    { level: 6, name: "DONATUR", min: 100, max: 249 },
    { level: 7, name: "JURAGAN", min: 250, max: 499 },
    { level: 8, name: "SAUDAGAR", min: 500, max: 749 },
    { level: 9, name: "HARTAWAN", min: 750, max: 999 },
    { level: 10, name: "MILIARDER", min: 1000, max: 1499 },
    { level: 11, name: "KONGLOMERAT", min: 1500, max: 1999 },
    { level: 12, name: "ELITE", min: 2000, max: 2499 },
    { level: 13, name: "LEGENDA", min: 2500, max: 3499 },
    { level: 14, name: "KAISAR", min: 3500, max: 4249 },
    { level: 15, name: "IMPERATOR", min: 4250, max: 4999 },
    { level: 16, name: "SULTAN", min: 5000, max: Infinity }
];

// Fungsi untuk menentukan pangkat berdasarkan total FARA user dalam 1 tahun terakhir
export function getUserRank(totalFara) {
    for (let i = fafiRanks.length - 1; i >= 0; i--) {
        if (totalFara >= fafiRanks[i].min) {
            return fafiRanks[i];
        }
    }
    return fafiRanks[0]; // Default Level 1 (Warga)
}