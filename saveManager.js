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

/**
 * Salva a classificação de pilotos e equipes.
 * A classificação é um objeto no formato
 * { pilotos: [{nome: 'Piloto', pontos: 0}, ...], equipes: [{nome: 'Equipe', pontos: 0}, ...] }
 * Para manter compatibilidade, a chave de armazenamento é 'classificacao'.
 */
function saveClassificacao(classificacao) {
  localStorage.setItem('classificacao', JSON.stringify(classificacao || { pilotos: [], equipes: [] }));
}

/**
 * Carrega a classificação de pilotos e equipes do localStorage.
 * Caso não exista, retorna um objeto padrão com arrays vazios.
 */
function loadClassificacao() {
  const data = localStorage.getItem('classificacao');
  return data ? JSON.parse(data) : { pilotos: [], equipes: [] };
}

// Expõe as funções globalmente para uso nas páginas
window.saveClassificacao = saveClassificacao;
window.loadClassificacao = loadClassificacao;

//
// Compatibilidade: algumas páginas antigas ainda chamam `saveGame` em vez de
// `saveGameData`. Para evitar erros, definimos `saveGame` como um alias
// simples que delega para `saveGameData`. No futuro, prefira sempre
// utilizar `saveGameData` diretamente.
function saveGame(data) {
  return saveGameData(data);
}

window.saveGame = saveGame;
