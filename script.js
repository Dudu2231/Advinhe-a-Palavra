const gerarBtn = document.getElementById("gerarBtn");
let palavraSelecionada;
let palavraElement;
let erros = 0;
let letrasChutadas = [];

gerarBtn.addEventListener("click", gerarPalavra);

function gerarPalavra() {
  let palavras = ["ferrugem", 'enigma', 'cabra', 'bode', 'morcego', 'teclado', "casa", "carro", "pessoa", "barco", "mar", "prego"];
  palavraSelecionada = palavras[Math.floor(Math.random() * palavras.length)];

  palavraElement = document.createElement("div");
  palavraElement.className = "palavra";

  for (let i = 0; i < palavraSelecionada.length; i++) {
    const espaço = document.createElement("span");
    espaço.textContent = "_ ";
    palavraElement.appendChild(espaço);
  }

  const container = document.querySelector(".container");
  container.innerHTML = ''; // Limpar o container antes de adicionar a nova palavra
  container.appendChild(palavraElement);

  criarOpcaoChute();
}

function criarOpcaoChute() {
  gerarBtn.remove();

  const chuteBtn = document.createElement("button");
  chuteBtn.textContent = "Chutar letra";
  chuteBtn.id = "chuteBtn";

  const inputChute = document.createElement("input");
  inputChute.type = "text";
  inputChute.id = "inputChute";
  inputChute.placeholder = 'Letra'
  inputChute.maxLength = 1;

  const container = document.querySelector(".container");
  container.appendChild(chuteBtn);
  container.appendChild(inputChute);

  chuteBtn.addEventListener("click", chutarLetra);
}

function chutarLetra() {
  const inputChute = document.getElementById("inputChute");
  const letraChutada = inputChute.value.toLowerCase();
  inputChute.value = "";

  if (letraChutada === "" || letrasChutadas.includes(letraChutada)) return;

  letrasChutadas.push(letraChutada);

  const palavraSpans = palavraElement.children;
  let acertou = false;

  for (let i = 0; i < palavraSelecionada.length; i++) {
    if (palavraSelecionada[i] === letraChutada) {
      palavraSpans[i].textContent = letraChutada + " ";
      acertou = true;
    }
  }

  if (!acertou) {
    erros++;
  }

  atualizarErros();

  if (verificarVitoria()) {
    alert("Parabéns! Você adivinhou a palavra!");
    reiniciarJogo();
  } else if (erros >= 6) {
    alert(`Que pena! Você perdeu. A palavra era: ${palavraSelecionada}`);
    reiniciarJogo();
  }
}

function atualizarErros() {
  const container = document.querySelector(".container");
  let erroP = document.getElementById("erroP");

  if (!erroP) {
    erroP = document.createElement("p");
    erroP.id = "erroP";
    container.appendChild(erroP);
  }

  erroP.textContent = `Erros: ${erros} - Letras chutadas: ${letrasChutadas.join(", ")}`;
}

function verificarVitoria() {
  const palavraSpans = palavraElement.children;
  for (let span of palavraSpans) {
    if (span.textContent === "_ ") {
      return false;
    }
  }
  return true;
}

function reiniciarJogo() {
  palavraSelecionada = "";
  palavraElement = null;
  erros = 0;
  letrasChutadas = [];
  document.getElementById("inputChute").remove();
  document.getElementById("chuteBtn").remove();
  const container = document.querySelector(".container");
  const erroP = document.getElementById("erroP");
  if (erroP) erroP.remove();
  const novoGerarBtn = document.createElement("button");
  novoGerarBtn.textContent = "Gerar Palavra";
  novoGerarBtn.id = "gerarBtn";
  novoGerarBtn.addEventListener("click", gerarPalavra);
  container.appendChild(novoGerarBtn);
}
