// =======================
// Estado Global do Jogo
// =======================

let estadoJogo = {
  equipeSelecionada: null,
  nivelFabrica: 70,
  dinheiro: 5000000, // Exemplo: 5 milhões
  pilotos: [],
  patrocinadores: [],
  scouting: [],
  eventosJornal: [],
  reputacaoEquipe: 50
};

let dadosJogo = {}; // Dados carregados do dados.json

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
// Carregamento de Dados do JSON
// =======================

async function carregarDados() {
  try {
    const resposta = await fetch("dados.json");
    dadosJogo = await resposta.json();
    console.log("✅ Dados carregados:", dadosJogo);
    inicializarEquipePadrao();
  } catch (erro) {
    console.error("❌ Erro ao carregar dados.json:", erro);
  }
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

// =======================
// Execução ao Carregar
// =======================

window.onload = () => {
  carregarDados(); // Carrega dados do JSON
  carregarJogo();  // Se houver save, carrega
};

function inicializarEquipePadrao() {
  if (dadosJogo.equipes && dadosJogo.equipes.length > 0) {
    const equipeInicial = dadosJogo.equipes[0];

    estadoJogo.equipeSelecionada = equipeInicial;
    localStorage.setItem("estadoJogo", JSON.stringify(estadoJogo));

    console.log("Equipe inicial definida:", equipeInicial);
  }
}
