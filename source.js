const gameboard = (function (){
    let gameboard = ["","","","","","","","",""];
    let length = gameboard.length;
    let rowSize = Math.sqrt(length);
    function placeShape (position, icon){
        if (position>8 || position<0){
            alert("Square must be placed inside grid!");
        }
        else if (gameboard[position] == ""){
            gameboard[position] = icon;
        }
        else{
            alert("Invalid selection!");
        }
    }
    function printBoard () {
        for (let i=0; i<rowSize; i++){
            console.log(gameboard[0 + rowSize*i],gameboard[1 + rowSize*i],gameboard[2 + rowSize*i])
        }
    }
    return { gameboard, placeShape, printBoard };
})

function createUser (name, icon) {
    return { name, icon }
}

const gameController = (function (){
    const board = gameboard();
    const user1 = createUser("User1", "X");
    const user2 = createUser("User2", "O");
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
        board.placeShape(position, activePlayer.icon)
        console.log(`Placing ${activePlayer.name}'s Shape!`)
        switchActivePlayer();
        printNewTurn();
    }
    printNewTurn();
    return {
        playTurn, activePlayer
    }
})

const game = gameController();