import React, { useState } from 'react';
import './App.css';

const produtos = [
  {
    id: 1,
    nome: 'Escapamento Esportivo',
    categoria: 'Escapamentos',
    preco: 459.90,
    imagem: '/imagens/escapamento.webp'
  },
  {
    id: 2,
    nome: 'Guidão Custom',
    categoria: 'Guidões',
    preco: 189.90,
    imagem: '/imagens/guidao.jpg'
  },
  {
    id: 3,
    nome: 'Filtro de Ar Esportivo',
    categoria: 'Filtros',
    preco: 89.90,
    imagem: '/imagens/filtro-ar.webp'
  },
  {
    id: 4,
    nome: 'Pneu Dianteiro',
    categoria: 'Pneus',
    preco: 349.90,
    imagem: '/imagens/pneu-dianteiro.webp'
  },
  {
    id: 5,
    nome: 'Pneu Traseiro',
    categoria: 'Pneus',
    preco: 429.90,
    imagem: '/imagens/pneu-traseiro.webp'
  },
  {
    id: 6,
    nome: 'Retrovisores Esportivos',
    categoria: 'Acessórios',
    preco: 119.90,
    imagem: '/imagens/retrovisores.webp'
  },
  {
    id: 7,
    nome: 'Manoplas Custom',
    categoria: 'Acessórios',
    preco: 69.90,
    imagem: '/imagens/manoplas.webp'
  },
  {
    id: 8,
    nome: 'Farol LED',
    categoria: 'Iluminação',
    preco: 159.90,
    imagem: '/imagens/farol-led.webp'
  }
];

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function Produto({ produto, adicionarAoCarrinho }) {
  return (
    <div className="produto-card">
      <div className="produto-imagem">
        <img src={produto.imagem} alt={produto.nome} />
      </div>

      <div className="produto-info">
        <span className="produto-categoria">
          {produto.categoria}
        </span>

        <h3>{produto.nome}</h3>

        <p className="produto-preco">
          {formatarPreco(produto.preco)}
        </p>

        <button
          className="botao-adicionar"
          onClick={() => adicionarAoCarrinho(produto)}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}

function ItemCarrinho({
  item,
  alterarQuantidade,
  removerProduto
}) {
  return (
    <div className="carrinho-item">
      <div className="carrinho-item-info">
        <h4>{item.nome}</h4>

        <p>{formatarPreco(item.preco)}</p>
      </div>

      <div className="controle-quantidade">
        <button onClick={() => alterarQuantidade(item.id, -1)}>
          -
        </button>

        <span>{item.quantidade}</span>

        <button onClick={() => alterarQuantidade(item.id, 1)}>
          +
        </button>
      </div>

      <div className="carrinho-item-total">
        {formatarPreco(item.preco * item.quantidade)}
      </div>

      <button
        className="botao-remover"
        onClick={() => removerProduto(item.id)}
      >
        Remover
      </button>
    </div>
  );
}

function App() {
  const [carrinho, setCarrinho] = useState([]);

  function adicionarAoCarrinho(produto) {
    const produtoExistente = carrinho.find(
      (item) => item.id === produto.id
    );

    if (produtoExistente) {
      setCarrinho(
        carrinho.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      setCarrinho([
        ...carrinho,
        { ...produto, quantidade: 1 }
      ]);
    }
  }

  function alterarQuantidade(id, variacao) {
    const novoCarrinho = carrinho
      .map((item) =>
        item.id === id
          ? { ...item, quantidade: item.quantidade + variacao }
          : item
      )
      .filter((item) => item.quantidade > 0);

    setCarrinho(novoCarrinho);
  }

  function removerProduto(id) {
    setCarrinho(
      carrinho.filter((item) => item.id !== id)
    );
  }

  const quantidadeTotal = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  const valorTotal = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  return (
    <div className="app">
      <header className="cabecalho">
        <div className="logo">
          <h1>MotoParts <span>Garage</span></h1>
          <p>Peças e acessórios para sua motocicleta</p>
        </div>

        <div className="resumo-cabecalho">
          <span>🛒 {quantidadeTotal} item(ns)</span>
          <strong>{formatarPreco(valorTotal)}</strong>
        </div>
      </header>

      <main className="conteudo">
        <section className="catalogo">
          <div className="titulo-secao">
            <h2>Nossos produtos</h2>
            <p>Confira nossa seleção de peças e acessórios.</p>
          </div>

          <div className="produtos-grid">
            {produtos.map((produto) => (
              <Produto
                key={produto.id}
                produto={produto}
                adicionarAoCarrinho={adicionarAoCarrinho}
              />
            ))}
          </div>
        </section>

        <section className="carrinho">
          <div className="titulo-secao">
            <h2>Seu carrinho</h2>
            <p>Revise os produtos selecionados.</p>
          </div>

          {carrinho.length === 0 ? (
            <div className="carrinho-vazio">
              <p>Seu carrinho está vazio.</p>
              <span>Adicione produtos para começar sua compra.</span>
            </div>
          ) : (
            <>
              <div className="carrinho-lista">
                {carrinho.map((item) => (
                  <ItemCarrinho
                    key={item.id}
                    item={item}
                    alterarQuantidade={alterarQuantidade}
                    removerProduto={removerProduto}
                  />
                ))}
              </div>

              <div className="carrinho-resumo">
                <div>
                  <span>Total de itens:</span>
                  <strong>{quantidadeTotal}</strong>
                </div>

                <div className="valor-final">
                  <span>Valor total:</span>
                  <strong>{formatarPreco(valorTotal)}</strong>
                </div>
              </div>
            </>
          )}
        </section>
      </main>

      <footer className="rodape">
        <p>© 2026 MotoParts Garage - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;