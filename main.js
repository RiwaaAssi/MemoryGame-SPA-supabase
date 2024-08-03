document.addEventListener("DOMContentLoaded", function() {
    const app = document.getElementById('app');

    // Create and add the home page
    const homePage = createHomePage();
    app.appendChild(homePage);

    // Create and add the game page
    const gamePage = createGamePage();
    app.appendChild(gamePage);

    // Create and add the result page
    const resultPage = createResultPage();
    app.appendChild(resultPage);

    const resultPageFromDatabase = createGameResultFromDatabase();
    app.appendChild(resultPageFromDatabase);

    // Show the home page initially
    showPage('home-page');
});

function createHomePage() {
    const homePage = document.createElement('section');
    homePage.id = 'home-page';
    homePage.classList.add('page');

    homePage.innerHTML = `
        <div class="Text-line">
            <h1 class="overlay-text">Memory Game</h1>
            <div class="line"></div>
        </div>
        <div class="player1-player2">
            <h3>Player1</h3>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="50px" height="50px">
                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
            </svg>
            <h3>Player2</h3>
        </div>
        <div class="next">
            <button class="button-next" onclick="showPage('game-page')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="35px" height="35px">
                    <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l137.3 137.3L58.6 372.6c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                </svg>
            </button>
        </div>
    `;

    return homePage;
}

function createGamePage() {
    const gamePage = document.createElement('section');
    gamePage.id = 'game-page';
    gamePage.classList.add('page');
    gamePage.style.display = 'none'; // Initially hidden

    gamePage.innerHTML = `
        <div class="memory-game">
            <div class="players">
                <div class="player1-play"><h3>Player 1</h3></div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="50px" height="50px">
                    <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
                </svg>
                <div class="player2-play"><h3>Player 2</h3></div>
            </div>
            <div class="cards">
                <div class="d-cards"></div>
            </div>
        </div>
    `;

    return gamePage;
}

function createResultPage() {
    const resultPage = document.createElement('section');
    resultPage.id = 'result-page';
    resultPage.classList.add('page');
    resultPage.style.display = 'none'; // Initially hidden

    resultPage.innerHTML = `
        <div class="three-page">
            <div class="result"><h3>The Result</h3> 
            </div>
            <div class="result-square">
                <div class="winner">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="35px" height="35px">
                        <path d="M400 0L176 0c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8L24 64C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9L192 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-26.1 0C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24L446.4 64c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112l84.4 0c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6l84.4 0c-5.1 66.3-31.1 111.2-63 142.3z"/>
                    </svg>
                    <h2>The Winner is {}</h2>
                </div>
                <div class="num-cards">
                    <div class="parg"><p>Number of correct cards:</p></div>
                    <div class="square-cards"><h3></h3></div>
                </div>
                <div class="history">
                    <button class="history-button">
                        <p>History</p>
                        <div class="next-to-history">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="27px" height="25px">
                                <path d="M160 368c26.5 0 48 21.5 48 48l0 16 72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6L448 368c8.8 0 16-7.2 16-16l0-288c0-8.8-7.2-16-16-16L64 48c-8.8 0-16 7.2-16 16l0 288c0 8.8 7.2 16 16 16l96 0zm48 124l-.2 .2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3l0-21.3 0-6.4 0-.3 0-4 0-48-48 0-48 0c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L448 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-138.7 0L208 492z"/>
                            </svg>
                        </div>
                    </button>
                </div>
                <button class="show-result"><h5>Show Data From Supabase</h5></button>
            </div>
        </div>
        <div class="my-modal d-none">
            <div class="table-close">
                <svg class="closeBtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="15px" height="15px">
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                </svg>
                <table border="1">
                    <tr>
                        <td>Player Name</td>
                        <td>Cards Number</td>
                        <td>Success</td>
                    </tr>
                    <!-- History rows will be added dynamically -->
                </table>
            </div>
        </div>
    `;

    return resultPage;
}

function createGameResultFromDatabase() {
    const gamePageGameResultFromDatabase = document.createElement('section');
    gamePageGameResultFromDatabase.id = 'game-Page-GameResult-FromDatabase';
    gamePageGameResultFromDatabase.classList.add('page');
    gamePageGameResultFromDatabase.style.display = 'none'; // Initially hidden

    gamePageGameResultFromDatabase.innerHTML = `
    <div>
   
    <h1>Game Results From Database</h1>
    <table class="results-table" border="1" >
        <thead>
            <tr>
                <td>Player Name</td>
                <td>Cards Number</td>
                <td>Success</td>
                <td>Game ID</td>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>

</div>
    `;

    return gamePageGameResultFromDatabase;
}
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

