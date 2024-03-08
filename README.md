# Automação de frontend com npm
O objetivo desse curso é demonstrar algumas ferramentas de introdução em CI/CD ao automatizar partes do desenvolvimento utilizando scripts e aumentar a produtividade de programação sem a utilização de frameworks.

[Link para o curso](https://www.origamid.com/curso/automacao-front-end-com-npm)

## 1 - Pacotes local vs. global

Para a utilização de pacotes que contenham binários há 2 opções: pacote local o global.

### 1.1 - Pacote local

Para utilizar o binário local, é precisso instalar o pacote o arquivo dentro de ```node_modules/.bin```.

Exemplo:

```
npm i ugilifyjs
./node_modules/.bin/uglify clipboard.js -c -m -o ./clipboard.min.js
```

O código acima representado gera o arquivo minificado, retirando espaços, comentários e encurtando variáveis de escopo.

### 1.2 - Pacote global

Para utilizar o bin globalmente e em qualquer projeto sem requisitar novamente, é necessário instalar o pacote globalmente, após isso é executado o mesmo comando, mas sem a referência do binário local.

```
sudo npm i uglify -g
uglifyjs clipboard.js -c -m -o clipboard.g.min.js
```

Os arquivos resultantes ```clipboard.min.js``` e ```clipboard.g.min.js``` podem ser verificados em sua similitude em um [verificador online](https://www.textcompare.org/javascript/), do qual retorna 0 diferenças.

## 2 - Utilizando script

Para automatizar esse processo de uso de um binário que precisa ser feito periodicamente, pode-se criar um script dentro do ```package.json```, como pode ser verificado após o script padrão de 'test'.

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "minclip": "uglifyjs clipboard.js -c -m -o clipboard.auto.min.js"
},
```

O arquivo resultante ```clipboard.g.min.js``` foi verificado manualmente conforme 1.2 e o mesmo possui similitude completa, retornando 0 diferenças.

### 2.1 - Outro exemplo de script

Para reforçar o exemplo de script, utilizou-se o SASS, pelo pacote ```node-sass```, para que gerasse o arquivo ```style.css``` resultante a partir do arquivo ```style.scss```, conforme exemplo abaixo:

```
npm i node-sass
./node_modules/.bin/node-sass style.scss style.css
```

## 3 - Exportação de módulos

Normalmente se utiliza de módulos para separar as funções comuns em JS para se reaproveitar em outros projetos ou arquivos. A essa função dar-se o nome de exportação de módulos, e seu uso é definido abaixo.

### 3.1 - Exportação única

Ainda sobre exportações, é possível que um arquivo tenha diversos contextos internos, e apenas uma exportação necessária, ou seja um arquivo simples de apenas 1 função, trazendo um exemplo, tem-se o arquivo ```plugin.js``` para exportar, para isso deve-se declarar a função utilizada e exportá-la no módulo:
```
function imc(peso, altura){
    return peso / (altura * altura);
}

module.exports = imc;
```

Por sua vez, no arquivo ```main.js``` que deseja importar a função deve-se utilizar:

```
const imc = require('plugin');

console.log(imc(80, 1.6));
```

Para testar, utilizando o ```node main.js``` obtêm-se o resultado ```imc(80, 1.6)```.

### 3.2 - Exportação múltipla

No caso de múltiplas funções de apoio, é preciso alterar um pouco a exportação. Continuando no arquivo citado acima, adicionou-se uma nova função, exportável, com o objetivo de calcular o quadrado de um número. Como demonstrado abaixo:

```
function quadrado(x){
    return x*x;
}
```

Para esse caso, é preciso alterar todas as exportações, criando um atributo dentro do objeto ```module.exports``` como demonstrado abaixo:

```
module.exports.imc = imc;
module.exports.quadrado = quadrado;
```

Após segmentar a exportação, é preciso atualizar a importação, onde agora o objeto vinculado ao ```require('')``` contém mais de um atributo, e precisa ser declarado, como mostrado abaixo:

```
const plugin = require('./plugin');

console.log(plugin.imc(70, 1.6));
console.log(plugin.quadrado(5));
```

Para manter o valor semântico da variável, o nome foi alterado de ```imc``` para ```plugin```, para que continue coerente com todas as funcionalidades apresentadas. E, com isso, o uso de cada módulo exportado muda para o nome do objeto, referência de objeto e o nome exportado do método, como demonstrado em ```plugin.imc(70, 1.6)``` ao invés do anterior ```imc(70, 1.6)```.

```
node main.js
27.343749999999996
25
```

Como demonstrado, ao executar múltiplas funções do arquivo ```plugin.js``` dentro do escopo de ```main.js```, o resultado foi o esperado.

### 3.3 - Utilização de módulos externos (pacotes)

Para utilitários extremamente comuns, é usual utilizar de bibliotecas prontas ao invés de reinventar a roda, tal método é tão comum, que já foi utilizado nesse tutorial, essa forma é conhecida como empacotamento, como no exemplo ```npm i moment```, para a utilização de funções dentro de códigos, ao invés de CLI, é utilizado:

```
const moment = require('moment');

console.log(moment().format());
```

E temos como resposta:

```
node main.js
2024-03-06T15:46:42-03:00
```

Demonstrando assim, que o módulo externo foi utilizado a partir de um arquivo JS.

### 3.4 - ECMAScript require e import

O uso de ```const plugin = require('plugin')``` se tornou obsoleto e foi substituído pro ```import { imc, quadrado } from 'plugin'``` para a conformidade com o ECMAScript entre o Node e CommonJS.

Por não fazer parte do caminho linear do curso, após um rápido timeboxing, decidiu-se por tornar pendente um estudo posterior, para dar sequência aos prazos já definidos no estudo ordinário.

## 4 - Gulp

Uma forma de executar atividades repetitivas de forma automática é criando scripts, uma forma simplificada de fazer isso é com o toolkit ```Gulp```.

Para utilizar o Gulp é preciso instalar o componente ```gulp-cli``` CLI primeiro como pacote global. Após isso é necessário instalar o pacote do Gulp local ```gulp```, e o pacote dos módulos usados na automação, abaixo tem as dependências do primeiro exemplo: ```gulp-sass```, e o ```node-sass``` ou ```sass``` que o ```gulp-sass```, como será visto no script posterior.

```
sudo npm i gulp-cli -g
npm i gulp
npm i gulp-sass
npm i node-sass
```

Para utilizar o gulp e criar a task, é necessário chamar os pacotes e colocar a lógica em um arquivo específico chamado ```gulpfile.js```, criar uma atividade com um nome na string do método ```task``` para identificá-la, caso tenha o nome ```default```, ao chamar o comando ```gulp``` essa função é executada por padrão.

### 4.1 - Primeira task na Gulp

Para introduzir as funcionalidades do Gulp foi reutilizado o conceito da seção 1, onde automatizou-se a compilação de código SASS para CSS, com um detalhe de pegar múltiplos arquivos, em múltiplas pastas, e transformar todos em um único, minificar, e colocar em um destino específico. Uma vez que as dependências locais já foram instaladas no passo anterior, para utilizá-las deve-se seguir o exemplo abaixo:

```
const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));

function sassCompile() {
    return gulp.src('css/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('css/'))
}

gulp.task('sass', sassCompile);
```

Após a execução da task escrita ```gulp sass```, tem-se como resultado o arquivo ```css/style.css``` na pasta destino requisitada.

### 4.2 - Gulp e o Autoprefixer

A utilização do ```autoprefixer``` é o começo do contexto de ```postcss```, que diferente do SASS, que gera o arquivo CSS a partir da semântica LESS ou SASS, faz operações periódicas após o CSS ser gerado.

O exemplo mencionado no curso apresenta múltiplos erros devido a atualizações de versões e convenções, como o problema de pacotes ES6 não serem distribuídos no código enquanto módulo e o autoprefixer requerer algo específico não trivialmente identificado, e após timeboxing foi suspenso pelo formato linear desse curso para atender os objetivos.

Antes da finalização do curso, será efetuada outra avaliação de uma forma de contornar tal problema, seja com a mudança total de pacote, ferramenta ou pesquisa intensiva para adaptação do código e cumprir com objetivo dessa atividade.

O script não gera erros, entretanto não obtêm-se o resultado esperado de adicionar os atributos de estilização para o web-kit. Há ainda uma pequena chance do exemplo de utilização gerada não ser mais necessário, e na verdade o problema com o gulp-autoprefixer já ter sido resolvido, e só ser um exemplo sem utilidade.

### 4.3 - Gulp Watch

A utilização do ```watch``` é uma forma de utilizar função única, funções sequenciais ou paralelas, utilizando como exemplo a compilação em SASS, ao invés de rodar manualmente a compilação, ao deixar a verificação dos arquivos ```.scss``` têm-se a compilação ao salvar qualquer um dos arquivos descritos na função. Isso também pode ser utilizado como forma de encadear arquivos JS, e outros usos como paralelamente comprimir imagens e afins.

Utilizando como base a mesma função de ```sassCompile```, o processo é feito em modo único ao passar diretamente no método como visto abaixo:

```
gulp.watch('css/scss/**/*.scss', sassCompile);
```

Ao utilizar ```gulp.series('sass', 'taskName')``` encadeando nome das tasks criadas em ```gulp.task``` tem-se a execução serial das tarefas, no uso do ```gulp.parallel('sass', 'taskName')``` tem-se o uso de execução paralela.

para a execução do conteúdo de ```gulp.watch()``` é necessário criar uma task e atribuí-la um nome, como visto abaixo.

```
function watch(){
  gulp.watch('css/scss/**/*.scss', sassCompile);
}

gulp.task('default', watch);
```