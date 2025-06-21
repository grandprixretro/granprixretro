// Estado inicial do jogo (caso não haja save anterior)
let estadoJogo = {
  nivelFabrica: 70,
  dinheiro: 1000000, // valor inicial em dólares
  pilotos: [],
  patrocinadores: [],
  scouting: [],
  eventosLidos: []
};

// Salvar jogo no localStorage
function salvarJogo() {
  localStorage.setItem("estadoJogo", JSON.stringify(estadoJogo));
  alert("Jogo salvo com sucesso!");
}

// Carregar jogo do localStorage
function carregarJogo() {
  const dadosSalvos = localStorage.getItem("estadoJogo");
  if (dadosSalvos) {
    estadoJogo = JSON.parse(dadosSalvos);
    return estadoJogo;
  }
  return null;
}

// Resetar jogo completamente
function resetarJogo() {
  if (confirm("Tem certeza que deseja resetar todo o jogo?")) {
    localStorage.removeItem("estadoJogo");
    location.reload();
  }
}
