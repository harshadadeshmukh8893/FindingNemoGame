const buttons = document.querySelectorAll('.game-button');
const resultMessage = document.getElementById('result-message');
const chancesDisplay = document.getElementById('chances');
const refreshButton = document.getElementById('refresh-button');

let nemoButtonIndex;
let chances = 5;
let gameActive = true;

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (!gameActive || button.disabled) {
            return;
        }

        if (index === nemoButtonIndex) {
            button.style.backgroundImage = 'url("nemo.png")';
            button.style.backgroundSize = 'contain';
            resultMessage.textContent = 'Congratulations, you found Nemo!';
            endGame();
        } else {
            chances--;
            chancesDisplay.textContent = chances;
            if (chances === 0) {
                resultMessage.textContent = 'Sorry, you lost!';
                disableButtons();
            } else {
                button.textContent = '❌';
                button.style.backgroundColor = 'red';
            }
        }

        button.disabled = true;
    });
});

refreshButton.addEventListener('click', () => {
    resetGame();
});

function resetGame() {
    chances = 5;
    chancesDisplay.textContent = chances;
    resultMessage.textContent = '';
    gameActive = true;

    buttons.forEach(button => {
        button.disabled = false;
        button.style.backgroundImage = '';
        button.textContent = '';
        button.classList.remove('missed'); // Remove missed class
        button.style.backgroundColor = 'rgb(44, 195, 201)';
    });

    nemoButtonIndex = Math.floor(Math.random() * buttons.length);
}

function endGame() {
    gameActive = false;
    buttons.forEach(button => {
        button.disabled = true;
    });
}

function disableButtons() {
    buttons.forEach(button => {
        button.disabled = true;
    });
}

resetGame(); // Start the game when the page loads
