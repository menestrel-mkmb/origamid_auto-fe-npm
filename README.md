# Automação de frontend com npm
O objetivo desse curso é aprender algumas ferramentas de introdução em CI/CD ao automatizar utilizando scripts e aumentar a produtividade de programação sem a utilização de frameworks.

[Link para o curso](https://www.origamid.com/curso/automacao-front-end-com-npm)

## 1 - Pacotes local vs. global

Para a utilização de pacotes que contenham binários há 2 opções: pacote local ou o pacote globalmente.

### 1.1 - Pacote local

Para utilizar o binário local, é precisso instalar o pacote o arquivo dentro de node_modules/.bin

Exemplo:

```
npm i ugilifyjs
./node_modules/.bin/uglify clipboard.js -c -m -o ./clipboard.min.js
```

Gera o arquivo minificado, retirando espaços, comentários e encurtando variáveis de escopo.

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

## 2.1 - Outro exemplo de script

Para reforçar o exemplo de script, utilizou-se o SASS, pelo pacote ```node-sass```, para que gerasse o arquivo ```style.css``` resultante a partir do arquivo ```style.scss```, conforme exemplo abaixo:

```
npm i node-sass
./node_modules/.bin/node-sass style.scss style.css
```