let pessoa = {
    nome: "Pedro",
    idade: 29,
    profissao: "Analista de Processos"
};

function mostrarDados(pessoa) {
    return `Olá! Meu nome é ${pessoa.nome}, tenho ${pessoa.idade} anos e minha profissão é ${pessoa.profissao}.`;
}

console.log(mostrarDados(pessoa));