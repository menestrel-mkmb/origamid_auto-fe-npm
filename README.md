# Automação de frontend com npm
O objetivo desse curso é aprender algumas ferramentas de introdução em CI/CD ao automatizar utilizando scripts e aumentar a produtividade de programação sem a utilização de frameworks.

[Link para o curso](https://www.origamid.com/curso/automacao-front-end-com-npm)

## Pacotes local vs. global

Para a utilização de pacotes que contenham binários há 2 opções, utilizar o arquivo dentro de node_modules/.bin ou instalar o pacote globalmente.

Exemplo:

```./node_modules/.bin/uglifyjs clipboard.js -c -m -o ./clipboard.min.js```

Gera o arquivo minificado, retirando espaços, comentários e encurtando variáveis de escopo.