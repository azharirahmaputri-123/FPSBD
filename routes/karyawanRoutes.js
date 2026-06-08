const express = require('express');
const router = express.Router();

const karyawanController =
require('../controllers/karyawanController');

router.get('/', karyawanController.index);

router.get('/create', karyawanController.createForm);
router.post('/create', karyawanController.store);

router.get('/edit/:id', karyawanController.editForm);
router.post('/edit/:id', karyawanController.update);

router.get('/delete/:id', karyawanController.destroy);

module.exports = router;