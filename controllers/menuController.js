const db = require('../database/db');

exports.index = async (req, res) => {
    try {
        const [menu] = await db.query(
            'SELECT * FROM menu ORDER BY id_menu DESC'
        );

        res.render('menu/index', { menu });

    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};

exports.createForm = async (req, res) => {
    res.render('menu/create');
};

exports.store = async (req, res) => {
    try {

        const {
            nama_menu,
            kategori,
            harga
        } = req.body;

        await db.query(
            `INSERT INTO menu
            (nama_menu, kategori, harga)
            VALUES (?, ?, ?)`,
            [nama_menu, kategori, harga]
        );

        res.redirect('/menu');

    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};

exports.editForm = async (req, res) => {
    try {

        const { id } = req.params;

        const [menu] = await db.query(
            'SELECT * FROM menu WHERE id_menu = ?',
            [id]
        );

        res.render('menu/edit', {
            menu: menu[0]
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
            nama_menu,
            kategori,
            harga
        } = req.body;

        await db.query(
            `UPDATE menu
            SET
                nama_menu = ?,
                kategori = ?,
                harga = ?
            WHERE id_menu = ?`,
            [nama_menu, kategori, harga, id]
        );

        res.redirect('/menu');

    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};

exports.destroy = async (req, res) => {
    try {

        const { id } = req.params;

        await db.query(
            'DELETE FROM menu WHERE id_menu = ?',
            [id]
        );

        res.redirect('/menu');

    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};