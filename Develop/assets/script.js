const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timeEl = document.getElementById("time");


let questions = [
  {
    question: "Which keyword is used to define a class in Java?",
    choice1: "define",
    choice2: "class",
    choice3: "struct",
    choice4: "object",
    answer: "2",
  },
  {
    question: "How do you declare a variable in Java?",
    choice1: "var x = 10;",
    choice2: "x := 10;",
    choice3: "int x = 10;",
    choice4: "let x = 10;",
    answer: "3",
  },
  {
    question: "Which data type is used for decimal values?",
    choice1: "int",
    choice2: "double",
    choice3: "char",
    choice4: "boolean",
    answer: "2",
  },
  {
    question: "How do you create an object in Java?",
    choice1: "ClassName obj = new ClassName();",
    choice2: "obj = new ClassName();",
    choice3: "new obj = ClassName();",
    choice4: "ClassName obj();",
    answer: "1",
  },
  {
    question: "Which of these is not a primitive data type in Java?",
    choice1: "int",
    choice2: "boolean",
    choice3: "string",
    choice4: "char",
    answer: "3",
  },
  {
    question: "What is the default value of an uninitialized int variable?",
    choice1: "0",
    choice2: "null",
    choice3: "undefined",
    choice4: "garbage",
    answer: "1",
  },
  {
    question: "Which loop is used when the number of iterations is known?",
    choice1: "while",
    choice2: "for",
    choice3: "do-while",
    choice4: "switch",
    answer: "2",
  },
  {
    question: "Which symbol is used to access a method in an object?",
    choice1: ".",
    choice2: "::",
    choice3: "->",
    choice4: "#",
    answer: "1",
  },
  {
    question: "Which exception is thrown when dividing by zero?",
    choice1: "ArithmeticException",
    choice2: "NullPointerException",
    choice3: "IOException",
    choice4: "DivideByZeroException",
    answer: "1",
  },
  {
    question: "Which access modifier allows access within the same package?",
    choice1: "public",
    choice2: "private",
    choice3: "protected",
    choice4: "default",
    answer: "4",
  }
];
//Constraints//

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

//Start Game Function//

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

let secondsLeft = 150;

function setTime() {
  // Sets interval in variable
  let timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      return window.location.assign("./gameover.html");
    }
  }, 1000);
}

setTime();

getNewQuestion = () => {
  //Once all questions are answered will end game//
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)


    //Once the game is over, will redirect to the Hiscores//
    return window.location.assign("./gameover.html");

  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  //splice will make answered questions not repeat//
  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

//EventListener for choices//
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    } else {
      secondsLeft -= 5;
    }
    //Timer so questions arent highlighted correct and incorrect at same time//
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();