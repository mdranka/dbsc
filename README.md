# SimDBS - Similarity Database Structure Comparator
É necessário ter o Node.js instalado para executar o software Também é necessário o utilitário `yarn` ou `npm` no Linux. No Windows, o `npm` está incluso no Node.js.

Para executar o programa:
* Primeiro clonar o repositório e instalar as dependências pg e string-similarity utilizando o comando `yarn install pg` e `yarn install string-similarity`. Recentemente o comando foi atualizado para `yarn add pg`, pode ser que seja necessário usar o `add` ao invés de `install`. Se preferir usar o _npm_, os comandos são os seguintes: `npm i string-similarity` e `npm install pg`.
* Editar o arquivo _analyze.js_ nas linhas 07 e 25 com os dados do primeiro banco a ser acessado. Inserir as informações na ordem: usuário, url do banco, nome do banco e senha. A última informação na linha 07 é a porta, que para o PostgreSQL é 5432, não sendo necessário alterar. Na linha 25, inserir o nome da tabela.
* Editar o arquivo _analyze.js_ nas linhas 16 e 26 com os dados do segundo banco a ser acessado, da mesma forma que o primeiro.
* Executar o programa na pasta _src/_ utilizando o comando `node analyze.js`. O resultado será mostrado no terminal. Recomenda-se utilizar o terminal maximizado, pois a tabela tem grande largura, e pode ficar desconfigurada em janelas menores.


#### 

#### Bancos comparados
Os arquivos sql usados para criar os dois bancos de dados usados nas comparações estão na pasta _docs_ deste repositório.