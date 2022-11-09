const sim = require('string-similarity');
let { Client } = require('pg');

// Conexão com banco de dados
let conn_bd1, conn_bd2;
let [u1, h1, d1, pass1, port1] = ['iujokcbp', 'babar.db.elephantsql.com', 'iujokcbp', 'qoeFHJ4TmvXz2gDyN-5cfTSSlOrZG3eI', 5432]
conn_bd1 = new Client({
    user: u1,
    host: h1,
    database: d1,
    password: pass1,
    port: port1
});
// banco 2
let [u2, h2, d2, pass2, port2] = ['ubnudjnt', 'babar.db.elephantsql.com', 'ubnudjnt', 'zuKRWNLmny2_CKs6BXBH7vy2E5GCC6mI', 5432]
conn_bd2 = new Client({
    user: u2,
    host: h2,
    database: d2,
    password: pass2,
    port: port2
});

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



// Lê do banco de dados 
(async () => {
    conn_bd1.connect();
    conn_bd2.connect();
    const table01 = 'paciente';
    const table02 = 'paciente';
    // Busca as colunas que são chaves primárias e secundárias em todas as tabelas do banco e salva para comparação
    await getKeys(conn_bd1, 'PRIMARY KEY', pkeys1);
    await getKeys(conn_bd1, 'FOREIGN KEY', fkeys1);
    await getKeys(conn_bd2, 'PRIMARY KEY', pkeys2);
    await getKeys(conn_bd2, 'FOREIGN KEY', fkeys2);
    //console.log(pkeys2);
    
    // nome das colunas bd1 e se é chave primária ou estrangeira
    res = await conn_bd1.query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${table01}' ORDER BY ordinal_position ASC`);
    for (let i = 0; i < res.rowCount; i++){
        cn1.push(res.rows[i].column_name)
        for (let j = 0; j < pkeys1.length; j++){
            if (table01 === pkeys1[j].tabela && res.rows[i].column_name === pkeys1[j].coluna){
                pk1[i] = 'YES'
                break;
            } else {
                pk1[i] = 'NO'
            }
        }
        for (let j = 0; j < fkeys1.length; j++){
            if (table01 === fkeys1[j].tabela && res.rows[i].column_name === fkeys1[j].coluna){
                fk1[i] = 'YES'
                break;
            } else {
                fk1[i] = 'NO'
            }
        }
    };
    // tipo de dados bd1
    res = await conn_bd1.query(`SELECT data_type FROM information_schema.columns WHERE table_name = '${table01}' ORDER BY ordinal_position ASC`);
    for (let i = 0; i < res.rowCount; i++){
        if (res.rows[i].data_type === 'character varying') {
            t1.push('varchar')
        } else {
            t1.push(res.rows[i].data_type)
        }
    };
    // tamanho string bd1
    res = await conn_bd1.query(`SELECT character_maximum_length FROM information_schema.columns WHERE table_name = '${table01}' ORDER BY ordinal_position ASC`);
    for (let i = 0; i < res.rowCount; i++){
        if (res.rows[i].character_maximum_length === null){
            s1.push(0);
        } else {
            s1.push(parseInt(res.rows[i].character_maximum_length));
        }
    };
    
    // nullable bd1
    res = await conn_bd1.query(`SELECT is_nullable FROM information_schema.columns WHERE table_name = '${table01}' ORDER BY ordinal_position ASC`);
    for (let i = 0; i < res.rowCount; i++){n1.push(res.rows[i].is_nullable)};
    // updatable bd1
    res = await conn_bd1.query(`SELECT is_updatable FROM information_schema.columns WHERE table_name = '${table01}' ORDER BY ordinal_position ASC`);
    for (let i = 0; i < res.rowCount; i++){up1.push(res.rows[i].is_updatable)};
    
    // chave estrangeira bd1
    //res = await conn_bd1.query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${table01}' ORDER BY ordinal_position ASC`);
    //for (let i = 0; i < res.rowCount; i++){cn1.push(res.rows[i].column_name)};
    
    // restrict bd1
    //res = await conn_bd1.query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${table01}' ORDER BY ordinal_position ASC`);
    //for (let i = 0; i < res.rowCount; i++){cn1.push(res.rows[i].column_name)};

    // nome das colunas bd2
    res = await conn_bd2.query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${table02}' ORDER BY ordinal_position ASC`);
    for (let i = 0; i < res.rowCount; i++){
        cn2.push(res.rows[i].column_name)
        for (let j = 0; j < pkeys2.length; j++){
            if (table02 === pkeys2[j].tabela && res.rows[i].column_name === pkeys2[j].coluna){
                pk2[i] = 'YES'
                break;
            } else {
                pk2[i] = 'NO'
            }
        }
        for (let j = 0; j < fkeys2.length; j++){
            if (table02 === fkeys2[j].tabela && res.rows[i].column_name === fkeys2[j].coluna){
                fk2[i] = 'YES'
                break;
            } else {
                fk2[i] = 'NO'
            }
        }
    };
    // tipo de dados bd1
    res = await conn_bd2.query(`SELECT data_type FROM information_schema.columns WHERE table_name = '${table02}' ORDER BY ordinal_position ASC`);
    for (let i = 0; i < res.rowCount; i++){
        if (res.rows[i].data_type === 'character varying') {
            t2.push('varchar')
        } else {
            t2.push(res.rows[i].data_type)
        }
    };
    // tamanho string bd1
    res = await conn_bd2.query(`SELECT character_maximum_length FROM information_schema.columns WHERE table_name = '${table02}' ORDER BY ordinal_position ASC`);
    for (let i = 0; i < res.rowCount; i++){
        if (res.rows[i].character_maximum_length === null){
            s2.push(0);
        } else {
            s2.push(parseInt(res.rows[i].character_maximum_length));
        }
    };
    // chave primária bd1
    //res = await conn_bd1.query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${table01}' ORDER BY ordinal_position ASC`);
    //for (let i = 0; i < res.rowCount; i++){cn1.push(res.rows[i].column_name)};

    // nullable bd1
    res = await conn_bd2.query(`SELECT is_nullable FROM information_schema.columns WHERE table_name = '${table02}' ORDER BY ordinal_position ASC`);
    for (let i = 0; i < res.rowCount; i++){n2.push(res.rows[i].is_nullable)};
    // updatable bd1
    res = await conn_bd2.query(`SELECT is_updatable FROM information_schema.columns WHERE table_name = '${table02}' ORDER BY ordinal_position ASC`);
    for (let i = 0; i < res.rowCount; i++){up2.push(res.rows[i].is_updatable)};

    // chave estrangeira bd1
    //res = await conn_bd1.query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${table01}' ORDER BY ordinal_position ASC`);
    //for (let i = 0; i < res.rowCount; i++){cn1.push(res.rows[i].column_name)};

    // restrict bd1
    //res = await conn_bd1.query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${table01}' ORDER BY ordinal_position ASC`);
    //for (let i = 0; i < res.rowCount; i++){cn1.push(res.rows[i].column_name)};


    
    //console.log(cn1);
    //console.log(cn2);
    
    // Encerra conexões com bds
    conn_bd1.end();
    conn_bd2.end();
    
    
    
    // cria lista de atributos da primeira tabela
    let tab01 = [];
    for (let i = 0; i < cn1.length; i++) {
        tab01.push(new Attribute(cn1[i], t1[i], s1[i], pk1[i], n1[i], up1[i], fk1[i], 'NO', 'NO'))
    }
    // cria lista de atributos da segunda tabela
    let tab02 = [];
    for (let i = 0; i < cn2.length; i++) {
        tab02.push(new Attribute(cn2[i], t2[i], s2[i], pk2[i], n2[i], up2[i], fk2[i], 'YES', 'NO'))
    }
    // Executa as funções e retorna a tabela com o resultado
    console.log(`Banco 1: ${conn_bd1.database}; Tabela 1: ${table01}`);
    console.log(`Banco 2: ${conn_bd2.database}; Tabela 2: ${table02}`);
    console.table(simPercentCalc(buildTable(tab01, tab02)));

})();


class Attribute {
    constructor(_name, _type, _size, _pk, _nullable, _updatable, _fk, _restrict){
        this.name = _name;
        this.type = _type;
        this.size = _size;
        this.pk = _pk;
        this.nullable = _nullable;
        this.updatable = _updatable;
        this.fk = _fk;
        this.restrict = _restrict;
        this.match = false
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
            case 'character varying':
                if(t2 === 'character varying'){
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
