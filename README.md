# SimDBS - Similarity Database Structure Comparator
É necessário ter o Node.js instalado para executar o software.

Para executar o programa:
* Primeiro clonar o repositório e instalar as dependências pg e string-similarity utilizando o comando `yarn install pg` e 'yarn install string-similarity`.
* Editar o arquivo _analyze.js_ nas linhas 07 e 25 com os dados do primeiro banco a ser acessado. Inserir as informações na ordem: usuário, url do banco, nome do banco e senha. A última informação na linha 07 é a porta, que para o PostgreSQL é 5432, não sendo necessário alterar. Na linha 25, inserir o nome da tabela.
* Editar o arquivo _analyze.js_ nas linhas 16 e 26 com os dados do segundo banco a ser acessado, da mesma forma que o primeiro.
* Executar o programa na pasta _src/_ utilizando o comando `node analyze.js`. O resultado será mostrado no terminal. Recomenda-se utilizar o terminal maximizado, pois a tabela tem a largura grande, e pode ficar desconfigurada em janelas menores.
