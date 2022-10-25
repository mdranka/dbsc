CREATE TABLE paciente(
    idPaciente SERIAL NOT NULL PRIMARY KEY,
    nome varchar(45) NOT NULL,
    rg int,
    cpf bigint UNIQUE,
    endereco varchar(80),
    cidade varchar(25),
    estado char(2),
    dataNasc date,
    cadSUS int UNIQUE,
    convenio varchar(15)
);

CREATE TABLE medico(
    crm int NOT NULL PRIMARY KEY,
    nome varchar(45) NOT NULL,
    endereco varchar(80),
    cidade varchar(25),
    estado char(2),
    especialidade varchar(20),
    dataContrato date,
    telefone bigint,
    cpf bigint UNIQUE
);

CREATE TABLE consulta(
    codConsulta SERIAL NOT NULL PRIMARY KEY,
    datConsulta date NOT NULL,
    horaConsulta time,
    codPaciente int,
    crmMedico int,
    nrSala char(6),
    valorConsulta money,
    CONSTRAINT FK_medico FOREIGN KEY(crmMedico)
                     REFERENCES medico(crm),
    CONSTRAINT FK_paciente FOREIGN KEY(codPaciente)
                     REFERENCES paciente(idPaciente)
);

INSERT INTO paciente (nome, rg, cpf, endereco, cidade, estado, dataNasc, cadSUS, convenio) VALUES ('Joao da Silva', 5689356, 10365498632, 'Rua Sao Joao Paulo II, n 22, bairro Sao Paulo', 'Nova Trento', 'SC', '1964/05/23', 0, 'particular');
INSERT INTO paciente (nome, rg, cpf, endereco, cidade, estado, dataNasc, cadSUS, convenio) VALUES ('Miguel Machado', 3465895, 95135462152, 'Rua Felipe Schimidt, n 65, bairro Estevao', 'Canoinhas', 'SC', '1954/10/22', 325469846, 'plano de saude');
INSERT INTO paciente (nome, rg, cpf, endereco, cidade, estado, dataNasc, cadSUS, convenio) VALUES ('Maria Luiza Moreto', 1346485, 35698425632, 'Rua Frei Menandro Kamps, n 139, bairro Sao Paulo', 'Videira', 'SC', '1972/03/31', 136889456, 'plano de saude');
INSERT INTO paciente (nome, rg, cpf, endereco, cidade, estado, dataNasc, cadSUS, convenio) VALUES ('Catarina Stocker', 9654256, 12365248921, 'Rua Francisco de Paula Pereira, n 316, bairro Centro', 'Sao Paulo', 'SP', '1981/08/21', 365449865, 'particular');
INSERT INTO paciente (nome, rg, cpf, endereco, cidade, estado, dataNasc, cadSUS, convenio) VALUES ('Jair Bolsonaro', 3465552, 35642158951, 'Rua Padre Pio de Pietrelcina, n 461, bairro Nova Veneza', 'Brasilia', 'DF', '1956/11/19', 346123578, 'planalto');
INSERT INTO paciente (nome, rg, cpf, endereco, cidade, estado, dataNasc, cadSUS, convenio) VALUES ('Marcos Krozinski', 1649823, 29658566586, 'Rua Estanislau Schumman, n 156, bairro Vitoria', 'Curitiba', 'PR', '1967/04/10', 356415469, 'particular');
INSERT INTO paciente (nome, rg, cpf, endereco, cidade, estado, dataNasc, cadSUS, convenio) VALUES ('Luiz Krakovski', 2347961, 23118256221, 'Rua Santa Cruz, n 33, bairro Dois Irmaos', 'Belo Horizonte', 'MG', '1922/03/10', 463254187, 'funeraria');
