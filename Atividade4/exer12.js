let livro = {
    titulo: "O Guia do Mochileiro das Galáxias",
    autor: "Douglas Adams",
    anoPublicacao: 1979,
    genero: "Ficção Científica"
};

const anoAtual = new Date().getFullYear();

livro.idadePublicacao = anoAtual - livro.anoPublicacao;

livro.genero = "Aventura";

console.log(livro)