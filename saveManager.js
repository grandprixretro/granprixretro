function loadGameData() {
  const data = localStorage.getItem("savegame");
  return data ? JSON.parse(data) : null;
}

function saveGameData(data) {
  localStorage.setItem("savegame", JSON.stringify(data));
}

// Torna as funções acessíveis globalmente
window.loadGameData = loadGameData;
window.saveGameData = saveGameData;
