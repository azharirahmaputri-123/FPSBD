const db = require('../database/db');

// 1. Membuat Pemesanan Baru (Transaksi Kompleks)
const createPemesanan = async (req, res) => {
    const { 
        ID_Pelanggan, ID_Karyawan, ID_Pengiriman, ID_Tim, // Data Relasi
        ID_Menu, Jumlah_Porsi,                           // Data Detail Menu
        Metode_Pembayaran                                 // Data Pembayaran
    } = req.body;

    // Validasi input minimal
    if (!ID_Menu || !Jumlah_Porsi || !ID_Pelanggan) {
        return res.status(400).json({ status: 'Fail', message: 'Data pelanggan, menu, dan porsi wajib diisi' });
    }

    try {
        // Langkah A: Ambil harga menu dari TABLE_MENU untuk menghitung subtotal
        const [menuRows] = await db.query('SELECT Harga FROM TABLE_MENU WHERE ID_Menu = ?', [ID_Menu]);
        if (menuRows.length === 0) {
            return res.status(404).json({ status: 'Fail', message: 'Menu tidak ditemukan' });
        }
        const hargaMenu = menuRows[0].Harga;
        const totalSubHarga = hargaMenu * Jumlah_Porsi;

        // Langkah B: Insert ke TABLE_DETAIL
        const queryDetail = 'INSERT INTO TABLE_DETAIL (ID_Menu, Jumlah_Porsi, Total_Sub_Harga) VALUES (?, ?, ?)';
        const [detailResult] = await db.query(queryDetail, [ID_Menu, Jumlah_Porsi, totalSubHarga]);
        const insertedDetailId = detailResult.insertId;

        // Langkah C: Insert ke TABLE_TRANSAKSI (Total_Harga disamakan dengan totalSubHarga karena 1 detail)
        const queryTransaksi = `
            INSERT INTO TABLE_TRANSAKSI 
            (ID_Pelanggan, ID_Pengiriman, ID_Detail, Total_Harga, ID_Tim, ID_Karyawan) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [transaksiResult] = await db.query(queryTransaksi, [
            ID_Pelanggan, ID_Pengiriman || null, insertedDetailId, totalSubHarga, ID_Tim || null, ID_Karyawan || null
        ]);
        const insertedTransaksiId = transaksiResult.insertId;

        // Langkah D: Insert ke TABLE_PEMBAYARAN otomatis dengan status awal 'Pending'
        const queryPembayaran = 'INSERT INTO TABLE_PEMBAYARAN (ID_Transaksi, Metode_Pembayaran, Status) VALUES (?, ?, ?)';
        await db.query(queryPembayaran, [insertedTransaksiId, Metode_Pembayaran || 'Tunai', 'Pending']);

        res.status(201).json({
            status: 'Success',
            message: 'Transaksi pemesanan berhasil dibuat!',
            data: {
                id_transaksi: insertedTransaksiId,
                id_detail: insertedDetailId,
                total_bayar: totalSubHarga
            }
        });

    } catch (error) {
        res.status(500).json({ status: 'Fail', message: error.message });
    }
};

// 2. Mengambil Semua Riwayat Transaksi (Dilengkapi dengan JOIN tabel relasi)
const getAllPemesanan = async (req, res) => {
    try {
        const query = `
            SELECT 
                t.ID_Transaksi,
                t.Tanggal_Pemesanan,
                t.Total_Harga,
                p.Nama_Pelanggan,
                m.Nama_Menu,
                d.Jumlah_Porsi,
                k.Nama AS Nama_Karyawan,
                bayar.Metode_Pembayaran,
                bayar.Status AS Status_Pembayaran
            FROM TABLE_TRANSAKSI t
            LEFT JOIN TABLE_PELANGGAN p ON t.ID_Pelanggan = p.ID_Pelanggan
            LEFT JOIN TABLE_DETAIL d ON t.ID_Detail = d.ID_Detail
            LEFT JOIN TABLE_MENU m ON d.ID_Menu = m.ID_Menu
            LEFT JOIN TABLE_KARYAWAN k ON t.ID_Karyawan = k.ID_Karyawan
            LEFT JOIN TABLE_PEMBAYARAN bayar ON t.ID_Transaksi = bayar.ID_Transaksi
            ORDER BY t.Tanggal_Pemesanan DESC
        `;
        
        const [rows] = await db.query(query);
        res.status(200).json({
            status: 'Success',
            data: rows
        });
    } catch (error) {
        res.status(500).json({ status: 'Fail', message: error.message });
    }
};

module.exports = {
    createPemesanan,
    getAllPemesanan
};