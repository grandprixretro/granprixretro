let jogo = {};

// Salva os dados e redireciona ao menu principal
async function escolherEquipe(nomeEquipe) {
  const equipes = await fetch("data/equipes.json").then(r => r.json());
  const pilotos = await fetch("data/pilotos.json").then(r => r.json());
  const patrocinadores = await fetch("data/patrocinadores.json").then(r => r.json());

  const equipe = equipes.find(e => e.nome === nomeEquipe);
  const titulares = pilotos.filter(p => p.equipe === nomeEquipe).slice(0, 2);

  let patrocinadoresIniciais = [];
  let dinheiroInicial = 5000000;

  patrocinadores.forEach(p => {
    if (p.principal) {
      if (
        (p.nome === "Rothmans" && nomeEquipe === "Williams") ||
        (p.nome === "Mild Seven" && nomeEquipe === "Benetton") ||
        (p.nome === "Marlboro" && (nomeEquipe === "Ferrari" || nomeEquipe === "McLaren")) ||
        (p.nome === "Sasol" && nomeEquipe === "Jordan")
      ) {
        patrocinadoresIniciais.push(p.nome);
        dinheiroInicial += p.bonus;
      }
    }
  });

  jogo = {
    dinheiro: dinheiroInicial,
    equipe: equipe.nome,
    motor: equipe.motor,
    logo: equipe.logo,
    pilotos: titulares.map(p => p.nome),
    patrocinadores: patrocinadoresIniciais,
    patrocinadoresGlobais: patrocinadoresIniciais,
    fabrica: { nota: 5.0, investimento: 0 },
    reputacao: 50,
    temporada: 1994,
    progresso: { corridaAtual: 1 }
  };

  saveGame(jogo);
  alert(`Você agora está no comando da ${nomeEquipe}!`);
  location.href = "menu-principal.html";
}

// Função do botão "Voltar"
window.onload = () => {
  const voltarBtn = document.getElementById("btn-voltar");
  if (voltarBtn) {
    voltarBtn.onclick = () => {
      window.location.href = "index.html";
    };
  }
};

// Torna a função acessível globalmente
window.escolherEquipe = escolherEquipe;
