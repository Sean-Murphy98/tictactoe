const gameboard = (function (){
    let gameboard = [".",".",".",".",".",".",".",".","."];
    function placeShape (position, icon){
        if (position>8 || position<0){
            alert("Square must be placed inside grid!");
        }
        else if (gameboard[position] == "."){
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
            console.log(gameboard[0 + 3*i],gameboard[1 + 3*i],gameboard[2 + 3*i])
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
        return null;
    }
    return { gameboard, placeShape, resetBoard, printBoard, checkWin };
})

function createUser (name, icon) {
    return { name, icon }
}

const gameController = (function (){
    const board = gameboard();
    let name1 = prompt("Please enter your name, Player 1!");
    const user1 = createUser(name1, "X");
    let name2 = prompt("Please enter your name, Player 2!");
    const user2 = createUser(name2, "O");
    let turnNum = 0;
    const players = [user1, user2];
    let activePlayer = players[0];
    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const printNewTurn = () => {
        console.log(`It is ${activePlayer.name}'s Turn!`)
        board.printBoard()
    }
    const playTurn = (position) => {
        board.placeShape(position, activePlayer.icon);
        console.log(`Placing ${activePlayer.name}'s Shape!`);
        turnNum++;
        if(board.checkWin()){
            console.log(`${activePlayer.name} Wins!`);
            board.resetBoard();
            printNewTurn();
            activePlayer = players[0];
            turnNum = 0;
            return
        }
        else if (turnNum==9){
            console.log("It's a tie!");
            board.resetBoard();
            printNewTurn();
            turnNum = 0;
            return
        }
        switchActivePlayer();
        printNewTurn();
    }
    printNewTurn();
    return {
        playTurn, activePlayer
    }
})

const game = gameController();
