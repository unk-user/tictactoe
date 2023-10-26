const game = (function(){
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    const updateGridItem = (turn, index) => {
        if(gameBoard[index] === ''){
            gameBoard[index] = turn.getSign();
        } 
        loadGridItem();
    }
    const loadGridItem = () => {    
        let gridItems = document.querySelectorAll('.gridItem');  
        for(let i = 0; i < gameBoard.length; i++){
            gridItems[i].textContent = gameBoard[i];
        }
    }
    return {gameBoard, updateGridItem, loadGridItem};
})();

function createPlayer(player) {
    player;
    let playerSign = '';
    const giveSign = (sign) => {
        playerSign = sign;
    }
    const getSign = () => playerSign;

    return {player, giveSign, getSign}
}

const startBtns = document.querySelectorAll('#startBtn');
const gameStart = (function(){
    let player1 = createPlayer('player1');
    let player2 = createPlayer('player2');
    let selectionPhase = true;
    
    const initGame = (event) => {
        if(event.target.className === 'X'){
            player1.giveSign('X');
            player2.giveSign('O');
        } else if(event.target.className === 'O'){
            player1.giveSign('O');
            player2.giveSign('X');
        }
    }
    return {player1, player2, selectionPhase, initGame}
})()

let turn = gameStart.player1;
startBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        if(gameStart.selectionPhase){
            gameStart.initGame(event);
            gameStart.selectionPhase = false;
        }
    })
})
const gridItems = document.querySelectorAll('.gridItem');
gridItems.forEach((button, index) => {
    button.addEventListener('click', () => {
        game.updateGridItem(turn, index);
        if(turn === gameStart.player1){
            turn = gameStart.player2
        } else if(turn === gameStart.player2){
            turn = gameStart.player1;
        }
    })
})


window.onload = game.loadGridItem();