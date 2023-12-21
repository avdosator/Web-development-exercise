const player1Button = document.querySelector('#player1Bttn');
const player2Button = document.querySelector('#player2Bttn');
const resetButton = document.querySelector('#reset');
const player1Score = document.querySelector('#player1Score');
const player2Score = document.querySelector('#player2Score');
const maxSelect = document.querySelector('#maxScore');

let player1 = 0;
let player2 = 0;
let max = parseInt(maxSelect.value);
let isAtMax = false;

player1Button.addEventListener('click', function() {
    if(isAtMax == false) {
        player1++;
        if(player1 === max) {
            isAtMax = true;
            player1Score.classList.add('win');
            player2Score.classList.add('loose');
            disableButtons();
        }
        player1Score.textContent = player1;
    }   
})

player2Button.addEventListener('click', function() {
    if(isAtMax == false) {
        player2++;
        if (player2 === max) {
            isAtMax = true;
            player2Score.classList.add('win');
            player1Score.classList.add('loose');
            disableButtons();
        }
        player2Score.textContent = player2;
    }
})

resetButton.addEventListener('click', resetScore);

maxSelect.addEventListener('change', function() {
    max = parseInt(this.value);
    resetScore();
})


function resetScore() {
    player1Score.textContent = 0;
    player2Score.textContent = 0;
    player1 = 0;
    player2 = 0;
    isAtMax = false;
    player1Score.classList.remove('win', 'loose');
    player2Score.classList.remove('win', 'loose');
    enableButtons();
}

function disableButtons() {
    player1Button.disabled = true;
    player2Button.disabled = true;
}

function enableButtons() {
    player1Button.disabled = false;
    player2Button.disabled = false;
}