CREATE TABLE paciente(
    codPac SERIAL NOT NULL PRIMARY KEY,
    nomePac varchar(40) NOT NULL,
    rg int,
    cpf bigint,
    endereco varchar(80),
    cidade varchar(30),
    estado char(2),
    dtNasc date,
    convenio varchar(20)
);

CREATE TABLE medico(
    codMedico SERIAL NOT NULL PRIMARY KEY,
    crm smallint NOT NULL UNIQUE,
    nomeMed varchar(40) NOT NULL,
    endereco varchar(80),
    bairro varchar(20),
    cidade varchar(30),
    estado char(2),
    especialidade varchar(20),
    dtContrato date,
    telefone bigint
);

CREATE TABLE consulta(
    codCons SERIAL NOT NULL PRIMARY KEY,
    dtCons date NOT NULL,
    horaCons time,
    codMed int,
    codPac int,
    sala char(6),
    valorCons money,
    CONSTRAINT FK_medico FOREIGN KEY(codMed)
                     REFERENCES medico(codMedico),
    CONSTRAINT FK_paciente FOREIGN KEY(codPac)
                     REFERENCES paciente(codPac)
);

INSERT INTO paciente (nomePac, rg, cpf, endereco, cidade, estado, dtNasc, convenio) VALUES ('Joao da Silva', 5689356, 10365498632, 'Rua Sao Joao Paulo II, n 22, bairro Sao Paulo', 'Nova Trento', 'SC', '1964/05/23', 'particular');
INSERT INTO paciente (nomePac, rg, cpf, endereco, cidade, estado, dtNasc, convenio) VALUES ('Miguel Machado', 3465895, 95135462152, 'Rua Felipe Schimidt, n 65, bairro Estevao', 'Canoinhas', 'SC', '1954/10/22', 'plano de saude');
INSERT INTO paciente (nomePac, rg, cpf, endereco, cidade, estado, dtNasc, convenio) VALUES ('Maria Luiza Moreto', 1346485, 35698425632, 'Rua Frei Menandro Kamps, n 139, bairro Sao Paulo', 'Videira', 'SC', '1972/03/31', 'plano de saude');
INSERT INTO paciente (nomePac, rg, cpf, endereco, cidade, estado, dtNasc, convenio) VALUES ('Catarina Stocker', 9654256, 12365248921, 'Rua Francisco de Paula Pereira, n 316, bairro Centro', 'Sao Paulo', 'SP', '1981/08/21', 'particular');
INSERT INTO paciente (nomePac, rg, cpf, endereco, cidade, estado, dtNasc, convenio) VALUES ('Jair Bolsonaro', 3465552, 35642158951, 'Rua Padre Pio de Pietrelcina, n 461, bairro Nova Veneza', 'Brasilia', 'DF', '1956/11/19', 'planalto');
INSERT INTO paciente (nomePac, rg, cpf, endereco, cidade, estado, dtNasc, convenio) VALUES ('Marcos Krozinski', 1649823, 29658566586, 'Rua Estanislau Schumman, n 156, bairro Vitoria', 'Curitiba', 'PR', '1967/04/10', 'particular');
INSERT INTO paciente (nomePac, rg, cpf, endereco, cidade, estado, dtNasc, convenio) VALUES ('Luiz Krakovski', 2347961, 23118256221, 'Rua Santa Cruz, n 33, bairro Dois Irmaos', 'Belo Horizonte', 'MG', '1922/03/10', 'funeraria');

SELECT * FROM paciente;