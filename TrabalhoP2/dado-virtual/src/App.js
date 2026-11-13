import React, { useState } from 'react';
import './App.css';


function tocarSom() {
  const AudioContext =
    window.AudioContext || window.webkitAudioContext;

  const audio = new AudioContext();

  const duracao = 0.35;
  const tamanho = audio.sampleRate * duracao;

  const buffer = audio.createBuffer(1, tamanho, audio.sampleRate);
  const canal = buffer.getChannelData(0);

  for (let i = 0; i < tamanho; i++) {
    canal[i] = (Math.random() * 2 - 1) * 0.5;
  }

  const fonte = audio.createBufferSource();
  fonte.buffer = buffer;

  const volume = audio.createGain();
  volume.gain.setValueAtTime(0.18, audio.currentTime);
  volume.gain.exponentialRampToValueAtTime(
    0.001,
    audio.currentTime + duracao
  );

  fonte.connect(volume);
  volume.connect(audio.destination);

  fonte.start();
  fonte.stop(audio.currentTime + duracao);

  fonte.onended = () => audio.close();
}

function App() {
  const [numero, setNumero] = useState(1);
  const [lancamentos, setLancamentos] = useState(0);
  const [girando, setGirando] = useState(false);

  const pontos = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8]
  };

  function jogarDado() {
    if (girando) return;

    setGirando(true);
    tocarSom();

    setTimeout(() => {
      const resultado = Math.floor(Math.random() * 6) + 1;

      setNumero(resultado);
      setLancamentos(lancamentos + 1);
      setGirando(false);
    }, 700);
  }

  function reiniciar() {
    setNumero(1);
    setLancamentos(0);
    setGirando(false);
  }

  return (
    <div className="mesa">
      <div className="cartao">
        <p className="subtitulo">✦ THE ROYAL CASINO ✦</p>

        <h1>DADO DA SORTE</h1>

        <p className="descricao">
          Faça seu lançamento e teste sua sorte!
        </p>

        <div className="area-dado">
          <div className={`dado ${girando ? 'girando' : ''}`}>
            {pontos[numero].map((ponto, index) => (
              <span
                key={index}
                className="ponto"
                style={{ gridArea: `${Math.floor(ponto / 3) + 1} / ${(ponto % 3) + 1}` }}
              />
            ))}
          </div>
        </div>

        <button
          className="botao-jogar"
          onClick={jogarDado}
          disabled={girando}
        >
          {girando ? 'LANÇANDO...' : 'LANÇAR DADO'}
        </button>

        <p className="contador">
          LANÇAMENTOS: {lancamentos}
        </p>

        <button className="botao-reset" onClick={reiniciar}>
          Reiniciar partida
        </button>

        <p className="rodape">LAS VEGAS • EST. 1960</p>
      </div>
    </div>
  );
}

export default App;