
import './App.css';

function Apresentação() {
  return (
    <main className="pagina">
      <div className="cartao">
        <img
          src="/faculdade.png"
          alt="Prédio de uma faculdade"
          className="imagem-faculdade"
        />

        <h1>Pedro Nicoluci</h1>

        <h2>Curso: Análise e Desenvolvimento de Sistemas</h2>

        <p>Seja bem-vindo à nossa faculdade!</p>
      </div>
    </main>
  );
}

export default Apresentação;