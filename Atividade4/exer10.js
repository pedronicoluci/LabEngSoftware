let livro = {
    titulo: "O Guia do Mochileiro das Galáxias",
    autor: "Douglas Adams",
    anoPublicacao: 1979,
    genero: "Ficção Científica"
};

const anoAtual = new Date().getFullYear();

livro.idadePublicacao = anoAtual - livro.anoPublicacao;

let mostrarDetalhes = `Título: ${livro.titulo}, Autor: ${livro.autor}, Ano de publicação: ${livro.anoPublicacao}, Gênero: ${livro.genero}, Idade da publicação: ${livro.idadePublicacao} anos.`;

console.log(mostrarDetalhes);