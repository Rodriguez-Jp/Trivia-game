
const scoreList = JSON.parse(localStorage.getItem('HighScores'));

//In case there are no scores yet
if (scoreList === null){
    setTimeout( () => {
        alert('There are no highscores yet, play to list yours!');
    }, 1200)
    
} 

// Sort the list based on the score
function compare(a,b) { return b.score - a.score };
scoreList.sort(compare);


//Append the scores to the leaderboard
const table = document.querySelector('.table');


for (let i = 0; i < scoreList.length; i++){
    const tr  = document.createElement('tr');
    let thRank = document.createElement('th');
    let thName = document.createElement('th');
    let thScore = document.createElement('th');
    thRank.innerHTML = `${i + 1}`;
    thName.innerHTML = scoreList[i].name;
    thScore.innerHTML = scoreList[i].score;
    tr.appendChild(thRank);
    tr.appendChild(thName);
    tr.appendChild(thScore);
    table.appendChild(tr);
}





//Deletes all the localStorage data and clear the leaderboard
const clearBtn = document.querySelector('.clear-btn');

clearBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.reload(true);
})




