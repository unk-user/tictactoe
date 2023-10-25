const game = (function(){
    let gameBoard = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    const displayController = (playerSign, i, j) => {
        return gameBoard[i][j] = playerSign;
    }
    return {gameBoard, displayController};
})();

function createPlayer (player) {
    player;
    let playerSign = '';
    const giveSign = (sign) => {
        if(sign === 'X' || sign === 'O'){
            playerSign += sign;
        }
    }
    const getSign = () => playerSign;

    return {player, giveSign, getSign}
}

let gridItems = document.querySelectorAll('.gridItem');
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        gridItems[i * 3 + j].textContent = game.gameBoard[i][j];
    }
}
