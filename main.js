let jogo = {};

/*
 * Para permitir que a seleção de equipes funcione mesmo quando o jogo é
 * aberto diretamente via file:// (onde não é possível fazer requisições
 * fetch para arquivos locais), incorporamos aqui versões reduzidas dos
 * dados de equipes e pilotos.  Esses arrays contêm informações básicas
 * necessárias para iniciar uma partida: nome da equipe, motor e pilotos
 * titulares.  Caso deseje adicionar mais equipes ou pilotos, inclua-os
 * manualmente nestes arrays ou carregue os arquivos JSON via servidor
 * HTTP.
 */
const EQUIPES_DATA = [
  { nome: "Williams", motor: "Renault", ativa: true },
  { nome: "Benetton", motor: "Ford", ativa: true },
  { nome: "Ferrari", motor: "Ferrari", ativa: true },
  { nome: "McLaren", motor: "Peugeot", ativa: true },
  { nome: "Jordan", motor: "Hart", ativa: true },
  { nome: "Sauber", motor: "Mercedes", ativa: true },
  { nome: "Ligier", motor: "Renault", ativa: true },
  { nome: "Minardi", motor: "Ford", ativa: true },
  { nome: "Tyrrell", motor: "Yamaha", ativa: true },
  { nome: "Footwork", motor: "Ford", ativa: true },
  { nome: "Lotus", motor: "Mugen-Honda", ativa: true },
  { nome: "Larrousse", motor: "Ford", ativa: true },
  { nome: "Simtek", motor: "Ford", ativa: true },
  { nome: "Pacific", motor: "Ilmor", ativa: false },
  { nome: "Andrea Moda", motor: "Judd", ativa: false },
  { nome: "AGS", motor: "Ford", ativa: false },
  { nome: "Coloni", motor: "Ford", ativa: false },
  { nome: "Onyx", motor: "Ford", ativa: false }
];

/**
 * Lista expandida de pilotos para a temporada de 1994 e além.  Cada
 * entrada inclui o ano de nascimento para permitir que pilotos
 * adolescentes só apareçam após completarem 18 anos, e para que
 * habilidades possam ser ajustadas conforme o envelhecimento.  Os
 * campos talento e salário mínimo são estimativas relativas à fama e
 * experiência de cada piloto na época.  Pilotos sem equipe inicial
 * aparecem no mercado de agentes livres desde o início da partida.
 */
const PILOTOS_DATA = [
  { nome: "Ayrton Senna", pais: "Brasil", talento: 9.9, equipe: "Williams", salarioMinimo: 800000, interesseBase: 0.95, anoNascimento: 1960 },
  { nome: "Damon Hill", pais: "Reino Unido", talento: 9.0, equipe: "Williams", salarioMinimo: 600000, interesseBase: 0.9, anoNascimento: 1960 },
  { nome: "David Coulthard", pais: "Reino Unido", talento: 7.5, equipe: "", salarioMinimo: 300000, interesseBase: 0.6, anoNascimento: 1971 },
  { nome: "Nigel Mansell", pais: "Reino Unido", talento: 9.1, equipe: "", salarioMinimo: 750000, interesseBase: 0.5, anoNascimento: 1953 },
  { nome: "Ukyo Katayama", pais: "Japão", talento: 6.5, equipe: "Tyrrell", salarioMinimo: 200000, interesseBase: 0.5, anoNascimento: 1963 },
  { nome: "Mark Blundell", pais: "Reino Unido", talento: 7.0, equipe: "Tyrrell", salarioMinimo: 250000, interesseBase: 0.55, anoNascimento: 1966 },
  { nome: "Michael Schumacher", pais: "Alemanha", talento: 9.5, equipe: "Benetton", salarioMinimo: 900000, interesseBase: 0.95, anoNascimento: 1969 },
  { nome: "Jyrki Järvilehto", pais: "Finlândia", talento: 7.2, equipe: "Sauber", salarioMinimo: 200000, interesseBase: 0.6, anoNascimento: 1966 },
  { nome: "Jos Verstappen", pais: "Holanda", talento: 7.0, equipe: "Benetton", salarioMinimo: 200000, interesseBase: 0.5, anoNascimento: 1972 },
  { nome: "Johnny Herbert", pais: "Reino Unido", talento: 7.3, equipe: "", salarioMinimo: 220000, interesseBase: 0.55, anoNascimento: 1964 },
  { nome: "Jean Alesi", pais: "França", talento: 8.2, equipe: "Ferrari", salarioMinimo: 500000, interesseBase: 0.8, anoNascimento: 1964 },
  { nome: "Gerhard Berger", pais: "Áustria", talento: 8.4, equipe: "Ferrari", salarioMinimo: 550000, interesseBase: 0.85, anoNascimento: 1959 },
  { nome: "Mika Häkkinen", pais: "Finlândia", talento: 8.5, equipe: "McLaren", salarioMinimo: 500000, interesseBase: 0.85, anoNascimento: 1968 },
  { nome: "Martin Brundle", pais: "Reino Unido", talento: 7.8, equipe: "McLaren", salarioMinimo: 350000, interesseBase: 0.75, anoNascimento: 1959 },
  { nome: "Christian Fittipaldi", pais: "Brasil", talento: 7.5, equipe: "Footwork", salarioMinimo: 250000, interesseBase: 0.7, anoNascimento: 1971 },
  { nome: "Gianni Morbidelli", pais: "Itália", talento: 7.0, equipe: "Footwork", salarioMinimo: 220000, interesseBase: 0.65, anoNascimento: 1968 },
  { nome: "Pedro Lamy", pais: "Portugal", talento: 6.8, equipe: "Lotus", salarioMinimo: 200000, interesseBase: 0.6, anoNascimento: 1972 },
  { nome: "Philippe Adams", pais: "Bélgica", talento: 5.8, equipe: "Lotus", salarioMinimo: 150000, interesseBase: 0.4, anoNascimento: 1969 },
  { nome: "Éric Bernard", pais: "França", talento: 6.9, equipe: "Ligier", salarioMinimo: 200000, interesseBase: 0.6, anoNascimento: 1964 },
  { nome: "Mika Salo", pais: "Finlândia", talento: 7.0, equipe: "Lotus", salarioMinimo: 300000, interesseBase: 0.7, anoNascimento: 1966 },
  { nome: "Alessandro Zanardi", pais: "Itália", talento: 7.2, equipe: "Lotus", salarioMinimo: 250000, interesseBase: 0.65, anoNascimento: 1966 },
  { nome: "Rubens Barrichello", pais: "Brasil", talento: 8.4, equipe: "Jordan", salarioMinimo: 400000, interesseBase: 0.8, anoNascimento: 1972 },
  { nome: "Eddie Irvine", pais: "Reino Unido", talento: 7.6, equipe: "Jordan", salarioMinimo: 300000, interesseBase: 0.7, anoNascimento: 1965 },
  { nome: "Aguri Suzuki", pais: "Japão", talento: 6.0, equipe: "Jordan", salarioMinimo: 180000, interesseBase: 0.4, anoNascimento: 1960 },
  { nome: "Olivier Panis", pais: "França", talento: 7.2, equipe: "Ligier", salarioMinimo: 250000, interesseBase: 0.6, anoNascimento: 1966 },
  { nome: "Olivier Beretta", pais: "Mônaco", talento: 5.9, equipe: "Larrousse", salarioMinimo: 150000, interesseBase: 0.4, anoNascimento: 1969 },
  { nome: "Yannick Dalmas", pais: "França", talento: 6.3, equipe: "Larrousse", salarioMinimo: 180000, interesseBase: 0.45, anoNascimento: 1961 },
  { nome: "Hideki Noda", pais: "Japão", talento: 5.8, equipe: "Larrousse", salarioMinimo: 150000, interesseBase: 0.35, anoNascimento: 1969 },
  { nome: "Philippe Alliot", pais: "França", talento: 6.1, equipe: "Larrousse", salarioMinimo: 200000, interesseBase: 0.4, anoNascimento: 1954 },
  { nome: "Jean-Denis Délétraz", pais: "Suíça", talento: 5.5, equipe: "Larrousse", salarioMinimo: 140000, interesseBase: 0.3, anoNascimento: 1963 },
  { nome: "Érik Comas", pais: "França", talento: 6.5, equipe: "Larrousse", salarioMinimo: 220000, interesseBase: 0.5, anoNascimento: 1963 },
  { nome: "Jean-Marc Gounon", pais: "França", talento: 6.0, equipe: "Simtek", salarioMinimo: 170000, interesseBase: 0.4, anoNascimento: 1963 },
  { nome: "Roland Ratzenberger", pais: "Áustria", talento: 6.4, equipe: "Simtek", salarioMinimo: 120000, interesseBase: 0.4, anoNascimento: 1960 },
  { nome: "Heinz-Harald Frentzen", pais: "Alemanha", talento: 7.8, equipe: "Sauber", salarioMinimo: 350000, interesseBase: 0.75, anoNascimento: 1967 },
  { nome: "JJ Lehto", pais: "Finlândia", talento: 7.0, equipe: "Benetton", salarioMinimo: 220000, interesseBase: 0.5, anoNascimento: 1966 },
  // Pilotos jovens que só aparecerão após atingirem 18 anos
  { nome: "Kimi Räikkönen", pais: "Finlândia", talento: 8.7, equipe: "", salarioMinimo: 400000, interesseBase: 0.8, anoNascimento: 1979 },
  { nome: "Fernando Alonso", pais: "Espanha", talento: 8.6, equipe: "", salarioMinimo: 400000, interesseBase: 0.8, anoNascimento: 1981 },
  { nome: "Lewis Hamilton", pais: "Reino Unido", talento: 9.0, equipe: "", salarioMinimo: 500000, interesseBase: 0.9, anoNascimento: 1985 },
  { nome: "Sebastian Vettel", pais: "Alemanha", talento: 8.5, equipe: "", salarioMinimo: 350000, interesseBase: 0.8, anoNascimento: 1987 }
];

/**
 * Staff inicial para equipes específicas.  Esse objeto mapeia o nome da
 * equipe aos membros de staff que ela terá no início do jogo.  Cada
 * membro possui nome, cargo e habilidade (0–100).  Se uma equipe
 * não estiver presente aqui, começará sem staff e terá que
 * contratar.  Expandir conforme necessário para outras equipes.
 */
const STAFF_BY_TEAM = {
  "Lotus": [
    { nome: "Enrico Scalabroni", cargo: "Diretor Técnico", habilidade: 60 },
    { nome: "Peter Prodromou", cargo: "Chefe de R&D", habilidade: 60 },
    { nome: "Peter Collins", cargo: "Chefe de Equipe", habilidade: 65 },
    { nome: "Don Simione", cargo: "Chefe de Corrida", habilidade: 60 },
    { nome: "Hiroyuki Hatori", cargo: "Diretor de Marketing", habilidade: 50 }
  ],
  // Exemplo para Williams (pode ser expandido). Mantivemos habilidades
  // menores como referência; ajuste conforme equilíbrio desejado.
  "Williams": [
    { nome: "Adrian Newey", cargo: "Diretor Técnico", habilidade: 60 },
    { nome: "Pierre Waché", cargo: "Chefe de R&D", habilidade: 60 },
    { nome: "Frank Williams", cargo: "Chefe de Equipe", habilidade: 95 },
    { nome: "Tom Walkinshaw", cargo: "Chefe de Corrida", habilidade: 85 },
    { nome: "Ian Phillips", cargo: "Diretor de Marketing", habilidade: 70 }
  ],
  "Benetton": [
    { nome: "Ross Brawn", cargo: "Diretor Técnico", habilidade: 70 },
    { nome: "Dino Toso", cargo: "Chefe de R&D", habilidade: 70 },
    { nome: "Flavio Briatore", cargo: "Chefe de Equipe", habilidade: 92 },
    { nome: "Tom Walkinshaw", cargo: "Chefe de Corrida", habilidade: 85 },
    { nome: "Bernie Ecclestone", cargo: "Diretor de Marketing", habilidade: 95 }
  ],
  "Ferrari": [
    { nome: "Gustav Brunner", cargo: "Diretor Técnico", habilidade: 80 },
    { nome: "Loïc Bigois", cargo: "Chefe de R&D", habilidade: 80 },
    { nome: "Jean Todt", cargo: "Chefe de Equipe", habilidade: 95 },
    { nome: "Nigel Stepney", cargo: "Chefe de Corrida", habilidade: 80 },
    { nome: "Peter Sauber", cargo: "Diretor de Marketing", habilidade: 80 }
  ],
  "McLaren": [
    { nome: "Frank Dernie", cargo: "Diretor Técnico", habilidade: 90 },
    { nome: "Luca Baldisserri", cargo: "Chefe de R&D", habilidade: 90 },
    { nome: "Ron Dennis", cargo: "Chefe de Equipe", habilidade: 95 },
    { nome: "Jo Ramirez", cargo: "Chefe de Corrida", habilidade: 88 },
    { nome: "Bernie Ecclestone", cargo: "Diretor de Marketing", habilidade: 95 }
  ],
  "Jordan": [
    { nome: "Gary Anderson", cargo: "Diretor Técnico", habilidade: 100 },
    { nome: "James Key", cargo: "Chefe de R&D", habilidade: 100 },
    { nome: "Frank Williams", cargo: "Chefe de Equipe", habilidade: 95 },
    { nome: "Tom Walkinshaw", cargo: "Chefe de Corrida", habilidade: 85 },
    { nome: "Ian Phillips", cargo: "Diretor de Marketing", habilidade: 70 }
  ]
};

// Salva os dados e redireciona ao menu principal
function escolherEquipe(nomeEquipe) {
  // Utiliza os arrays incorporados quando fetch não está disponível
  const equipes = Array.isArray(EQUIPES_DATA) ? EQUIPES_DATA : [];
  const pilotos = Array.isArray(PILOTOS_DATA) ? PILOTOS_DATA : [];

  const equipe = equipes.find(e => e.nome === nomeEquipe);
  if (!equipe) {
    alert("Equipe não encontrada.");
    return;
  }
  const titulares = pilotos.filter(p => p.equipe === nomeEquipe).slice(0, 2);

  // Patrocinadores iniciais são desativados nesta versão offline.  Caso
  // deseje atribuir bônus iniciais, adicione os nomes de patrocinadores e
  // seus bônus manualmente aqui.
  const patrocinadoresIniciais = [];
  let dinheiroInicial = 5000000;

  // Calcula o caminho do logotipo com base no nome da equipe.
  const logoFile = nomeEquipe.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '') + '.png';
  const logoPath = `img/equipes/${logoFile}`;

  // Define a confiabilidade inicial do motor com base no fabricante.  Se
  // desconhecido, utiliza um valor padrão de 70 (em %) – valores mais
  // altos indicam melhor confiabilidade.  Esses números são aproximados
  // às características dos motores usados na temporada de 1994.
  const confiabilidadePorMotor = {
    'Renault': 85,
    'Ford': 75,
    'Ferrari': 80,
    'Peugeot': 70,
    'Hart': 65,
    'Mercedes': 70,
    'Renault': 85,
    'Yamaha': 60,
    'Ilmor': 60,
    'Mugen-Honda': 70,
    'Judd': 55
  };
  const motorConfiabilidade = confiabilidadePorMotor[equipe.motor] ?? 70;

  // Inicializa dados de fábrica com nível (0–1), nota (0–100),
  // total investido e manutenção desativada por padrão.  Também
  // atribuímos a confiabilidade inicial do motor ao objeto de jogo
  // (intervalo 0–100). Essas propriedades serão atualizadas
  // conforme o jogador investir ou contratar staff.
  jogo = {
    dinheiro: dinheiroInicial,
    equipe: equipe.nome,
    motor: equipe.motor,
    logo: logoPath,
    pilotos: titulares.map(p => p.nome),
    patrocinadores: patrocinadoresIniciais,
    patrocinadoresGlobais: patrocinadoresIniciais,
    fabrica: {
      nivel: 0.5,
      nota: 50,
      investimentoTotal: 0,
      manutencaoAtiva: false
    },
    motorConfiabilidade: motorConfiabilidade,
    reputacao: 50,
    temporada: 1994,
    progresso: { corridaAtual: 1 }
  };

  // Define o staff inicial com base na equipe selecionada. Se não houver
  // staff definido para a equipe, permanece um array vazio, e o
  // jogador precisará contratar manualmente na tela de staff.
  jogo.staff = STAFF_BY_TEAM[nomeEquipe] ? JSON.parse(JSON.stringify(STAFF_BY_TEAM[nomeEquipe])) : [];

  saveGame(jogo);
  alert(`Você agora está no comando da ${nomeEquipe}!`);
  location.href = "menu-principal.html";
}

// Função do botão "Voltar"
window.onload = () => {
  const voltarBtn = document.getElementById("btn-voltar");
  if (voltarBtn) {
    voltarBtn.onclick = () => {
      window.location.href = "index.html";
    };
  }
};

// Torna a função acessível globalmente
window.escolherEquipe = escolherEquipe;
