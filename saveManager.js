function saveGame(dados) {
  localStorage.setItem("gpmretro_save", JSON.stringify(dados));
}

function loadGameData() {
  const data = localStorage.getItem("gpmretro_save");
  if (!data) return null;

  const jogo = JSON.parse(data);

  // Atualização da estrutura para patrocinadores separados
  if (Array.isArray(jogo.patrocinadores)) {
    jogo.patrocinadores = {
      alto: [],
      medio: [],
      baixo: [...jogo.patrocinadores]
    };
  } else if (!jogo.patrocinadores || typeof jogo.patrocinadores !== "object") {
    jogo.patrocinadores = {
      alto: [],
      medio: [],
      baixo: []
    };
  }

  return jogo;
}
