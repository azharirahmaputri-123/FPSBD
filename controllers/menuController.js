const db = require('../database/db');

// 1. Mengambil semua data menu
const getAllMenu = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM TABLE_MENU');
        res.status(200).json({
            status: 'Success',
            message: 'Berhasil mengambil daftar menu',
            data: rows
        });
    } catch (error) {
        res.status(500).json({ status: 'Fail', message: error.message });
    }
};

// 2. Menambahkan menu baru
const createMenu = async (req, res) => {
    const { Nama_Menu, Harga } = req.body;

    if (!Nama_Menu || !Harga) {
        return res.status(400).json({ status: 'Fail', message: 'Nama menu dan harga harus diisi' });
    }

    try {
        const query = 'INSERT INTO TABLE_MENU (Nama_Menu, Harga) VALUES (?, ?)';
        const [result] = await db.query(query, [Nama_Menu, Harga]);

        res.status(201).json({
            status: 'Success',
            message: 'Menu berhasil ditambahkan',
            data: { id: result.insertId, Nama_Menu, Harga }
        });
    } catch (error) {
        res.status(500).json({ status: 'Fail', message: error.message });
    }
};

module.exports = {
    getAllMenu,
    createMenu
};