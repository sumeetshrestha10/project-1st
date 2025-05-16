
const chapterSelect = document.querySelector(".chapter-select");
//for button in the chapters
let correctAnswerCount = 0;

if (chapterSelect) {
  chapterSelect.addEventListener("change", function () {
    // Get the selected value (chapter)
    const selectedChapter = this.value;

    // If a valid chapter is selected, navigate to that page
    if (selectedChapter) {
      window.location.href = selectedChapter + ".html";
    }
  });
}

//for PDFs select and operate
const openPdfBtn = document.getElementById("openPDFs");
const pdfPopup = document.getElementById("pdf-popup");
const closePopup = document.getElementById("close-btn");
const pdfFrame = document.getElementById("pdf-frame");

openPdfBtn.addEventListener("click", () => {
  const selectValue = chapterSelect.value;

  pdfFrame.src = `PDFs/${selectValue}.pdf`;
  pdfPopup.classList.add("show");
});

closePopup.addEventListener("click", () => {
  pdfPopup.classList.remove("show");
  setTimeout(() => {
    pdfFrame.src = "";
  }, 400);
});

//JS for quiz:
const openQuizBtn = document.querySelector(".chapterbtn");
const quizPopup = document.getElementById("quiz-popup");
const closeQuizBtn = document.querySelector(".close-quiz");
const questionContainer = document.querySelector(".quiz-question");
const questionText = document.getElementById("question-text");
const nextbtn = document.getElementById("next-btn");

const questions = [
  {
    question: "what is procedure oriented programming",
    options: [
      "a method of structuring code",
      "a random technique",
      "only OOP",
      "none of these",
    ],
    answer: "a method of structuring code",
  },
  {
    question: "What is OOP?",
    options: [
      "Object Oriented Programming",
      "Old Oriented Programming",
      "Oranixed Order Programming",
      "none of these",
    ],
    answer: "Object Oriented Programming",
  },
  {
    question: "What are the properties of OOP?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "All of these"],
    answer: "All of these",
  },
];

let currentQuestionIndex = 0;

openQuizBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  quizPopup.classList.add("show");
  showQuestion();
  correctAnswerCount = 0;
  document.getElementById("quiz-score").classList.add("hidden");
});

closeQuizBtn.addEventListener("click", () => {
  quizPopup.classList.remove("show");
  questionContainer.classList.remove("show");
  currentQuestionIndex = 0;
  document.getElementById("quiz-score").classList.add("hidden");
});

function showQuestion() {
  questionContainer.classList.remove("show");
  questionContainer.classList.add("hidden");

  setTimeout(() => {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    const optionContainer = document.querySelector(".options-container");
    optionContainer.innerHTML = "";

    currentQuestion.options.forEach((option) => {
      const optionBtn = document.createElement("button");
      optionBtn.classList.add("option");
      optionBtn.textContent = option;
      optionContainer.appendChild(optionBtn);

      optionBtn.addEventListener("click", () => {
        HandleOptionClick(option, currentQuestion.answer);
      });
    });
    questionContainer.classList.remove("hidden");
    optionContainer.classList.add("show");
  }, 100);
}

function HandleOptionClick(selectedOption, correctAnswer){
  if(selectedOption === correctAnswer){
    correctAnswerCount++;
  }
  checkAnswer(selectedOption,correctAnswer);
}

function checkAnswer(selectedOption, Answer){
  const options = document.querySelectorAll(".option");

  options.forEach(optionBtn =>{
    optionBtn.disabled = true;

    if(optionBtn.textContent === Answer){
      optionBtn.classList.add("correct");
    }else if(optionBtn.textContent === selectedOption){
      optionBtn.classList.add("wrong");
    }
  });
   const scoreDisplay = document.getElementById("quiz-score");
  scoreDisplay.textContent = `${correctAnswerCount} out of ${questions.length}`;
  scoreDisplay.classList.remove("hidden");

  // scoreDisplay.classList.remove("score-correct","score-wrong");

  // if(selectedOption === correctAnswer){
  //   scoreDisplay.classList.add("score-correct");
  // }else{
  //   scoreDisplay.classList.add("score-wrong");
  // }

  // scoreDisplay.classList.add("score-animation");
  // setTimeout(() => {
  //   scoreDisplay.classList.remove("score-animation");
  // }, 500);
    
  setTimeout(() => {
    nextbtn.click();
    }, 1000);
}

nextbtn.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
});

function finishQuiz(){
  const scoreDisplay = document.getElementById("quiz-score");
  const completeSound = document.getElementById("quiz-complete-sound");


  scoreDisplay.textContent += " — Quiz Completed!";
  scoreDisplay.classList.remove("hidden");
  scoreDisplay.classList.add("quiz-complete-anim");


  setTimeout(() => {
    quizPopup.classList.remove("show");
    questionContainer.classList.remove("show");

    
    scoreDisplay.textContent = "";
    scoreDisplay.classList.add("hidden");
    scoreDisplay.classList.remove("quiz-complete-anim");

    correctAnswerCount = 0;
    currentQuestionIndex = 0;
  }, 2000);
}

