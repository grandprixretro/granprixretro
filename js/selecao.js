let equipeSelecionada = null;

async function carregarEquipes() {
  const resposta = await fetch("dados/equipes.json");
  const equipes = await resposta.json();
  const grid = document.getElementById("grid-equipes");

  equipes.forEach((equipe, index) => {
    const botao = document.createElement("button");
    botao.innerText = equipe.nome;
    botao.onclick = () => {
      equipeSelecionada = equipe;
      document.getElementById("equipe-selecionada").innerText =
        `Equipe selecionada: ${equipe.nome}`;
    };
    grid.appendChild(botao);
  });
}

function confirmarEquipe() {
  if (equipeSelecionada) {
    localStorage.setItem("equipeSelecionada", JSON.stringify(equipeSelecionada));
    window.location.href = "gerenciamento.html"; // próximo passo
  } else {
    alert("Selecione uma equipe primeiro!");
  }
}

window.onload = carregarEquipes;
