function saveGame(dados) {
  localStorage.setItem("gpmretro_save", JSON.stringify(dados));
}

function loadGameData() {
  const data = localStorage.getItem("gpmretro_save");
  return data ? JSON.parse(data) : null;
}
