function loadGameData() {
  const data = localStorage.getItem("savegame");
  return data ? JSON.parse(data) : null;
}

function saveGameData(data) {
  localStorage.setItem("savegame", JSON.stringify(data));
}