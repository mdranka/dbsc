let at01 = ['idPaciente', 'nome', 'rg', 'cpf', 'endereco', 'cidade', 'estado', 'dataNasc', 'cadSUS', 'convenio'];
let p01 = ['integer', 'character varying', 'integer', 'integer', 'character varying', 'character varying', 'character', 'date', 'integer', 'character varying'];
let s01 = [0, 40, 0, 0, 80, 30, 2, 0, 0, 15];

let at02 = ['codPac', 'nomePac', 'rg', 'cpf', 'endereco', 'cidade', 'estado', 'dtNasc', 'convenio'];
let p02 = ['integer', 'character varying', 'integer', 'integer', 'character varying', 'character varying', 'character', 'date', 'character varying'];
let s02 = [0, 45, 0, 0, 60, 35, 8, 0, 15];;

const sim = require('string-similarity');

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

    getName() {
        return this.name;
    }

    getType() {
        return this.type, this.size;
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

// cria lista de atributos da primeira tabela
let tab01 = [];
for (let i = 0; i < at01.length; i++) {
    tab01.push(new Attribute(at01[i], p01[i], s01[i], 'NO', 'NO', 'YES', 'NO', 'YES', 'NO'))
}
// cria lista de atributos da segunda tabela
let tab02 = [];
for (let i = 0; i < at02.length; i++) {
    tab02.push(new Attribute(at02[i], p02[i], s02[i], 'NO', 'NO', 'YES', 'NO', 'YES', 'NO'))
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
                tab01[i].size, '--', tab01[i].pk, '--', tab01[i].nullable, '--',
                tab01[i].updatable, '--', tab01[i].fk, '--',
                tab01[i].restrict, '--'));
                tab01[i].match = true; // marca como listado
        }
    }
    for (let i = 0; i < tab02.length; i++) {
        if (!tab02[i].match) {
            attribSim.push(new Result('---', tab02[bmi].name, '---', tab02[bmi].type,
                '---', tab02[bmi].size, '--', tab02[bmi].pk, '--', tab02[bmi].nullable,
                '--', tab02[bmi].updatable, '--', tab02[bmi].fk,
                '--', tab02[bmi].restrict));
                tab02[i].match = true; // marca como listado
        }
    }
return attribSim;
}

//console.table(buildTable(tab01, tab02));


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

        attribSim[i].simScore = (100 * similarity).toFixed(1) + '%';
        similarity = 0;
    }




    return attribSim;
}
console.table(simPercentCalc(buildTable(tab01, tab02)));

//let result = new Attribute();

//console.table(result);

/*
const similarity = require('string-similarity');

console.log('Nome - nomeCompleto: ' + similarity.compareTwoStrings('Nome', 'nomeCompleto'));
console.log('Nome - Nome: ' + similarity.compareTwoStrings('Nome', 'Nome'));
console.log('End - Endereco: ' + similarity.compareTwoStrings('End', 'Endereco'));
console.log('endereco - enderecoCompleto: ' + similarity.compareTwoStrings('endereco', 'enderecoCompleto'));
console.log('Nasc - DataNasc: ' + similarity.compareTwoStrings('Nasc', 'DataNasc'));
console.log('DtNasc - Nascimento: ' + similarity.compareTwoStrings('DtNasc', 'Nascimento'));
console.log('telefone - fone: ' + similarity.compareTwoStrings('telefone', 'fone'));
console.log('email - e-mail: ' + similarity.compareTwoStrings('email', 'e-mail'));
console.log('e-mail - mail: ' + similarity.compareTwoStrings('e-mail', 'mail'));
console.log('cadastro - dataCad: ' + similarity.compareTwoStrings('cadastro', 'dataCad'));
console.log('dataCad - dtCadastro: ' + similarity.compareTwoStrings('dataCad', 'dtCadastro'));
console.log('convenio - conv: ' + similarity.compareTwoStrings('convenio', 'conv'));
console.log('nomeMae - nMae: ' + similarity.compareTwoStrings('nomeMae', 'nMae'));
console.log('nomeMae - mae: ' + similarity.compareTwoStrings('nomeMae', 'mae'));
console.log('responsavel - resp: ' + similarity.compareTwoStrings('responsavel', 'resp'));
console.log('cadastroSUS - cadSus: ' + similarity.compareTwoStrings('cadastroSUS', 'cadSus'));
console.log('cadSus - codSUS: ' + similarity.compareTwoStrings('cadSus', 'codSUS'));
console.log('cadSus - cadastro: ' + similarity.compareTwoStrings('cadSus', 'cadastro'));
*/