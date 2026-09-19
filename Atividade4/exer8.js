let produto = {
    preco: 10,
    qtde: 2
};

let valorTotal = produto.preco * produto.qtde;

console.log(`O valor total da compra será de: R$ ${valorTotal.toFixed(2)}`);