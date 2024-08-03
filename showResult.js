import { getGameResults } from './supabase.js';

document.addEventListener("DOMContentLoaded", async () => {
    const table = document.querySelector(".results-table tbody");
    const gameResults = await getGameResults();
    
    let lastGameId = null;
    
    gameResults.forEach(result => {
        if (result.game_id !== lastGameId) {
            if (lastGameId !== null) {
                const spacerRow = table.insertRow();
                spacerRow.insertCell().colSpan = 4;  
                spacerRow.style.height = '20px'; 
                spacerRow.textContent="";
                
            }
            lastGameId = result.game_id;
        }
        
        const row = table.insertRow();
        row.insertCell(0).textContent = result.player_name;
        row.insertCell(1).textContent = result.cards_number;
        row.insertCell(2).textContent = result.success ? 'True' : 'False';
        row.insertCell(3).textContent = result.game_id;
    });
});




/*
import { getGameResults } from './supabase.js';

document.addEventListener("DOMContentLoaded", async () => {
    const table = document.querySelector(".results-table tbody");
    const gameResults = await getGameResults();

   
    gameResults.forEach(result => {
        const row = table.insertRow();
        row.insertCell(0).textContent = result.player_name;
        row.insertCell(1).textContent = result.cards_number;
        row.insertCell(2).textContent = result.success ? 'True' : 'False';
        row.insertCell(3).textContent = result.game_id;
    });
});*/
