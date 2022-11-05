/*const {Client} = require('pg');

const client = new Client({
  user: 'iujokcbp',
  host: 'babar.db.elephantsql.com',
  database: 'iujokcbp',
  password: 'qoeFHJ4TmvXz2gDyN-5cfTSSlOrZG3eI',
  port: 5432
});
*/


// Conexão com o banco de dados
let conn;
function connect(u, h, d, pass, port) {
  let { Client } = require('pg');
  conn = new Client({
    user: u,
    host: h,
    database: d,
    password: pass,
    port: port
  });
  conn.connect();
}

// variáveis solicitadas
let column = 'column_name';
let source = 'information_schema.columns'
let condition = 'consulta';

(async () => {
    //connect('iujokcbp', 'babar.db.elephantsql.com', 'iujokcbp', 'qoeFHJ4TmvXz2gDyN-5cfTSSlOrZG3eI', 5432);
    connect('ubnudjnt', 'babar.db.elephantsql.com', 'ubnudjnt', 'zuKRWNLmny2_CKs6BXBH7vy2E5GCC6mI', 5432);
    await select(column, source, condition);
    await close();
})();


async function select(col, src, cond) {
  let {rows} = await conn.query(`SELECT ${col} FROM ${src} WHERE table_name = '${cond}'`);
  for (const row of rows) {
    console.log(row.column_name);
  }
}

async function close(){
  await conn.end();
}