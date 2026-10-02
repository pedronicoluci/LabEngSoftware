let numeroAtual = "0";
let numeroAnterior = null;
let operacao = null;
let resultadoMostrado = false;


function atualizarVisor() {
    document.getElementById("visor").textContent =
        numeroAtual.replace(".", ",");
}


function atualizarHistorico(texto) {
    document.getElementById("historico").textContent = texto;
}


function simboloOperacao(op) {

    switch (op) {

        case "+":
            return "+";

        case "-":
            return "-";

        case "*":
            return "×";

        case "/":
            return "÷";

        default:
            return "";
    }
}


function adicionarNumero(numero) {

    if (resultadoMostrado) {

        numeroAtual = numero;
        resultadoMostrado = false;

        atualizarHistorico("");
    }

    else if (numeroAtual === "0") {
        numeroAtual = numero;
    }

    else {
        numeroAtual += numero;
    }

    atualizarVisor();
}


function adicionarDecimal() {

    if (resultadoMostrado) {

        numeroAtual = "0.";
        resultadoMostrado = false;

        atualizarHistorico("");
    }

    else if (!numeroAtual.includes(".")) {
        numeroAtual += ".";
    }

    atualizarVisor();
}


function limpar() {

    numeroAtual = "0";
    numeroAnterior = null;
    operacao = null;
    resultadoMostrado = false;

    atualizarHistorico("");
    atualizarVisor();
}


function inverterSinal() {

    if (numeroAtual !== "0") {
        numeroAtual = String(Number(numeroAtual) * -1);
    }

    atualizarVisor();
}


function porcentagem() {

    numeroAtual = String(Number(numeroAtual) / 100);

    atualizarVisor();
}


function selecionarOperacao(op) {

    numeroAnterior = Number(numeroAtual);

    operacao = op;

    atualizarHistorico(
        numeroAtual.replace(".", ",") +
        " " +
        simboloOperacao(op)
    );

    numeroAtual = "0";

    resultadoMostrado = false;

    atualizarVisor();
}


function calcular() {

    if (numeroAnterior === null || operacao === null) {
        return;
    }

    let segundoNumero = Number(numeroAtual);
    let resultado;

    switch (operacao) {

        case "+":
            resultado = numeroAnterior + segundoNumero;
            break;

        case "-":
            resultado = numeroAnterior - segundoNumero;
            break;

        case "*":
            resultado = numeroAnterior * segundoNumero;
            break;

        case "/":

            if (segundoNumero === 0) {

                atualizarHistorico(
                    numeroAnterior +
                    " ÷ " +
                    segundoNumero
                );

                numeroAtual = "Erro";

                numeroAnterior = null;
                operacao = null;
                resultadoMostrado = true;

                atualizarVisor();

                return;
            }

            resultado = numeroAnterior / segundoNumero;
            break;
    }

    atualizarHistorico(
        String(numeroAnterior).replace(".", ",") +
        " " +
        simboloOperacao(operacao) +
        " " +
        String(segundoNumero).replace(".", ",")
    );

    numeroAtual = String(resultado);

    numeroAnterior = null;
    operacao = null;

    resultadoMostrado = true;

    atualizarVisor();
    }