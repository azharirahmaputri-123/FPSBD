const db = require('../database/db');

exports.index = async (req, res) => {
    try {

        const [pemesan] = await db.query(
            'SELECT * FROM pelanggan ORDER BY id_pelanggan DESC'
        );

        res.render('pemesan/index', {
            pemesan
        });

    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};

exports.createForm = async (req, res) => {
    res.render('pemesan/create');
};

exports.store = async (req, res) => {
    try {

        const {
            nama_pelanggan,
            telepon,
            alamat
        } = req.body;

        await db.query(
            `INSERT INTO pelanggan
            (nama_pelanggan, telepon, alamat)
            VALUES (?, ?, ?)`,
            [nama_pelanggan, telepon, alamat]
        );

        res.redirect('/pemesan');

    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};

exports.editForm = async (req, res) => {
    try {

        const { id } = req.params;

        const [pemesan] = await db.query(
            'SELECT * FROM pelanggan WHERE id_pelanggan = ?',
            [id]
        );

        res.render('pemesan/edit', {
            pemesan: pemesan[0]
        });

    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};

exports.update = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            nama_pelanggan,
            telepon,
            alamat
        } = req.body;

        await db.query(
            `UPDATE pelanggan
            SET
                nama_pelanggan = ?,
                telepon = ?,
                alamat = ?
            WHERE id_pelanggan = ?`,
            [nama_pelanggan, telepon, alamat, id]
        );

        res.redirect('/pemesan');

    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};

exports.destroy = async (req, res) => {
    try {

        const { id } = req.params;

        await db.query(
            'DELETE FROM pelanggan WHERE id_pelanggan = ?',
            [id]
        );

        res.redirect('/pemesan');

    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};