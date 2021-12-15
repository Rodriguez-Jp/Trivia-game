const questions = [
    {
        question: "How many cores does the Ryzen 5 1600 has?",
        choice1: 4,
        choice2: 48,
        choice3: 8,
        choice4: 6,
        answer: 4
    },

    {
        question: "What is the name of the creator of linux?",
        choice1: "Linus Anaximandrus",
        choice2: "Ellen page",
        choice3: "Linus Torvalds",
        choice4: "Liotonell Nustex",
        answer: 3
    },

    {
        question: "Who creates Microsoft?",
        choice1: "Bill Gates",
        choice2: "Larry page",
        choice3: "Warren Buffet",
        choice4: "Steven Spielberg",
        answer: 1
    },

    {
        question: "What is the most used linux distro?",
        choice1: "Ubuntu",
        choice2: "MX Linux",
        choice3: "Arch linux",
        choice4: "Linux mint",
        answer: 2
    },

    {
        question: "Name of the first computer company?",
        choice1: "IBM",
        choice2: "Apple",
        choice3: "The Electronic Controls Company",
        choice4: "Hewlett-Packard",
        answer: 3
    },

    {
        question: "Which part of the computer fetches, decodes, and executes the programming instructions??",
        choice1: "Preprocessor",
        choice2: "CPU",
        choice3: "GPU",
        choice4: "RAM Memory",
        answer: 2
    },

    {
        question: "Which of the next is written in camelCase?",
        choice1: "MyVariable",
        choice2: "my_Variable",
        choice3: "MyVaRiAbLe",
        choice4: "myVariable",
        answer: 4
    },

    {
        question: "In JavaScript which of the next one answers are NOT a function?",
        choice1: "function myFunction(x){}",
        choice2: "myFunction = (x) => {}",
        choice3: "function myFunction x {}",
        choice4: "MyFunction = x => {}",
        answer: 3
    },

    {
        question: "How do we select items in JavaScript?",
        choice1: "document.selectItems(item)",
        choice2: "document.querySelectorItem(item)",
        choice3: "document.querySelectorAll(item)",
        choice4: "window.body.document.querySelector(item)",
        answer: 3
    },

        {
        question: "Name of the creator of Apple?",
        choice1: "Juan Pablo Montoya",
        choice2: "Steve Jobs",
        choice3: "Jean Paul Sartre",
        choice4: "Orslok",
        answer: 2
    }
]

const question = document.querySelector('.question');
const choices = Array.from(document.querySelectorAll('.res'));
const scoreText = document.querySelector('.score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const CORRECT_ANSWER = 10;
const MAX_QUESTIONS = 10;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}


getNewQuestion= () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('score', `${score}`);
        return window.location.assign('./endPage.html');        
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;


    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;

    choices.forEach((choice) => {
        choice.addEventListener('click', (e) =>{
            e.preventDefault();
            e.stopImmediatePropagation();

            if(!acceptingAnswers) return;

            acceptingAnswers = false

            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];

            const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
            
            selectedChoice.classList.add(classToApply);

            setTimeout( () => {

                 selectedChoice.classList.remove(classToApply);

                 //Change the question number
                 const numOfQuestion = document.querySelector('.number-questions');
                    
                 numOfQuestion.innerText = questionCounter + 1;
                    
                    
                 //Functionality of the progress bar
                 const progressBar = document.querySelector('.progress');
                 let percentage = 100 - ((availableQuestions.length / MAX_QUESTIONS) * 100); 
                 progressBar.style.width = `${percentage}%`;


                 evaluateAnswer(selectedAnswer, currentQuestion.answer);

                 getNewQuestion();

            }, 800)            

        })
        
    })
}

// Evaluates the answer and display it 
evaluateAnswer = (selected, answer) => {


    if (selected == answer){
        score += CORRECT_ANSWER;
        scoreText.innerText = `${score}`;
    }else{
        score -= CORRECT_ANSWER;
        scoreText.innerText = `${score}`;
    }

    if (score < 0){
        scoreText.style.color = '#F00';
    }else{
        scoreText.style.color = '#09F';
    }
}

startGame();