import React, { useState } from 'react';
import './App.css';

function App() {
  const [pessoas, setPessoas] = useState(0);

  function adicionarPessoa() {
    setPessoas(pessoas + 1);
  }

  function removerPessoa() {
    if (pessoas > 0) {
      setPessoas(pessoas - 1);
    }
  }

  function zerarContador() {
    setPessoas(0);
  }

  return (
    <main className="container">
      <div className="contador">
        <h1>Contador de Pessoas</h1>

        <div className="numero">{pessoas}</div>

        <p>
          {pessoas === 1 ? 'pessoa registrada' : 'pessoas registradas'}
        </p>

        <div className="botoes">
          <button className="remover" onClick={removerPessoa}>
            −
          </button>

          <button className="adicionar" onClick={adicionarPessoa}>
            +
          </button>
        </div>

        <button className="zerar" onClick={zerarContador}>
          Zerar contador
        </button>
      </div>
    </main>
  );
}

export default App;