/*jshint esversion: 6 */

const gameboard = (function (){
    let gameboard = [".",".",".",".",".",".",".",".","."];

    function placeShape (position, icon){
        if (position>8 || position<0){
            //Captures inputs outside range
            alert("Square must be placed inside grid!");
        }
        else if (gameboard[position] == "."){
            //Only allows placement on empty squares
            gameboard[position] = icon;
        }
        else{
            alert("Invalid selection!");
        }
    }
    function resetBoard () {
        gameboard = [".",".",".",".",".",".",".",".","."];
    }
    function printBoard () {
        for (let i=0; i<3; i++){
            //Provides console display
            console.log(gameboard[0 + 3*i],gameboard[1 + 3*i],gameboard[2 + 3*i]);
        }
    }
    function checkWin () {
        for (let j=0; j<3; j++){
            //Checks if winner on columns
            if (gameboard[j] != "." && (gameboard[j]==gameboard[j+3] && gameboard[j]==gameboard[j+3*2])){
                return gameboard[j];
            }
            //Checks if winner on rows
            if (gameboard[0 + 3*j] != "." && (gameboard[0 + 3*j]==gameboard[1 + 3*j] && gameboard[0 + 3*j]==gameboard[2 + 3*j])){
                return gameboard[j];
            }
            //Checks if winner on first diagonal
            if (gameboard[0] != "." && (gameboard[0] == gameboard[4] && gameboard[0]==gameboard[8])){
                return gameboard[0];
            }
            //Checks if winner on second diagonal
            if (gameboard[2] != "." && (gameboard[2] == gameboard[4] && gameboard[2]==gameboard[6])){
                return gameboard[0];
            }
        } 
        return false;
    }
    return { gameboard, placeShape, resetBoard, printBoard, checkWin };
});

function createUser (name, icon) {
    return { name, icon };  
}

const gameController = (function (){
    const board = gameboard();;
    let turnNum = 0;
    let players = [];
    let activePlayer = null;
    const setPlayers = (name1, name2) => {
        players = [createUser(name1, "X"), createUser(name2, "O")];
        activePlayer = players[0];
    };
    const getActivePlayer = () => activePlayer;
    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const printNewTurn = () => {
        console.log(`It is ${activePlayer.name}'s Turn!`);
    }
    const playTurn = (position) => {
        board.placeShape(position, activePlayer.icon);
        console.log(`Placing ${activePlayer.name}'s Shape!`);
        turnNum++;
        if(board.checkWin()){
            return `${activePlayer.name} Wins!`;
        }
        else if (turnNum==9){
            return "It's a tie!";
        }
        else{
            switchActivePlayer();
            printNewTurn();
            return null;
        }
    };
    const resetGame = () => {
        board.resetBoard();
        turnNum = 0;
        activePlayer = players[0];
    }
    return {
        playTurn, getActivePlayer, setPlayers, resetGame
    };
});

const displayController = (function (){
    const game = gameController();
    let name1 = prompt("Please enter your name, Player 1!", "Player 1");
    let name2 = prompt("Please enter your name, Player 2!", "Player 2");
    game.setPlayers(name1, name2);
    let result = null;
    let player1Card = document.getElementById('player1-score');
    let player2Card = document.getElementById('player2-score');
    player1Card.textContent = `${name1} (X): 0`;
    player2Card.textContent = `${name2} (O): 0`;
    let resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', () => {
        game.resetGame();
        resetButton.textContent = "Reset Game";
        result = null;
        let squares = document.querySelectorAll('.boardSquare');
        squares.forEach(square => {
            square.textContent = "";
            square.classList.remove('disabled');
        });
    });
    let squares = document.querySelectorAll('.boardSquare');
    squares.forEach(square => {
        square.addEventListener('click', () => {
            if(square.textContent === "" && !result){
                square.textContent = game.getActivePlayer().icon;
                result = game.playTurn(square.dataset.index);
                if (result){
                    alert(result);  
                    resetButton.textContent = "Start New Game";
                    if (result === "It's a tie!"){
                        return;
                    }
                    else if (game.getActivePlayer().icon === "X"){
                        let currentScore = parseInt(player1Card.textContent.split(": ")[1]);
                        currentScore++;
                        player1Card.textContent = `${name1} (X): ${currentScore}`;
                    }
                    else if (game.getActivePlayer().icon === "O"){
                        let currentScore = parseInt(player2Card.textContent.split(": ")[1]);
                        currentScore++;
                        player2Card.textContent = `${name1} (O): ${currentScore}`;
                    }
                    squares.forEach(sq => {
                        sq.classList.add('disabled');
                    });
                }
            }
        });
    });
})();
