const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0
let music = new Audio();
music.src="1-02. Main Menu.mp3";
document.addEventListener("DOMContentLoaded", (e)=>{
  music.play();
})

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Lei Geral de Proteção de Dados visa proteger o quê?",
    answers: [
      { text: "<proteger direitos humanos e privacidade das redes sicias>", correct: false },
      { text: "<Visa porteger os bancos>", correct: false },
      { text: "proteger direitos fundamentais, privacidade e desenvolvimento livre", correct: true },
      { text: "Tenta prteger o usuário de malWares", correct: false }
    ]
  },
  {
    question: "Em que ano e data foi criado o LGPD?",
    answers: [
      { text: "14 de agosto de 2018", correct: true },
      { text: "15 de março de 2018", correct: false },
      { text: "14 de agosto de 2028", correct: false },
      { text: "14 de setembro de 2018 ", correct: false }
    ]
  },
  {
    question: 'Definição de Dados Pessoais?',
    answers: [
      { text: 'A lei define o que são dados pessoais', correct: true },
      { text: 'Na LGPD, o consentimento do titular dos dados, sendo tratamento.', correct: false },
      { text: 'A LGPD se aplica não apenas a organizações com sede no Brasil', correct: false },
      { text: " ANPD para fiscalizar e aplicar penalidade, descumprimentos da LGPD.", correct: false }
    ]
  },
  {
    question: 'O que significa a sigla LGPD?',
    answers: [
      { text: "Lei Geral de Proteção de Dados", correct: true },
      { text: "Lei Geral de Proposição de Dados.", correct: false }
    ]
  },
  {
    question: 'Administração de Riscos e Falhas?',
    answers: [
      { text: 'Relação entre Proteção de Dados e Segurança da Informação', correct: true },
      { text: 'Relação entre camada de segurança e camada fisíca;', correct: false },
      { text: 'É uma rede cabeada com segurança', correct: false },
      { text: 'É uma porteção de dadod e prevenção de dados', correct: false }
    ]
  },
  {
    question: 'LGPD é o quê?',
    answers: [
      { text: 'Uma norma de regras de redes e segurança da informação', correct: false },
      { text: 'É uma Lei Geral de Proteção de Dados da legislação', correct: true },
      { text: 'É umalei de prevenção ao crime web', correct: false },
      { text: 'É um orgão federal de leis juridica', correct: false }
    ]
  },
  {
    question: 'A lei PGPD foi inspirada em qual lei?',
    answers: [
      { text: 'ANDP', correct: false },
      { text: 'FTP', correct: false },
      { text: 'PGDP', correct: false },
      { text: 'GDPR', correct: true },
    ]
  },
]