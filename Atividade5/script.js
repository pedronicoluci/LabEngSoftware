const inputTarefa = document.getElementById("tarefa");
const botaoAdicionar = document.getElementById("adicionar");
const listaTarefas = document.getElementById("lista-tarefas");

function salvarTarefas() {

    const tarefas = [];

    const itens = listaTarefas.querySelectorAll("li");

    itens.forEach(function (item) {

        const texto = item.querySelector("span");
        const check = item.querySelector(".check-tarefa");

        tarefas.push({
            texto: texto.textContent,
            concluida: check.checked
        });

    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));

}

function criarTarefa(textoTarefa, concluida) {

    const novaTarefa = document.createElement("li");

    const check = document.createElement("input");
    check.type = "checkbox";
    check.className = "check-tarefa";
    check.checked = concluida;

    const texto = document.createElement("span");
    texto.textContent = textoTarefa;

    if (concluida) {
        texto.className = "tarefa-concluida";
    }

    check.addEventListener("change", function () {

        if (check.checked) {
            texto.className = "tarefa-concluida";
        } else {
            texto.className = "";
        }

        salvarTarefas();

    });

    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.className = "botao-editar";

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.className = "botao-excluir";

    botaoEditar.addEventListener("click", function () {

        const novoTexto = document.createElement("input");

        novoTexto.type = "text";
        novoTexto.value = texto.textContent;

        novaTarefa.replaceChild(novoTexto, texto);

        const botaoSalvar = document.createElement("button");
        botaoSalvar.textContent = "Salvar";
        botaoSalvar.className = "botao-salvar";

        novaTarefa.replaceChild(botaoSalvar, botaoEditar);

        function salvarEdicao() {

            if (novoTexto.value != "") {

                texto.textContent = novoTexto.value;

                novaTarefa.replaceChild(texto, novoTexto);
                novaTarefa.replaceChild(botaoEditar, botaoSalvar);

                salvarTarefas();

            }

        }

        botaoSalvar.addEventListener("click", salvarEdicao);

        novoTexto.addEventListener("keydown", function (event) {

            if (event.key == "Enter") {
                salvarEdicao();
            }

        });

    });

    botaoExcluir.addEventListener("click", function () {

        novaTarefa.remove();
        salvarTarefas();

    });

    novaTarefa.appendChild(check);
    novaTarefa.appendChild(texto);
    novaTarefa.appendChild(botaoEditar);
    novaTarefa.appendChild(botaoExcluir);

    listaTarefas.appendChild(novaTarefa);

}

function adicionarTarefa() {

    const textoTarefa = inputTarefa.value;

    if (textoTarefa != "") {

        criarTarefa(textoTarefa, false);

        salvarTarefas();

        inputTarefa.value = "";

    }

}

function carregarTarefas() {

    const tarefasSalvas = localStorage.getItem("tarefas");

    if (tarefasSalvas != null) {

        const tarefas = JSON.parse(tarefasSalvas);

        tarefas.forEach(function (tarefa) {

            criarTarefa(tarefa.texto, tarefa.concluida);

        });

    }

}

botaoAdicionar.addEventListener("click", adicionarTarefa);

inputTarefa.addEventListener("keydown", function (event) {

    if (event.key == "Enter") {
        adicionarTarefa();
    }

});

carregarTarefas();