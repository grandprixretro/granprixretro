document.addEventListener('DOMContentLoaded', () => {
  const botaoIniciar = document.getElementById('btnIniciar');
  const status = document.getElementById('status');

  botaoIniciar.addEventListener('click', () => {
    status.textContent = '🔧 Carregando dados das equipes...';

    // Simulação de delay de carregamento
    setTimeout(() => {
      const equipes = [
        'Williams-Renault',
        'Benetton-Ford',
        'Ferrari',
        'McLaren-Peugeot',
        'Jordan-Hart',
        'Ligier-Renault',
        'Sauber-Mercedes',
        'Lotus-Mugen'
      ];

      let selecao = '🏁 Selecione sua equipe:\n';
      equipes.forEach((equipe, index) => {
        selecao += `${index + 1}. ${equipe}\n`;
      });

      const escolha = prompt(selecao);
      const indice = parseInt(escolha) - 1;

      if (indice >= 0 && indice < equipes.length) {
        const equipeSelecionada = equipes[indice];
        status.innerHTML = `✅ Equipe selecionada: <strong>${equipeSelecionada}</strong><br>Simulando primeira corrida...`;

        // Simulação da corrida com resultado aleatório
        setTimeout(() => {
          const posicao = Math.floor(Math.random() * 10) + 1;
          status.innerHTML += `<br>🏎️ Resultado: sua equipe chegou em <strong>${posicao}º</strong> lugar!`;
        }, 2000);
      } else {
        status.textContent = '❌ Seleção inválida.';
      }
    }, 1000);
  });
});
