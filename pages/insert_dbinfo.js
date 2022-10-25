let at01 = ['idPaciente', 'nome', 'rg', 'cpf', 'endereco', 'cidade', 'estado', 'dataNasc', 'cadSUS', 'convenio'];
let p01 = ['integer', 'varchar', 'integer', 'integer', 'varchar', 'varchar', 'char', 'date', 'integer', 'varchar'];

let at02 = ['codPac', 'nomePac', 'rg', 'cpf', 'endereco', 'cidade', 'estado', 'dtNasc', 'convenio'];
let p02 = ['integer', 'varchar', 'integer', 'integer', 'varchar', 'varchar', 'char', 'date', 'varchar'];

const sim = require('string-similarity');

class Attribute {
    constructor(_name, _type, _pk, _nullable, _updatable, _fk, _restrict){
        this.name = _name;
        this.type = _type;
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
        return this.type;
    }

    getAttrib() {
        attrib = [this.pk, this.nullable, this.updatable, this.fk, this.restrict];
        return attrib;
    }
}

class Result {
    constructor(_name1, _name2, _type1, _type2, _pk1, _pk2, _nullable1, _nullable2, _updatable1, _updatable2, _fk1, _fk2, _restrict1, _restrict2) {
        this.name1 = _name1;
        this.name2 = _name2;
        this.type1 = _type1;
        this.type2 = _type2;
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
    }
}

// cria lista de atributos da primeira tabela
let tab01 = [];
for (let i = 0; i < at01.length; i++) {
    tab01.push(new Attribute(at01[i], p01[i], null, null, null, null, null, false))
}
// cria lista de atributos da segunda tabela
let tab02 = [];
for (let i = 0; i < at02.length; i++) {
    tab02.push(new Attribute(at02[i], p02[i], null, null, null, null, null, false))
}

// Testa o atributo mais similar
let attribSim = [];
let bmi;
for (let i = 0; i < tab01.length; i++) {
    let n2 = []; // lista de nomes de atributo da segunda tabela
    for (let j = 0 ; j < tab02.length; j++){
        n2.push(tab02[j].name);
    }
    bm = sim.findBestMatch(tab01[i].name, n2);
    bmi = bm.bestMatchIndex;
    if (!tab02[bmi].match){ // se não foi listado ainda
        attribSim.push(new Result(tab01[i].name, tab02[bmi].name, tab01[i].type, tab02[bmi].type,
            tab01[i].pk, tab02[bmi].pk, tab01[i].nullable, tab02[bmi].nullable,
            tab01[i].updatable, tab02[bmi].updatable, tab01[i].fk, tab02[bmi].fk,
            tab01[i].restrict, tab02[bmi].restrict));
            tab01[i].match = true; // marca como listado
            tab02[bmi].match = true;
    } else {
        attribSim.push(new Result(tab01[i].name, '---', tab01[i].type, '---',
            tab01[i].pk, '---', tab01[i].nullable, '---',
            tab01[i].updatable, '---', tab01[i].fk, '---',
            tab01[i].restrict, '---'));
            tab01[i].match = true; // marca como listado
    }
}
for (let i = 0; i < tab02.length; i++) {
    if (!tab02[i].match) {
        attribSim.push(new Result('---', tab02[bmi].name, '---', tab02[bmi].type,
            '---', tab02[bmi].pk, '---', tab02[bmi].nullable,
            '---', tab02[bmi].updatable, '---', tab02[bmi].fk,
            '---', tab02[bmi].restrict));
            tab02[i].match = true; // marca como listado
    }
}
console.table(attribSim);


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