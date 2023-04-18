const express = require('express');
const connection = require('./listTables');
const compare = require('./compare');

const router = express.Router();

router.get('/tab01', connection.getTable1);
router.get('/tab02', connection.getTable2);
router.get('/result', compare.analyze)

module.exports = router;