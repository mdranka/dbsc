const express = require('express');
//const connection = require('./listTables');
const compare = require('./compare');

const router = express.Router();


router.post('/tab01', compare.getTable1);
router.post('/tab02', compare.getTable2);
router.post('/result', compare.analyze);

router.use((error, req, res, next) => {
    // Bad Request Error
    res.status(501)
    res.json("Dados para acesso ao BD incorretos! Corrija")
  })
  

module.exports = router;