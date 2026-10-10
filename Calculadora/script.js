let numeroAtual = "0";
let numeroAnterior = null;
let operacao = null;
let resultadoMostrado = false;
let aguardandoNumero = false;

function corrigirPrecisao(numero) {
    if (!Number.isFinite(numero)) {
        return numero;
    }
    return Number(numero.toPrecision(12));
}

function atualizarVisor() {
    const visor = document.getElementById("visor");
    const tela = document.querySelector(".tela");
    const status = document.querySelector(".status");
    const erro = numeroAtual === "Erro";
    visor.textContent = numeroAtual.replace(".", ",");
    tela.classList.toggle("erro", erro);
    status.textContent = erro ? "SYSTEM ERROR" : "SYSTEM READY";
    ajustarFonteVisor();
}

function ajustarFonteVisor() {
    const visor = document.getElementById("visor");
    const medidor = document.createElement("span");
    medidor.textContent = visor.textContent;
    medidor.style.position = "absolute";
    medidor.style.visibility = "hidden";
    medidor.style.whiteSpace = "nowrap";
    medidor.style.fontFamily = "'VT323', monospace";
    medidor.style.letterSpacing = "3px";
    document.body.appendChild(medidor);
    let tamanho = window.innerWidth <= 600 ? 3.5 : 4.5;
    const larguraMaxima = visor.clientWidth - 4;
    medidor.style.fontSize = tamanho + "rem";
    while (medidor.getBoundingClientRect().width > larguraMaxima && tamanho > 1) {
        tamanho = Math.max(1, tamanho - 0.1);
        medidor.style.fontSize = tamanho + "rem";
    }
    visor.style.fontSize = tamanho + "rem";
    medidor.remove();
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
    if (resultadoMostrado || aguardandoNumero || numeroAtual === "Erro") {
        numeroAtual = numero;
        resultadoMostrado = false;
        aguardandoNumero = false;
        if (operacao === null) {
            atualizarHistorico("");
        }
    } else if (numeroAtual === "0") {
        numeroAtual = numero;
    } else {
        numeroAtual += numero;
    }
    atualizarVisor();
}

function adicionarDecimal() {
    if (resultadoMostrado || aguardandoNumero || numeroAtual === "Erro") {
        numeroAtual = "0.";
        resultadoMostrado = false;
        aguardandoNumero = false;
        if (operacao === null) {
            atualizarHistorico("");
        }
    } else if (!numeroAtual.includes(".")) {
        numeroAtual += ".";
    }
    atualizarVisor();
}

function limpar() {
    numeroAtual = "0";
    numeroAnterior = null;
    operacao = null;
    resultadoMostrado = false;
    aguardandoNumero = false;
    atualizarHistorico("");
    atualizarVisor();
}

function inverterSinal() {
    if (numeroAtual === "Erro") {
        return;
    }
    numeroAtual = String(corrigirPrecisao(Number(numeroAtual) * -1));
    atualizarVisor();
}

function porcentagem() {
    if (numeroAtual === "Erro") {
        return;
    }
    let valor = Number(numeroAtual);
    if (numeroAnterior !== null && (operacao === "+" || operacao === "-")) {
        valor = numeroAnterior * valor / 100;
    } else {
        valor = valor / 100;
    }
    numeroAtual = String(corrigirPrecisao(valor));
    resultadoMostrado = false;
    aguardandoNumero = false;
    atualizarVisor();
}

function executarOperacao(primeiroNumero, segundoNumero, op) {
    let resultado;
    switch (op) {
        case "+":
            resultado = primeiroNumero + segundoNumero;
            break;
        case "-":
            resultado = primeiroNumero - segundoNumero;
            break;
        case "*":
            resultado = primeiroNumero * segundoNumero;
            break;
        case "/":
            if (segundoNumero === 0) {
                return null;
            }
            resultado = primeiroNumero / segundoNumero;
            break;
        default:
            return null;
    }
    return corrigirPrecisao(resultado);
}

function selecionarOperacao(op) {
    if (numeroAtual === "Erro") {
        return;
    }
    if (operacao !== null && !aguardandoNumero) {
        const resultado = executarOperacao(numeroAnterior, Number(numeroAtual), operacao);
        if (resultado === null) {
            numeroAtual = "Erro";
            numeroAnterior = null;
            operacao = null;
            aguardandoNumero = false;
            resultadoMostrado = true;
            atualizarHistorico("");
            atualizarVisor();
            return;
        }
        numeroAtual = String(resultado);
        numeroAnterior = resultado;
    } else if (operacao === null) {
        numeroAnterior = Number(numeroAtual);
    }
    operacao = op;
    aguardandoNumero = true;
    resultadoMostrado = false;
    atualizarHistorico(
        String(numeroAnterior).replace(".", ",") +
        " " +
        simboloOperacao(op)
    );
    atualizarVisor();
}

function calcular() {
    if (numeroAnterior === null || operacao === null || aguardandoNumero) {
        return;
    }
    const segundoNumero = Number(numeroAtual);
    const resultado = executarOperacao(numeroAnterior, segundoNumero, operacao);
    atualizarHistorico(
        String(numeroAnterior).replace(".", ",") +
        " " +
        simboloOperacao(operacao) +
        " " +
        String(segundoNumero).replace(".", ",")
    );
    numeroAtual = resultado === null ? "Erro" : String(resultado);
    numeroAnterior = null;
    operacao = null;
    aguardandoNumero = false;
    resultadoMostrado = true;
    atualizarVisor();
}

document.fonts.ready.then(() => {
    ajustarFonteVisor();
});
window.addEventListener("resize", ajustarFonteVisor);