let equipeSelecionada = null;

fetch("equipes.json")
  .then((res) => res.json())
  .then((equipes) => {
    const container = document.getElementById("equipes");

    equipes.forEach((equipe, index) => {
      const btn = document.createElement("button");
      btn.textContent = equipe.nome;
      btn.onclick = () => selecionarEquipe(equipe, btn);
      container.appendChild(btn);
    });
  });

function selecionarEquipe(equipe, botao) {
  equipeSelecionada = equipe;
  document.querySelectorAll("#equipes button").forEach(btn => {
    btn.classList.remove("selecionado");
  });
  botao.classList.add("selecionado");
  document.getElementById("selecionada").textContent =
    `Selecionado: ${equipe.nome} - Motor: ${equipe.motor}`;
  document.getElementById("btnConfirmar").disabled = false;
}

document.getElementById("btnConfirmar").addEventListener("click", () => {
  if (equipeSelecionada) {
    localStorage.setItem("equipeSelecionada", JSON.stringify(equipeSelecionada));
    window.location.href = "gerenciamento.html";
  }
});
