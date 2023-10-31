const game = (function(){
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    const updateGridItem = (turn, index) => {
        if (gameBoard[index] === '' && win === false && tie === false) {
          gameBoard[index] = turn.getSign();
          game.gameBoard[index] = turn.getSign();
        }
        loadGridItem();
      };
    const loadGridItem = () => {
        for(let i = 0; i < gameBoard.length; i++){
            gridItems[i].textContent = gameBoard[i];
        }
    }
    const getBoardSign = (index) => {
        return gameBoard[index];
    }
    const initBoard = () => {
        return gameBoard = ['', '', '', '', '', '', '', '', ''];
    }
    return {gameBoard, updateGridItem, loadGridItem, getBoardSign, initBoard};
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
const turnMsg = document.querySelector('#turnMsg');
const restart = document.querySelector('#restart');

const gameStart = (function(){
    let player1 = createPlayer('player1');
    let player2 = createPlayer('player2');
    let selectionPhase = true;
    let move = 0;
    
    const initGame = (event) => {
        if(event.target.className === 'X'){
            player1.giveSign('X');
            player2.giveSign('O');
        } else if(event.target.className === 'O'){
            player1.giveSign('O');
            player2.giveSign('X');
        }
    }
    return {player1, player2, selectionPhase, move, initGame}
})()

let turn = gameStart.player1;
let win = false;
let winnerRow = [];
let tie = false;
let winnerGrid1;
let winnerGrid2;
let winnerGrid3;
startBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        if(gameStart.selectionPhase){
            gameStart.initGame(event);
            gameStart.selectionPhase = false;
        }
    })
})

const checkWinner = () => {
    let winConditions = [[0, 1, 2],
                         [3, 4, 5], 
                         [6, 7, 8], 
                         [0, 3, 6], 
                         [1, 4, 7], 
                         [2, 5, 8], 
                         [0, 4, 8], 
                         [2, 4, 6]];
    for(let i = 0; i < winConditions.length; i++){
        let a = game.gameBoard[winConditions[i][0]];
        let b = game.gameBoard[winConditions[i][1]];
        let c = game.gameBoard[winConditions[i][2]];
        if(a !== '' && a === b && b === c){
            win = true;
            winnerRow = winConditions[i];
            turnMsg.textContent = `${a} is the Winner`
            return winnerRow;
        }
    }
    
}
const checkTie = () =>{
    if(gameStart.move === 9 && win === false){
        turnMsg.textContent = 'its a tie';
        tie = true;
        gridItems.forEach((item) => {
            item.style.backgroundColor = 'var(--tie)';
            item.style.transition = '1s';
        })
    }
}
const switchTurn = () => {
    if(turn === gameStart.player1 && turn.getSign() !== '' && tie === false){
        turn = gameStart.player2;
        turnMsg.textContent = `${gameStart.player2.getSign()}'s turn`;
    } else if(turn === gameStart.player2 && turn.getSign() !== '' && tie === false){
        turn = gameStart.player1;
        turnMsg.textContent = `${gameStart.player1.getSign()}'s turn`;
    }
}

let gridItems = document.querySelectorAll('.gridItem');
gridItems.forEach((button, index) => {
    button.addEventListener('click', () => {
        let sign = game.getBoardSign(index);
        game.updateGridItem(turn, index);
        if(sign === '' && gameStart.selectionPhase === false){
            switchTurn();
            gameStart.move++;
        }
        checkWinner();
        checkTie();
        game.updateGridItem(turn, index);
        if(win){
        winnerGrid1 = gridItems[winnerRow[0]];
        winnerGrid2 = gridItems[winnerRow[1]];
        winnerGrid3 = gridItems[winnerRow[2]];
        winnerGrid1.style.backgroundColor = 'var(--win)';
        winnerGrid2.style.backgroundColor = 'var(--win)';
        winnerGrid3.style.backgroundColor = 'var(--win)';
        winnerGrid1.style.transform = 'scale(1.02)';
        winnerGrid2.style.transform = 'scale(1.02)';
        winnerGrid3.style.transform = 'scale(1.02)';
        winnerGrid1.style.transition = '0.4s';
        winnerGrid2.style.transition = '0.8s';
        winnerGrid3.style.transition = '1.2s';
        }
    })
    game.loadGridItem();
})
const resetGame = () => {
    game.gameBoard = ['', '', '', '', '', '', '', '', ''];
    game.initBoard();
    gameStart.player1.giveSign('');
    gameStart.player2.giveSign('');
    gameStart.selectionPhase = true;
    gameStart.move = 0;
    turn = gameStart.player1;
    win = false;
    winnerRow = [];
    tie = false;
    turnMsg.textContent = 'choose starting player';
    game.loadGridItem();
    winnerGrid1.style.backgroundColor = '#FFFFFF';
    winnerGrid2.style.backgroundColor = '#FFFFFF';
    winnerGrid3.style.backgroundColor = '#FFFFFF';
}

restart.addEventListener('click', () => {
    resetGame();
    gridItems.forEach((item) => {
        item.style.backgroundColor = 'var(--primary)';
        item.style.transform = 'scale(1)';
    })
});