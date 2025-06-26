const quizData = [
  {
    question: "🍫 Uma barra de chocolate tem 8 pedaços. Você come 3. Qual é a fração?",
    options: ["5/8", "3/10", "3/8"],
    answer: "3/8"
  },
  {
    question: "🥚 De uma caixa com 12 ovos, você usa 6. Qual é a fração utilizada?",
    options: ["6/12", "1/3", "2/5"],
    answer: "6/12"
  },
  {
    question: "🍰 Um bolo foi cortado em 4 fatias. Você come 1. Qual é a fração?",
    options: ["1/2", "1/4", "1/3"],
    answer: "1/4"
  },
  {
    question: "🍕 Uma pizza tem 8 pedaços. Você come 5. Qual é a fração comida?",
    options: ["3/8", "5/8", "8/5"],
    answer: "5/8"
  },
  {
    question: "🍉 Uma melancia foi cortada em 10 partes. Você come 7. Qual é a fração?",
    options: ["7/10", "3/10", "7/8"],
    answer: "7/10"
  },
  {
    question: "🧀 Um queijo foi dividido em 6 partes. Você come 2. Qual é a fração?",
    options: ["2/4", "2/6", "3/6"],
    answer: "2/6"
  },
  {
    question: "🖍️ De uma caixa com 12 lápis de cor, você usa 9. Qual é a fração?",
    options: ["9/12", "3/5", "7/12"],
    answer: "9/12"
  },
  {
    question: "🍫 Uma barra de cereal foi dividida em 5 pedaços. Você come 2. Qual é a fração?",
    options: ["2/5", "3/5", "2/3"],
    answer: "2/5"
  },
  {
    question: "🥧 Uma torta foi cortada em 8 fatias. Você come 4. Qual é a fração?",
    options: ["4/8", "5/8", "2/4"],
    answer: "4/8"
  },
  {
    question: "🍪 Um pacote tem 10 biscoitos. Você come 8. Qual é a fração comida?",
    options: ["4/10", "8/10", "2/5"],
    answer: "8/10"
  },
  {
    question: "🎒 Maria tem 24 lápis. Ela empresta 8 para Ana e 4 para João. Qual é a fração do total de lápis que ela emprestou?",
    options: ["12/24", "8/24", "1/2"],
    answer: "12/24"
  },
  {
    question: "🧃 Lucas tem uma caixa com 20 sucos. Ele distribui 6 entre os amigos e guarda 4 para ele. Qual é a fração do total que foi distribuída?",
    options: ["6/20", "4/20", "10/20"],
    answer: "6/20"
  },
  {
    question: "🍰 Uma confeiteira fez 40 bolos para uma festa. 25 foram de chocolate e o resto de baunilha. Qual é a fração de bolos de baunilha?",
    options: ["15/40", "25/40", "20/40"],
    answer: "15/40"
  },
  {
    question: "🧃 Julia levou 30 sucos para o piquenique. Ela entregou 10 para a turma da sala e 5 para os professores. Qual é a fração total dos sucos que ela entregou?",
    options: ["15/30", "10/30", "5/30"],
    answer: "15/30"
  },
  {
    question: "🎈 Em uma festa havia 60 balões. 20 eram azuis, 15 vermelhos, e o restante brancos. Qual a fração de balões brancos?",
    options: ["25/60", "15/60", "20/60"],
    answer: "25/60"
  },
  {
    question: "🎨 Em uma sala há 50 canetinhas. 30 funcionam bem, 10 estão com tinta fraca e o resto estão secas. Qual a fração de canetinhas secas?",
    options: ["10/50", "20/50", "30/50"],
    answer: "10/50"
  }
  
];

let currentQuestion = 0;
let score = 0;

const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextButton = document.getElementById("nextButton");
const feedbackEl = document.getElementById("feedback");
const resultEl = document.getElementById("result");

// Evento para iniciar o quiz, esconder a tela inicial e mostrar o quiz
startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  quiz.style.display = "block";
  currentQuestion = 0;
  score = 0;
  resultEl.innerHTML = "";
  loadQuestion();
});

// Carrega a pergunta atual e as opções
function loadQuestion() {
  feedbackEl.innerText = "";
  nextButton.style.display = "none";
  const current = quizData[currentQuestion];
  questionEl.innerText = current.question;
  optionsEl.innerHTML = "";

  current.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.disabled = false;
    button.className = "";
    button.addEventListener("click", () => checkAnswer(button, option));
    optionsEl.appendChild(button);
  });
}

// Checa a resposta escolhida
function checkAnswer(button, selected) {
  const current = quizData[currentQuestion];

  // Desabilita todas opções
  Array.from(optionsEl.children).forEach(btn => btn.disabled = true);

  // Marca a resposta correta
  Array.from(optionsEl.children).forEach(btn => {
    if (btn.innerText === current.answer) {
      btn.classList.add("correct");
    }
  });

  if (selected === current.answer) {
    score++;
    feedbackEl.innerText = "✅ Correto!";
    feedbackEl.style.color = "#38B000";
  } else {
    button.classList.add("wrong");
    feedbackEl.innerText = `❌ Errado! A resposta correta é: ${current.answer}`;
    feedbackEl.style.color = "#D00000";
  }

  nextButton.style.display = "inline-block";
}

// Evento para ir para a próxima pergunta ou mostrar resultado
nextButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// Exibe o resultado final
function showResult() {
  quiz.style.display = "none";
  resultEl.innerHTML = `
    <h2>🎉 Você acertou ${score} de ${quizData.length} questões!</h2>
    <p>Parabéns! 🏆</p>
    <button id="restartButton">Reiniciar Quiz</button>
  `;

  // Botão para reiniciar o quiz
  const restartButton = document.getElementById("restartButton");
  restartButton.addEventListener("click", () => {
    resultEl.innerHTML = "";
    startScreen.style.display = "block";
  });
}
