let at01 = ['idPaciente', 'nome', 'rg', 'cpf', 'endereco', 'cidade', 'estado', 'dataNasc', 'cadSUS', 'convenio'];
let p01 = ['integer', 'varchar', 'integer', 'integer', 'varchar', 'varchar', 'char', 'date', 'integer', 'varchar'];

let at02 = ['codPac', 'nomePac', 'rg', 'cpf', 'endereco', 'cidade', 'estado', 'dtNasc', 'convenio'];
let p02 = ['integer', 'varchar', 'integer', 'integer', 'varchar', 'varchar', 'char', 'date', 'varchar'];

const sim = require('string-similarity');

class attribute {
    constructor(_name, _type, _pk, _nullable, _updatable, _fk, _restrict){
        this.name = _name;
        this.type = _type;
        this.pk = _pk;
        this.nullable = _nullable;
        this.updatable = _updatable;
        this.fk = _fk;
        this.restrict = _restrict;
    }

    getName() {
        return this._name;
    }

    getType() {
        return this._type;
    }

    getAttrib() {
        attrib = [this._pk, this._nullable, this._updatable, this._fk, this._restrict];
        return attrib;
    }
}

// cria lista de atributos da primeira tabela
let tab01 = [];
for (let i = 0; i < at01.length; i++) {
    tab01.push(new attribute(at01[i], p01[i], null, null, null, null, null))
}
// cria lista de atributos da segunda tabela
let tab02 = [];
for (let i = 0; i < at02.length; i++) {
    tab02.push(new attribute(at02[i], p02[i], null, null, null, null, null))
}

// Testa o atributo mais similar
let attribSim = [];
for (let i = 0; i < at01.length; i++) {
    console.log('%s: ', at01[i], sim.findBestMatch(tab01[i]._name, at02));
    attribSim.push('%d', i);
}

console.table(tab01);


//let result = new attribute();

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