
//Display the score on the end page
const totalScore = localStorage.getItem('score');
const scoreText = document.querySelector('.score');

console.log(totalScore);

scoreText.innerText = `${totalScore}`;



const saveBtn = document.querySelector('.save-btn');
const nameInput = document.querySelector('.name-input');

saveBtn.addEventListener('click', () => {
    localStorage.setItem('name', `${nameInput.value}`);

})

