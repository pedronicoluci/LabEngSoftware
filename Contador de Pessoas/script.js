
let machos = 0;
let femeas = 0;

function atualizarContadores() {
    document.getElementById("machos").textContent = machos;
    document.getElementById("femeas").textContent = femeas;
    document.getElementById("total").textContent = machos + femeas;
}

function aumentar(categoria) {
    if (categoria === "machos") {
        machos++;
    } else if (categoria === "femeas") {
        femeas++;
    }
    atualizarContadores();
}

function diminuir(categoria) {
    if (categoria === "machos" && machos > 0) {
        machos--;
    } else if (categoria === "femeas" && femeas > 0) {
        femeas--;
    }
    atualizarContadores();
}

function reiniciar() {
    machos = 0;
    femeas = 0;
    atualizarContadores();
}
