let imagens;
const numCartas = prompt("Com quantas cartas você deseja jogar? (6 ou 18)");

if (numCartas !== "6" && numCartas !== "18") {
  alert("Opção inválida. O jogo será iniciado com 18 cartas.");
  imagens = [
    "cardRelampago",
    "cardMatte",
    "cardDinoco",
    "cardSally",
    "cardSheriffe",
    "cardFilmore",
    "cardFrancesco",
    "cardLuigi",
    "cardMack",
    "cardRelampago",
    "cardMatte",
    "cardDinoco",
    "cardSally",
    "cardSheriffe",
    "cardFilmore",
    "cardFrancesco",
    "cardLuigi",
    "cardMack",
  ];
} else if (numCartas === "6") {
  imagens = [
    "cardRelampago",
    "cardMatte",
    "cardSally",
    "cardSally",
    "cardRelampago",
    "cardMatte",
  ];
} else {
  imagens = [
    "cardRelampago",
    "cardMatte",
    "cardDinoco",
    "cardSally",
    "cardSheriffe",
    "cardFilmore",
    "cardFrancesco",
    "cardLuigi",
    "cardMack",
    "cardRelampago",
    "cardMatte",
    "cardDinoco",
    "cardSally",
    "cardSheriffe",
    "cardFilmore",
    "cardFrancesco",
    "cardLuigi",
    "cardMack",
  ];
}
  // EMBARALHA  Ele recebe um array com as imagens que serão usadas no jogo da memória. Em seguida, ele percorre o array de trás para frente, começando pelo último elemento.embaralha as imagens que serão usadas no jogo da memória, de forma que elas fiquem em ordem aleatória a cada vez que o jogo for iniciado.
  function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  //  seleciona o elemento HTML que contém as divs das cartas do jogo da memória e atribui a ele à variável tabuleiro.
  const tabuleiro = document.querySelector(".grid");

  embaralhar(imagens);

  // CRIA AS CARTAS cria as divs das cartas do jogo da memória, definindo a imagem de frente de cada carta usando um array e adicionando as divs ao tabuleiro do jogo para que o usuário possa interagir com elas.
  imagens.forEach((imagem) => {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    //  define um atributo personalizado chamado "imagem" na div que representa uma carta do jogo da memória, para que possamos acessar o valor desse atributo posteriormente no código.
    carta.dataset.imagem = imagem;

    // CRIA A FRENTE DAS CARTAS
    const frente = document.createElement("div"); // Cria um novo elemento div e o armazena na variável frente
    frente.classList.add("frente"); // Adiciona a classe "frente" ao elemento div criado acima
    const img = document.createElement("img"); // Cria um novo elemento img e o armazena na variável img
    const index = imagens.indexOf(imagem); // Encontra o índice da imagem atual no array imagens usando o método indexOf() e armazena o índice na variável index
    img.src = `./imagens/${imagens[index]}.jpg`; // Define o atributo src do elemento img com a URL da imagem correspondente no array imagens usando string interpolation
    frente.appendChild(img); // Adiciona o elemento img como filho do elemento div frente

    // CRIA O VERSO DAS CARTAS
    const verso = document.createElement("div");
    verso.classList.add("verso");
    const imgVerso = document.createElement("img");
    imgVerso.src = "./imagens/card1.jpg";
    img.src = `./imagens/${imagens[index]}.jpg`;
    verso.appendChild(imgVerso);

    carta.appendChild(frente);
    carta.appendChild(verso);
    tabuleiro.appendChild(carta);
  });

  // A variável cartaVirada é usada para controlar se uma carta já foi virada ou não
  let cartaVirada = false;
  // usadas para armazenar as informações das cartas que foram viradas pelo usuário para que possam ser comparadas posteriormente.
  let primeiraCarta, segundaCarta;

  // quando o usuário clica em uma carta verifica se a carta clicada é válida e se ainda não foi virada. Se a carta é válida e ainda não foi virada, a carta é virada para que o usuário possa ver a imagem de frente.
  tabuleiro.addEventListener("click", function (event) {
    const cartaClicada = event.target.closest(".carta");
    if (!cartaClicada || cartaClicada.classList.contains("virada")) {
      return;
    }

    cartaClicada.classList.add("virada");

    if (!cartaVirada) {
      cartaVirada = true;
      primeiraCarta = cartaClicada;
    } else {
      cartaVirada = false;
      segundaCarta = cartaClicada;

      // esse código verifica se as duas cartas clicadas formam um par, e remove a classe "virada" das cartas se o usuário acertar o par, ou espera um segundo e vira as cartas de volta para a posição inicial se o usuário errar.
      if (primeiraCarta.dataset.imagem === segundaCarta.dataset.imagem) {
        primeiraCarta = null;
        segundaCarta = null;
      } else {
        setTimeout(() => {
          primeiraCarta.classList.remove("virada");
          segundaCarta.classList.remove("virada");
          primeiraCarta = null;
          segundaCarta = null;
        }, 1000);
      }
    }
    if (document.querySelectorAll(".carta:not(.virada)").length === 0) {
      setTimeout(() => {
        alert("PARABÉNS!!! Você acertou todos.");
        imagens = null;
      }, 1000);
    }
  });
