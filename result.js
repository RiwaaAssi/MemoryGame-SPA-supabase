import { saveGameResult, gameId } from './supabase.js';

document.addEventListener("DOMContentLoaded", () => {
    const score_player1 = parseInt(localStorage.getItem('score_player1'));
    const score_player2 = parseInt(localStorage.getItem('score_player2'));
    console.log(score_player1, score_player2);
    const historyBtn = document.querySelector(".history-button");
    const modal = document.querySelector(".my-modal");
    const closeBtn = document.querySelector(".closeBtn");
    const showResult=document.querySelector(".show-result");

    let winner;
    let score;

    function CheckWinner() {
        if (score_player1 > score_player2) {
            winner = 'Player 1';
            score = score_player1;
        } else if (score_player1 < score_player2) {
            winner = 'Player 2';
            score = score_player2;
        } else {
            winner = 'Tie';
            score = 'N/A';
        }
    }

    CheckWinner();

    const win = document.querySelector(".winner h2");
    win.textContent = `The Winner is { ${winner} }`;

    const scoree = document.querySelector(".square-cards h3");
    scoree.textContent = `${score}`;

    historyBtn.addEventListener("click", (e) => {
        modal.classList.remove('d-none');
        populateHistory();
    });

    closeBtn.addEventListener("click", (e) => {
        modal.classList.add('d-none');
    });

    showResult.addEventListener("click", (e) => {
        showPage('game-Page-GameResult-FromDatabase');
    });

    
    

    function populateHistory() {
        const table = document.querySelector(".my-modal table");
        table.querySelectorAll('tr:not(:first-child)').forEach(row => row.remove());

        const gameHistory = JSON.parse(localStorage.getItem('gameHistory'));

        gameHistory.forEach(move => {
            let row = table.insertRow();
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell1.innerHTML = move.playerName;
            cell2.innerHTML = move.cardsNumber;
            cell3.innerHTML = move.success;

            // Save each move to Supabase
          //  saveGameResult(move.playerName, move.cardsNumber, move.success === 'True');
        });
    }
});
