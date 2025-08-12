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

//
// Compatibilidade: algumas páginas antigas ainda chamam `saveGame` em vez de
// `saveGameData`. Para evitar erros, definimos `saveGame` como um alias
// simples que delega para `saveGameData`. No futuro, prefira sempre
// utilizar `saveGameData` diretamente.
function saveGame(data) {
  return saveGameData(data);
}

window.saveGame = saveGame;
