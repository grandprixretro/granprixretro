function saveGame(dados) {
  localStorage.setItem("gpmretro_save", JSON.stringify(dados));
}

function loadGameData() {
  const data = localStorage.getItem("gpmretro_save");
  return data ? JSON.parse(data) : null;
}

function saveClassificacao(classificacao) {
  localStorage.setItem("gpmretro_classificacao", JSON.stringify(classificacao));
}

function loadClassificacao() {
  const data = localStorage.getItem("gpmretro_classificacao");
  return data ? JSON.parse(data) : { pilotos: [], equipes: [] };
}
