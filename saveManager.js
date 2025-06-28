export function loadGameData() {
  const data = localStorage.getItem("savegame");
  return data ? JSON.parse(data) : null;
}

export function saveGame(data) {
  localStorage.setItem("savegame", JSON.stringify(data));
}
