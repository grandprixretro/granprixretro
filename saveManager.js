// saveManager.js - versão compatível com os arquivos atuais
function loadGameData() {
  const data = localStorage.getItem("savegame");
  return data ? JSON.parse(data) : null;
}

function saveGameData(data) {
  localStorage.setItem("savegame", JSON.stringify(data));
}

window.loadGameData = loadGameData;
window.saveGameData = saveGameData;
