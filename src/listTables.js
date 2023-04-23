const { Pool } = require('pg');

const con_bd1 = new Pool ({
    host: 'db.bvaqcsjdajjffqekutvg.supabase.co',
    database: 'clinica',
    user: 'postgres',
    password: 'JPsiqKsGTcvmW4w',
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
const con_bd2 = new Pool({
    user: 'postgres',
    host: 'db.bvaqcsjdajjffqekutvg.supabase.co',
    database: 'consultorio',
    password: 'JPsiqKsGTcvmW4w',
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

let getTable1 = (async(req, res) => {
    //await con_bd1.connect();
    const { rows } = await con_bd1.query(`SELECT tablename AS tabela FROM pg_catalog.pg_tables
        WHERE schemaname NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
        ORDER BY tablename`);
    //await con_bd1.end();
    
    /*pool1
    .query(`SELECT tablename AS tabela FROM pg_catalog.pg_tables
            WHERE schemaname NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
            ORDER BY tablename`)
    .then((res) => console.log(res.rows))
    .catch((err) => console.error('Error executing query', err.stack))
    */
    return res.status(200).send(rows);
});

let getTable2 = (async(req, res) => {
    //con_bd2.connect();
    const { rows } = await con_bd2.query(`SELECT tablename AS tabela FROM pg_catalog.pg_tables
        WHERE schemaname NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
        ORDER BY tablename`);
    //await con_bd2.end();
    return res.status(200).send(rows);
});
    
module.exports = {
    con_bd1,
    con_bd2,
    getTable1,
    getTable2
};
