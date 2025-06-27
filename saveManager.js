function saveGame(dados) {
  localStorage.setItem("gpmretro_save", JSON.stringify(dados));
}

function loadGameData() {
  const data = localStorage.getItem("gpmretro_save");
  if (!data) return null;

  const jogo = JSON.parse(data);

  // 🔁 Atualiza saves antigos que usavam array simples de patrocinadores
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

  // ✅ Garante que existe o campo de contratos com duração
  if (!jogo.contratosPatrocinadores || typeof jogo.contratosPatrocinadores !== "object") {
    jogo.contratosPatrocinadores = {};
  }

  return jogo;
}

function saveClassificacao(classificacao) {
  localStorage.setItem("gpmretro_classificacao", JSON.stringify(classificacao));
}

function loadClassificacao() {
  const data = localStorage.getItem("gpmretro_classificacao");
  return data ? JSON.parse(data) : { pilotos: [], equipes: [] };
}

  const data = localStorage.getItem("gpmretro_classificacao");
  return data ? JSON.parse(data) : { pilotos: [], equipes: [] };
}
