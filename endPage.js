//Create the initial array in case that does not exist

let scoreList;
const highScoresRaw = localStorage.getItem('HighScores');

if (highScoresRaw === 'undefined' || highScoresRaw === null ){
    scoreList = []
    localStorage.setItem('HighScores', '[]');
}else{
      scoreList = JSON.parse(highScoresRaw);
}

console.log(localStorage.getItem('HighScores'));
console.log(scoreList);

//Display the score on the end page
const totalScore = localStorage.getItem('score');
const scoreText = document.querySelector('.score');
scoreText.innerText = totalScore == null ? '0' : `${totalScore}`;


//Save the data on the local storage array

const saveBtn = document.querySelector('.save-btn');
const nameInput = document.querySelector('.name-input');

saveBtn.addEventListener('click', () => {

    const addUser = {
       name: nameInput.value,
       score: totalScore
    }
    
    //Make the save button non clickeable again
    saveBtn.style.pointerEvents = 'none';
    saveBtn.style.opacity = '0.7';

    scoreList.push(addUser);
    console.log(scoreList);
    localStorage.setItem('HighScores', JSON.stringify(scoreList));

})



