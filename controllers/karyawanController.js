const db = require('../database/db');

// 1. Mengambil semua data karyawan
const getAllKaryawan = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM TABLE_KARYAWAN');
        res.status(200).json({
            status: 'Success',
            message: 'Berhasil mengambil data karyawan',
            data: rows
        });
    } catch (error) {
        res.status(500).json({ status: 'Fail', message: error.message });
    }
};

// 2. Menambahkan karyawan baru
const createKaryawan = async (req, res) => {
    const { Nama, Jabatan, NO_Hp } = req.body;
    
    if (!Nama) {
        return res.status(400).json({ status: 'Fail', message: 'Nama karyawan harus diisi' });
    }

    try {
        const query = 'INSERT INTO TABLE_KARYAWAN (Nama, Jabatan, NO_Hp) VALUES (?, ?, ?)';
        const [result] = await db.query(query, [Nama, Jabatan, NO_Hp]);
        
        res.status(201).json({
            status: 'Success',
            message: 'Karyawan berhasil ditambahkan',
            data: { id: result.insertId, Nama, Jabatan, NO_Hp }
        });
    } catch (error) {
        res.status(500).json({ status: 'Fail', message: error.message });
    }
};

module.exports = {
    getAllKaryawan,
    createKaryawan
};