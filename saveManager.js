// saveManager.js - versão corrigida
function loadGameData() {
  const data = localStorage.getItem("gpmretro_save");
  return data ? JSON.parse(data) : null;
}

function saveGameData(data) {
  localStorage.setItem("gpmretro_save", JSON.stringify(data));
}

window.loadGameData = loadGameData;
window.saveGameData = saveGameData;
