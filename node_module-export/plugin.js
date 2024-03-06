function imc(peso, altura) {
    return peso / (altura * altura);
}

function quadrado(x) {
    return x * x;
}

module.exports.imc = imc;
module.exports.quadrado = quadrado;