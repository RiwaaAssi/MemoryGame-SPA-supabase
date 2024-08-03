import { saveGameResult, gameId } from './supabase.js';


setTimeout(() => {
    document.querySelector(".player1-play").style.backgroundColor = 'rgb(152, 209, 185)';
}, 1100);

let numbers = [];
for (let i = 1; i <= 9; i++) {
    numbers.push(i);
    numbers.push(i);
}
numbers = numbers.sort(() => Math.random() - 0.5);

function getRandomNumber() {
    if (numbers.length === 0) return null;
    return numbers.pop();
}

let currentPlayer = 'player1';
let openGrids = [];
let score_player1 = 0;
let score_player2 = 0;
let gameHistory = [];

function switchPlayer() {
    setTimeout(() => {
        if (currentPlayer === 'player1') {
            currentPlayer = 'player2';
            document.querySelector(".player1-play").style.removeProperty('background-color');
            document.querySelector(".player2-play").style.backgroundColor = 'rgb(152, 209, 185)';
        } else {
            currentPlayer = 'player1';
            document.querySelector(".player2-play").style.removeProperty('background-color');
            document.querySelector(".player1-play").style.backgroundColor = 'rgb(152, 209, 185)';
        }
    }, 1100);
}

function addGrids() {
    let gridHTML = '';

    for (let i = 1; i <= 18; i++) {
        const randomNumber = getRandomNumber();
        gridHTML += `
            <div class="grid-item">
                <button class="button">
                    <div class="square">
                        <div class="number${i}">
                            <h3>${randomNumber}</h3>
                        </div>
                    </div>
                </button>
            </div>
        `;
    }

    document.querySelector(".d-cards").innerHTML = gridHTML;

    const buttons = document.querySelectorAll(".button");
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const num = button.querySelector(`.number${index + 1}`);
            num.classList.remove(`number${index + 1}`);
            num.style.padding = "20px";

            const square = button.querySelector(".square");
            square.style.animation = 'none';
            square.style.transform = 'none';

            openGrids.push({ element: button, number: square.querySelector('h3').textContent });

            if (openGrids.length === 2) {
                checkMatch();
            }
        });
    });
}

function checkMatch() {
    const [firstCard, secondCard] = openGrids;
    let success = false;

    if (firstCard.number === secondCard.number) {
        firstCard.element.classList.add('matched');
        secondCard.element.classList.add('matched');
        success = true;

        if (currentPlayer === 'player1') {
            score_player1++;
        } else {
            score_player2++;
        }

        localStorage.setItem('score_player1', score_player1);
        localStorage.setItem('score_player2', score_player2);
    } else {
        setTimeout(() => {
            firstCard.element.querySelector(".square").style.animation = 'blink-animation 1s infinite';
            firstCard.element.querySelector(".square").style.transform = 'scale(1.05)';
            secondCard.element.querySelector(".square").style.animation = 'blink-animation 1s infinite';
            secondCard.element.querySelector(".square").style.transform = 'scale(1.05)';
            firstCard.element.querySelector("h3").parentElement.classList.add(`number${Array.from(document.querySelectorAll(".button")).indexOf(firstCard.element) + 1}`);
            secondCard.element.querySelector("h3").parentElement.classList.add(`number${Array.from(document.querySelectorAll(".button")).indexOf(secondCard.element) + 1}`);
        }, 1000);
    }

    gameHistory.push({
        playerName: currentPlayer === 'player1' ? 'Player 1' : 'Player 2',
        cardsNumber: `Opens Card ${firstCard.element.querySelector('h3').textContent} and ${secondCard.element.querySelector('h3').textContent}`,
        success: success ? 'True' : 'False'
    });

    saveGameResult(
        currentPlayer === 'player1' ? 'Player 1' : 'Player 2',
        `Opens Card ${firstCard.element.querySelector('h3').textContent} and ${secondCard.element.querySelector('h3').textContent}`,
        success
    );

    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));

    openGrids = [];

    if (document.querySelectorAll('.matched').length === 18) {
        setTimeout(() => {
            showPage('result-page');
        }, 500);
    }

    switchPlayer();
}

document.addEventListener("DOMContentLoaded", addGrids);
