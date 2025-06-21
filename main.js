let jogo = {};

async function loadEquipes() {
  const data = await fetch("data/equipes.json").then(r => r.json());
  const container = document.getElementById("equipes");
  data.forEach(eq => {
    const div = document.createElement("div");
    div.className = "equipe-card";
    div.innerHTML = `
      <img src="${eq.logo}" alt="${eq.nome}">
      <p><strong>${eq.nome}</strong></p>
      <p>${eq.motor}</p>
      <button onclick="escolherEquipe('${eq.nome}')">Selecionar</button>
    `;
    container.appendChild(div);
  });
}

async function escolherEquipe(nomeEquipe) {
  const equipes = await fetch("data/equipes.json").then(r => r.json());
  const pilotos = await fetch("data/pilotos.json").then(r => r.json());

  const equipe = equipes.find(e => e.nome === nomeEquipe);
  const titulares = pilotos.filter(p => p.equipe === nomeEquipe).slice(0, 2);

  jogo = {
    dinheiro: 5000000,
    equipe: equipe.nome,
    motor: equipe.motor,
    logo: equipe.logo,
    pilotos: titulares.map(p => p.nome),
    patrocinadores: [],
    fabrica: { nota: 5.0, investimento: 0 },
    reputacao: 50,
    temporada: 1994,
    progresso: { corridaAtual: 1 }
  };

  saveGame(jogo);
  alert(`Você agora está no comando da ${nomeEquipe}!`);
  location.href = "index.html";
}

window.onload = () => {
  if (document.getElementById("equipes")) {
    loadEquipes();
  }
}
