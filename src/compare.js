const {con_bd1, con_bd2} = require('./listTables');

const sim = require('string-similarity');
//let { Client } = require('pg');
/*
// Conexão com banco de dados
let conn_bd1, conn_bd2;
// banco 1. inserir as informações: usuário,   url do banco de dados,     banco,       senha,                             porta.
//let [u1, h1, d1, pass1, port1] = ['iujokcbp', 'babar.db.elephantsql.com', 'iujokcbp', 'qoeFHJ4TmvXz2gDyN-5cfTSSlOrZG3eI', 5432];
let [u1, h1, d1, pass1, port1] = ['postgres', 'db.bvaqcsjdajjffqekutvg.supabase.co', 'clinica', 'JPsiqKsGTcvmW4w', 5432];
//let [u1, h1, d1, pass1, port1] = ['marcos', 'tcc-data.postgres.database.azure.com', 'clinica', 'JPsiqKsGTcvmW4w', 5432];
//let [u1, h1, d1, pass1, port1] = ['hgllojip', 'castor.db.elephantsql.com', 'hgllojip', 'FzaCnomCMDcppxGH6Xl84XmWcG3Gahpk', 5432];
conn_bd1 = new Client({
    user: u1,
    host: h1,
    database: d1,
    password: pass1,
    port: port1
});
// banco 2. inserir as informações: usuário,   url do banco de dados,     banco,       senha,                             porta.
//let [u2, h2, d2, pass2, port2] = ['ubnudjnt', 'babar.db.elephantsql.com', 'ubnudjnt', 'zuKRWNLmny2_CKs6BXBH7vy2E5GCC6mI', 5432];
let [u2, h2, d2, pass2, port2] = ['postgres', 'db.bvaqcsjdajjffqekutvg.supabase.co', 'consultorio', 'JPsiqKsGTcvmW4w', 5432];
//let [u2, h2, d2, pass2, port2] = ['marcos', 'tcc-data.postgres.database.azure.com', 'consultorio', 'JPsiqKsGTcvmW4w', 5432];
//let [u2, h2, d2, pass2, port2] = ['sxpjoesf', 'castor.db.elephantsql.com', 'sxpjoesf', '6xeTVWEk7rmr65ScoKZ-nS2kfZm-xC5U', 5432];
conn_bd2 = new Client({
    user: u2,
    host: h2,
    database: d2,
    password: pass2,
    port: port2
});*/
// Nome das tabelas nos bancos 1 e 2
const table01 = 'medico'; // pode ser testado também com 'paciente' e 'consulta'
const table02 = 'medico'; // pode ser testado também com 'paciente' e 'consulta'

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

//let cn2 = [];
//let t2 = ['integer', 'character varying', 'integer', 'integer', 'character varying', 'character varying', 'character', 'date', 'character varying'];
//let s2 = [0, 45, 0, 0, 60, 35, 8, 0, 15];;
//console.log(cn2);



// Execução da análise, chama as funções construídas
/*
(async () => {
    //con_bd1.connect();
    //con_bd2.connect();
    
    // Busca as colunas que são chaves primárias e secundárias em todas as tabelas do banco e salva para comparação
    await getKeys(con_bd1, 'PRIMARY KEY', pkeys1);
    await getKeys(con_bd1, 'FOREIGN KEY', fkeys1);
    await getKeys(con_bd2, 'PRIMARY KEY', pkeys2);
    await getKeys(con_bd2, 'FOREIGN KEY', fkeys2);
    //console.log(pkeys2);
    await getData(con_bd1, table01, cn1, pkeys1, pk1, fkeys1, fk1, t1, s1, n1, up1);
    await getData(con_bd2, table02, cn2, pkeys2, pk2, fkeys2, fk2, t2, s2, n2, up2);
    
    //console.log(cn1);
    //console.log(cn2);
    
    // Encerra conexões com bds
    con_bd1.end();
    con_bd2.end();
    
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
    console.log(`Banco 1: ${con_bd1.database}; Tabela 1: ${table01}`);
    console.log(`Banco 2: ${con_bd2.database}; Tabela 2: ${table02}`);
    console.table(simPercentCalc(buildTable(tab01, tab02)));

})(); */
let analyze = (async(req, res) => {
    // Busca as colunas que são chaves primárias e secundárias em todas as tabelas do banco e salva para comparação
    //await con_bd1.connect();
    //await con_bd2.connect();
    await getKeys(con_bd1, 'PRIMARY KEY', pkeys1);
    await getKeys(con_bd1, 'FOREIGN KEY', fkeys1);
    await getKeys(con_bd2, 'PRIMARY KEY', pkeys2);
    await getKeys(con_bd2, 'FOREIGN KEY', fkeys2);
    //console.log(pkeys2);
    await getData(con_bd1, table01, cn1, pkeys1, pk1, fkeys1, fk1, t1, s1, n1, up1);
    await getData(con_bd2, table02, cn2, pkeys2, pk2, fkeys2, fk2, t2, s2, n2, up2);
    // Encerra conexões com bds
    //await con_bd1.end();
    //await con_bd2.end();
    
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
    let result = simPercentCalc(buildTable(tab01, tab02))
    return res.status(200).json(result);
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
    // Funções auxiliares, por enquanto sem uso, talvez sejam removidas.
    getName() {
        return this.name;
    }

    getType() {
        return [this.type, this.size];
    }

    getAttrib() {
        attrib = [this.pk, this.nullable, this.updatable, this.fk, this.restrict];
        return attrib;
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
    for (let i = 0; i < tab01.length; i++) {
        let n2 = []; // lista de nomes de atributo da segunda tabela
        for (let j = 0 ; j < tab02.length; j++){
            n2.push(tab02[j].name);
        }
        bm = sim.findBestMatch(tab01[i].name, n2);
        bmi = bm.bestMatchIndex;
        if (!tab02[bmi].match){ // se não foi listado ainda
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
            attribSim.push(new Result('---', tab02[bmi].name, '---', tab02[bmi].type,
                '---', tab02[bmi].size, '---', tab02[bmi].pk, '---', tab02[bmi].nullable,
                '---', tab02[bmi].updatable, '---', tab02[bmi].fk,
                '---', tab02[bmi].restrict));
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
        attribSim[i].simScore = (100 * similarity).toFixed(1) + '%';
        similarity = 0;
    }

    return attribSim;
}

//let result = new Attribute();

//console.table(result);






module.exports = {
    analyze,
    getKeys,
    getData,
    simPercentCalc,
    typeSimilarity,
    buildTable,
    Attribute,
    Result
}