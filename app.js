const apiUrl = 'https://opentdb.com/api.php?amount=1';
const random = Math.floor(Math.random() * 4);

fetch(apiUrl).then((response) => response.json().then((qs) => {
    
    let answers = [
        qs.results[0].question
    ]

}))


// Shows the data


const question_data = document.querySelector('.question');
const answers = document.querySelectorAll('.res');

fetch(apiUrl).then((response) => response.json().then((question) => {

    console.log(question.results[0]);

    question_data.innerHTML = question.results[0].question;

    answers.innerText = question.results[0].question.incorrect

}))