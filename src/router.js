const express = require('express');
const connection = require('./listTables');
const compare = require('./compare');

const router = express.Router();

connection.con_bd1.connect();
connection.con_bd2.connect();
router.get('/tab01', connection.getTable1);
router.get('/tab02', connection.getTable2);
router.get('/result', compare.analyze);
router.post('/db01', );

module.exports = router;