const questions = [
    {
      question: "What is a common task during the morning routine of an IT programmer?",
      answers: [
        { text: "Responding to emails", correct: false},
        { text: "Conducting client meetings", correct: false},
        { text: "Writing code", correct: true},
        { text: "Creating project timelines", correct: false},
      ]
    },
    {
      question: "Which tool is commonly used for version control in software development?",
      answers: [
        { text: "Photoshop", correct: false},
        { text: "Git", correct: true},
        { text: "Microsoft Excel", correct: false},
        { text: "Slack", correct: false},
      ]
    },
    {
      question: "During a typical workday, what does the term debugging refer to?",
      answers: [
        { text: "Fixing errors in code", correct: true},
        { text: "Planning future tasks", correct: false},
        { text: "Designing user interfaces", correct: false},
        { text: "Conducting code reviews", correct: false},
      ]
    },
    {
      question: "What is the purpose of an IDE (Integrated Development Environment) in programming?",
      answers: [
        { text: "Sending emails", correct: false},
        { text: "Writing documentation", correct: false},
        { text: "Writing and testing code", correct: true},
        { text: "Managing project finances", correct: false},
      ]
    },
    {
      question: "Which programming language is commonly used for building dynamic web applications?",
      answers: [
        { text: "C++", correct: false},
        { text: "Java", correct: false},
        { text: "Python", correct: false},
        { text: "JavaScript", correct: true},
      ]
    }
  ];

  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");

  let currentQuestionIndex = 0;
  let score = 0;

  function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
  }

  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if(answer.correct){
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
  }

  function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }

  function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
      selectedBtn.classList.add("correct");
      score++;
    }
    else{
      selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
      if(button.dataset.correct === "true"){
        button.classList.add("correct");
      }
      
    });
    nextButton.style.display = "block";
  }

  function showScore(){
    
    questionElement.innerHTML = `You scored ${score} out of ${questons.length}!`; 
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
  }

  function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
      showQuestion();
    }else{
      showScore();
    }
  }

  nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
      handleNextButton();
    }else{
      startQuiz();
    }
  });

  startQuiz();
