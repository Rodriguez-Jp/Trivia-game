const API_URL = 'https://opentdb.com/api.php?amount=10&category=9&type=multiple'
fetch(API_URL).then(response => response.json()).then(data => {
    const questions = [...data.results];

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
            localStorage.setItem('score', `${JSON.stringify(score)}`);
            return window.location.assign('./endPage.html');        
        }
        questionCounter++;
        const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        question.innerHTML = currentQuestion.question;

        availableQuestions.splice(questionIndex, 1);

        acceptingAnswers = true;


        // Create the answers array and sort it randomly for display


        const formattedAnswers = [...currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer)];

        for(let i = 0; i < choices.length; i++){
            let answerIndex = Math.floor(Math.random() * formattedAnswers.length);
            choices[i].innerHTML = `${formattedAnswers[answerIndex]}`;
            formattedAnswers.splice(answerIndex, 1);
        }

        choices.forEach((choice) => {
            choice.addEventListener('click', (e) =>{
                e.preventDefault();
                e.stopImmediatePropagation();


                if(!acceptingAnswers) return;

                acceptingAnswers = false

                const selectedChoice = e.target;

                const classToApply = selectedChoice.innerHTML == currentQuestion.correct_answer ? 'correct' : 'incorrect';

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


                     evaluateAnswer(selectedChoice.innerHTML, currentQuestion.correct_answer);

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
});


