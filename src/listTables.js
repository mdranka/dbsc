let { Client } = require('pg');

const con_bd1 = new Client ({
    host: 'db.bvaqcsjdajjffqekutvg.supabase.co',
    database: 'clinica',
    user: 'postgres',
    password: 'JPsiqKsGTcvmW4w',
    port: 5432,
});
const con_bd2 = new Client({
    user: 'postgres',
    host: 'db.bvaqcsjdajjffqekutvg.supabase.co',
    database: 'consultorio',
    password: 'JPsiqKsGTcvmW4w',
    port: 5432,
});

let getTable1 = (async(req, res) => {
    await con_bd1.connect();
    const { rows } = await con_bd1.query(`SELECT tablename AS tabela FROM pg_catalog.pg_tables
        WHERE schemaname NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
        ORDER BY tablename`);
    await con_bd1.end();
    return res.status(200).send(rows);
});

let getTable2 = (async(req, res) => {
    con_bd2.connect();
    const { rows } = await con_bd2.query(`SELECT tablename AS tabela FROM pg_catalog.pg_tables
        WHERE schemaname NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
        ORDER BY tablename`);
    await con_bd2.end();
    return res.status(200).send(rows);
});
    
module.exports = {
    con_bd1,
    con_bd2,
    getTable1,
    getTable2
};
