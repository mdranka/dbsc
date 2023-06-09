const sim = require('string-similarity');
const { Pool } = require('pg');



let con_bd1, con_bd2;
function pool1(data){
    con_bd1 = new Pool ({
        host: `${data.host1}`, //'db.bvaqcsjdajjffqekutvg.supabase.co',
        database: `${data.db1}`, //'clinica',
        user: `${data.user1}`, //'postgres',
        password: `${data.pass1}`, //'JPsiqKsGTcvmW4w',
        max: 20,
        idleTimeoutMillis: 2000,
        connectionTimeoutMillis: 15000,
    });
    //con_bd1.connect()
}

function pool2(data){
    con_bd2 = new Pool ({
        host: `${data.host2}`, //'db.bvaqcsjdajjffqekutvg.supabase.co',
        database: `${data.db2}`, //'consultorio',
        user: `${data.user2}`, //'postgres',
        password: `${data.pass2}`, //'JPsiqKsGTcvmW4w',
        max: 20,
        idleTimeoutMillis: 2000,
        connectionTimeoutMillis: 15000,
    });
    //con_bd2.connect();
}


let getTable1 = (async(req, res) => {
    pool1(req.body);
    const client = await con_bd1.connect();
    const { rows } = await client.query(`SELECT tablename AS tabela FROM pg_catalog.pg_tables
        WHERE schemaname NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
        ORDER BY tablename`);
    await client.release();
    return res.status(200).send(rows);
});

let getTable2 = (async(req, res) => {
    pool2(req.body);
    const client = await con_bd2.connect();
    const { rows } = await client.query(`SELECT tablename AS tabela FROM pg_catalog.pg_tables
        WHERE schemaname NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
        ORDER BY tablename`);
    await client.release();
    return res.status(200).send(rows);
});
    

let analyze = (async(req, res) => {

    // Atributos tabela 01
    let cn1 = []; // nome da coluna
    let t1 = []; // tipo de dados
    let s1 = []; // Tamanho da string, caso haja
    let pk1 = []; // chave primária
    let n1 = []; // Nullable
    let up1 = []; // Updatable
    let fk1 = []; // Chave estrangeira
    let r1 = []; // Restrict
    let pkeys1 = []; // chaves primárias
    let fkeys1 = []; // chaves estrangeiras

    // Atributos tabela 02
    let cn2 = []; // nome da coluna
    let t2 = []; // tipo de dados
    let s2 = []; // Tamanho da string, caso haja
    let pk2 = []; // chave primária
    let n2 = []; // Nullable
    let up2 = []; // Updatable
    let fk2 = []; // Chave estrangeira
    let r2 = []; // Restrict
    let pkeys2 = []; // chaves primárias
    let fkeys2 = []; // chaves estrangeiras

    pool1(req.body);
    pool2(req.body);
    
    // Busca as colunas que são chaves primárias e secundárias em todas as tabelas do banco e salva para comparação
    await getKeys(con_bd1, 'PRIMARY KEY', pkeys1);
    await getKeys(con_bd1, 'FOREIGN KEY', fkeys1);
    await getKeys(con_bd2, 'PRIMARY KEY', pkeys2);
    await getKeys(con_bd2, 'FOREIGN KEY', fkeys2);

    await getData(con_bd1, req.body.table1, cn1, pkeys1, pk1, fkeys1, fk1, t1, s1, n1, up1);
    await getData(con_bd2, req.body.table2, cn2, pkeys2, pk2, fkeys2, fk2, t2, s2, n2, up2);

    
    // cria lista de atributos da primeira tabela
    let tab01 = [];
    for (let i = 0; i < cn1.length; i++) {
        tab01.push(new Attribute(cn1[i], t1[i], s1[i], pk1[i], n1[i], up1[i], fk1[i], 'NO', 'NO'))
    }
    // cria lista de atributos da segunda tabela
    let tab02 = [];
    for (let i = 0; i < cn2.length; i++) {
        tab02.push(new Attribute(cn2[i], t2[i], s2[i], pk2[i], n2[i], up2[i], fk2[i], 'NO', 'NO'))
    }
    // Executa as funções e retorna a tabela com o resultado
    const result = await simPercentCalc(buildTable(tab01, tab02));
    con_bd1.end();
    con_bd2.end();
    return res.status(200).send(result);
});



class Attribute {
    constructor(_name, _type, _size, _pk, _nullable, _updatable, _fk, _restrict){
        this.name = _name;              // Nome da coluna
        this.type = _type;              // Tipo de dados
        this.size = _size;              // Tamanho da String (se for string)
        this.pk = _pk;                  // É chave primária?
        this.nullable = _nullable;      // Pode estar vazio?
        this.updatable = _updatable;    // Pode ser alterado?
        this.fk = _fk;                  // É chave estrangeira?
        this.restrict = _restrict;      // Possui restição de preenchimento?
        this.match = false              // Durante a análise, informa se a coluna já foi associada com uma coluna da outra tabela
    }
}

class Result {
    constructor(_name1, _name2, _type1, _type2, _size1, _size2, _pk1, _pk2, _nullable1, _nullable2, _updatable1, _updatable2, _fk1, _fk2, _restrict1, _restrict2) {
        this.name1 = _name1;
        this.name2 = _name2;
        this.type1 = _type1;
        this.type2 = _type2;
        this.size1 = _size1;
        this.size2 = _size2;
        this.pk1 = _pk1;
        this.pk2 = _pk2;
        this.nullable1 = _nullable1;
        this.nullable2 = _nullable2;
        this.updatable1 = _updatable1;
        this.updatable2 = _updatable2;
        this.fk1 = _fk1;
        this.fk2 = _fk2;
        this.restrict1 = _restrict1;
        this.restrict2 = _restrict2;
        this.simScore = 0
    }
}

async function getKeys(conn_bd, tipo, keys){
    let res = await conn_bd.query(`SELECT t.table_name as tabela, k.column_name as coluna
                                    FROM information_schema.table_constraints t
                                    JOIN information_schema.key_column_usage k
                                    USING(constraint_name,table_schema,table_name)
                                    WHERE t.constraint_type='${tipo}'`);
    for (let i = 0; i < res.rowCount; i++){keys.push({'tabela': res.rows[i].tabela, 'coluna': res.rows[i].coluna})};
}

// função que busca os dados no bd e salva para comparação
async function getData(conn_bd, table, cn, pkeys, pk, fkeys, fk, t, s, n, up){
        // nome das colunas e se é chave primária ou estrangeira
        res = await conn_bd.query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${table}' ORDER BY ordinal_position ASC`);
        for (let i = 0; i < res.rowCount; i++){
            cn.push(res.rows[i].column_name)
            for (let j = 0; j < pkeys.length; j++){
                if (table === pkeys[j].tabela && res.rows[i].column_name === pkeys[j].coluna){
                    pk[i] = 'YES'
                    break;
                } else {
                    pk[i] = 'NO'
                }
            }
            for (let j = 0; j < fkeys.length; j++){
                if (table === fkeys[j].tabela && res.rows[i].column_name === fkeys[j].coluna){
                    fk[i] = 'YES'
                    break;
                } else {
                    fk[i] = 'NO'
                }
            }
        };
        // tipo de dados bd1
        res = await conn_bd.query(`SELECT data_type FROM information_schema.columns WHERE table_name = '${table}' ORDER BY ordinal_position ASC`);
        for (let i = 0; i < res.rowCount; i++){
            if (res.rows[i].data_type === 'character varying') {
                t.push('varchar')
            } else {
                t.push(res.rows[i].data_type)
            }
        };
        // tamanho string bd1
        res = await conn_bd.query(`SELECT character_maximum_length FROM information_schema.columns WHERE table_name = '${table}' ORDER BY ordinal_position ASC`);
        for (let i = 0; i < res.rowCount; i++){
            if (res.rows[i].character_maximum_length === null){
                s.push(0);
            } else {
                s.push(parseInt(res.rows[i].character_maximum_length));
            }
        };
        
        // nullable bd1
        res = await conn_bd.query(`SELECT is_nullable FROM information_schema.columns WHERE table_name = '${table}' ORDER BY ordinal_position ASC`);
        for (let i = 0; i < res.rowCount; i++){n.push(res.rows[i].is_nullable)};
        // updatable bd1
        res = await conn_bd.query(`SELECT is_updatable FROM information_schema.columns WHERE table_name = '${table}' ORDER BY ordinal_position ASC`);
        for (let i = 0; i < res.rowCount; i++){up.push(res.rows[i].is_updatable)};
}

function buildTable(tab01, tab02) { // Constrói tabela comparativa dos atributos
    let attribSim = []; // Lista com os dados a serem analisados
    let bmi; // Índice da string mais similar
    let simindex; // valor de similaridade
    for (let i = 0; i < tab01.length; i++) {
        let n2 = []; // lista de nomes de atributo da segunda tabela
        for (let j = 0 ; j < tab02.length; j++){
            n2.push(tab02[j].name);
        }
        bm = sim.findBestMatch(tab01[i].name, n2);
        bmi = bm.bestMatchIndex;
        simindex = sim.compareTwoStrings(tab01[i].name, tab02[bmi].name);
        if (!tab02[bmi].match && simindex > 0.3){ // se não foi listado ainda
            attribSim.push(new Result(tab01[i].name, tab02[bmi].name, tab01[i].type, tab02[bmi].type, tab01[i].size, tab02[bmi].size,
                tab01[i].pk, tab02[bmi].pk, tab01[i].nullable, tab02[bmi].nullable,
                tab01[i].updatable, tab02[bmi].updatable, tab01[i].fk, tab02[bmi].fk,
                tab01[i].restrict, tab02[bmi].restrict));
                tab01[i].match = true; // marca como listado
                tab02[bmi].match = true;
        } else {
            attribSim.push(new Result(tab01[i].name, '---', tab01[i].type, '---',
                tab01[i].size, '---', tab01[i].pk, '---', tab01[i].nullable, '---',
                tab01[i].updatable, '---', tab01[i].fk, '---',
                tab01[i].restrict, '---'));
                tab01[i].match = true; // marca como listado
        }
    }
    for (let i = 0; i < tab02.length; i++) {
        if (!tab02[i].match) {
            attribSim.push(new Result('---', tab02[i].name, '---', tab02[i].type,
                '---', tab02[i].size, '---', tab02[i].pk, '---', tab02[i].nullable,
                '---', tab02[i].updatable, '---', tab02[i].fk,
                '---', tab02[i].restrict));
                tab02[i].match = true; // marca como listado
        }
    }
return attribSim;
}

// Calcula semelhança entre os tipos de dados e atributos
function typeSimilarity(t1, t2, s1 = 0, s2 = 0) { // t1, t2: tipo dado 1 e 2, s1, s2: tamanho para char ou varchar.
    let score = 0;
    if (t1 === t2 && s1 === s2){
        score = 1;
    } else {
        switch (t1){
            case 'smallint':
                if(t2 === ('integer' || 'serial')){
                    score = 0.5;
                } else if (t2 === ('bigint' || 'decimal' || 'numeric' || 'real' || 'double precision' || 'bigserial')){
                    score = 0.1;
                } break;
            case 'integer':
                if(t2 === ('smallint' || 'bigint' || 'decimal' || 'numeric' || 'real' || 'double precision' || 'serial' || 'bigserial')){
                    score = 0.22;
                } break;
            case 'bigint':
            case 'decimal':
            case 'numeric':
            case 'real':
            case 'double precision':
            case 'serial':
            case 'bigserial':
                if(t2 === ('smallint' || 'integer' || 'bigint' || 'decimal' || 'numeric' || 'real' || 'double precision' || 'serial' || 'bigserial')){
                    score = 0.15;
                } break;
            case 'character':
                if(t2 === 'character'){
                    score = Math.min(s1, s2) / Math.max(s1, s2);
                } else if (t2 === 'character varying') {
                    score = 0.1;
                } break;
            case 'varchar':
                if(t2 === 'varchar'){
                    score = Math.min(s1, s2) / Math.max(s1, s2);
                } else if (t2 === 'character') {
                    score = 0.1;
                } break;
            case 'timestamp with time zone':
                if(t2 === 'timestamp without time zone'){
                    score = 0.7
                } else if (t2 === 'time without time zone'){
                    score = 0.22;
                } else if (t2 === 'time with time zone'){
                    score = 0.35;
                } break;
            case 'timestamp without time zone':
                if(t2 === 'timestamp with time zone'){
                    score = 0.7;
                } else if(t2 === 'time without time zone'){
                    score = 0.35;
                } else if (t2 === 'time with time zone'){
                    score = 0.22;
                } break;
            case 'time without time zone':
                if(t2 === 'timestamp with time zone'){
                    score = 0.22;
                } else if(t2 === 'timestamp without time zone'){
                    score = 0.35;
                } else if (t2 === 'time with time zone'){
                    score = 0.7;
                } break;
            case 'time with time zone':
                if(t2 === 'timestamp with time zone'){
                    score = 0.35;
                } else if(t2 === 'timestamp without time zone'){
                    score = 0.22;
                } else if (t2 === 'time without time zone'){
                    score = 0.7;
                } break;
        }
    }
    return score;
}


// Calculo do percentual de similaridade
function simPercentCalc(attribSim) {
    let similarity = 0;
    for (let i = 0; i < attribSim.length; i++) {
        // Calcula similaridade do nome
        similarity += (0.6 * (sim.compareTwoStrings(attribSim[i].name1, attribSim[i].name2)));
        //calcula similaridade do tipo de dado
        similarity += (0.25 * (typeSimilarity(attribSim[i].type1, attribSim[i].type2, attribSim[i].size1, attribSim[i].size2)));
        // primary key
        similarity += (0.05 * (attribSim[i].pk1 === attribSim[i].pk2 ? 1 : 0));
        // nullable
        similarity += (0.02 * (attribSim[i].nullable1 === attribSim[i].nullable2 ? 1 : 0));
        // updatable
        similarity += (0.02 * (attribSim[i].updatable1 === attribSim[i].updatable2 ? 1 : 0));
        // foreign key
        similarity += (0.04 * (attribSim[i].fk1 === attribSim[i].fk2 ? 1 : 0));
        // restrict
        similarity += (0.02 * (attribSim[i].restrict1 === attribSim[i].restrict2 ? 1 : 0));
        // Formatação da saída para porcentagem
        attribSim[i].simScore = (100 * similarity);
        similarity = 0;
    }

    return attribSim;
}

module.exports = {
    analyze,
    getKeys,
    getData,
    simPercentCalc,
    typeSimilarity,
    buildTable,
    Attribute,
    Result,
    getTable1,
    getTable2
}