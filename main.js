// =======================
// Estado Global do Jogo
// =======================

let estadoJogo = {
  equipeSelecionada: null,
  nivelFabrica: 70,
  dinheiro: 5000000, // 5 milhões como exemplo
  pilotos: [],
  patrocinadores: [],
  scouting: [],
  eventosJornal: [],
  reputacaoEquipe: 50
};

// =======================
// Funções de Salvamento
// =======================

function salvarJogo() {
  localStorage.setItem("estadoJogo", JSON.stringify(estadoJogo));
  alert("Jogo salvo com sucesso!");
}

function carregarJogo() {
  const dados = localStorage.getItem("estadoJogo");
  if (dados) {
    estadoJogo = JSON.parse(dados);
    return true;
  }
  return false;
}

function resetarJogo() {
  if (confirm("Tem certeza que deseja resetar o jogo?")) {
    localStorage.removeItem("estadoJogo");
    location.reload();
  }
}

// =======================
// Utilitários Globais
// =======================

function atualizarDinheiro(valor) {
  estadoJogo.dinheiro += valor;
  const el = document.getElementById("dinheiroAtual");
  if (el) el.textContent = `💰 Dinheiro: $${estadoJogo.dinheiro.toLocaleString()}`;
}

function selecionarEquipe(equipe) {
  estadoJogo.equipeSelecionada = equipe;
  salvarJogo();
  window.location.href = "gerenciamento.html";
}

function mostrarEquipeNaTela() {
  const equipe = estadoJogo.equipeSelecionada;
  if (equipe) {
    document.getElementById("tituloEquipe").textContent = `Equipe: ${equipe.nome}`;
    document.getElementById("infoMotor").textContent = `Motor: ${equipe.motor}`;
    document.getElementById("infoPais").textContent = `País: ${equipe.pais}`;
  } else {
    document.getElementById("tituloEquipe").textContent = "Nenhuma equipe selecionada.";
  }
}
