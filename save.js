// save.js

const estadoJogo = {
  equipe: "",
  pilotos: [],
  nivelFabrica: 70,
  patrocinadores: [],
  progressoCampeonato: 0,
  jornalRetro: [],
  scouting: [],
  temporadaAtual: 1994,
  dinheiro: 10000000 // 10 milhões para começar
};

function salvarJogo() {
  localStorage.setItem("GPMRETRO_SAVE", JSON.stringify(estadoJogo));
  alert("✅ Jogo salvo com sucesso!");
}

function carregarJogo() {
  const dadosSalvos = localStorage.getItem("GPMRETRO_SAVE");
  if (dadosSalvos) {
    Object.assign(estadoJogo, JSON.parse(dadosSalvos));
    console.log("🎮 Jogo carregado:", estadoJogo);
    return true;
  }
  return false;
}

function resetarJogo() {
  localStorage.removeItem("GPMRETRO_SAVE");
  alert("🔄 Jogo resetado!");
  location.reload();
}
