let jogo = {};

async function startNewGame() {
  const template = await fetch("data/templates.json").then(res => res.json());
  jogo = template;

  saveGame(jogo);
  alert("Novo jogo iniciado!");
}

function loadGame() {
  const save = loadGameData();
  if (save) {
    jogo = save;
    alert("Jogo carregado com sucesso!");
  } else {
    alert("Nenhum jogo salvo encontrado.");
  }
}

function irPara(pagina) {
  const save = loadGameData();
  if (!save) {
    alert("Você precisa iniciar ou carregar um jogo.");
    return;
  }
  window.location.href = pagina;
}
