const supabaseUrl = 'https://zqzrrfhzvjoukotmqupw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxenJyZmh6dmpvdWtvdG1xdXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIzMjQ1NDEsImV4cCI6MjAzNzkwMDU0MX0.Ljxwrd8HqP05A4oSx1ozgnV_GjMU2Hw8SXiSGLjacEc';
const tableName = 'game_results'; 

export const gameId = new Date().getTime(); 

export async function saveGameResult(playerName, cardsNumber, success) {
    const response = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
        method: 'POST',
        headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation' 
        },
        body: JSON.stringify({
            player_name: playerName,
            cards_number: cardsNumber,
            success: success,
            game_id: gameId 
           
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Error saving game result:', errorData);
    } else {
        const result = await response.json();
        console.log('Game result saved:', result);
    }
}


export async function getGameResults() {
    const response = await fetch(`${supabaseUrl}/rest/v1/${tableName}?select=*`, {
        headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching game results:', errorData);
        return [];
    }

    return response.json();
}

