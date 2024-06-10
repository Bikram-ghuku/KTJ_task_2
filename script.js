document.addEventListener('DOMContentLoaded', () => {
    var cells = []
    const turnIndicator = document.getElementById('turn-indicator');
    const resetButton = document.getElementById('reset-button');
    const gameBoardHTM = document.getElementById('game-board');
    const n = 3
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;


    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameBoard[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;

        checkResult();
    };

    const checkResult = () => {
        let roundWon = false;

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnIndicator.innerHTML = `Player ${currentPlayer}'s turn`;
    };

    const resetBoard = () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        turnIndicator.innerHTML = `Player X's turn`;
        cells.forEach(cell => cell.innerHTML = '');
    };

    const loadGame  = () => {
        for(var i = 0; i < n * n; i++){
            var newDiv = document.createElement("div");
            newDiv.classList.add("cell");
            newDiv.setAttribute("data-index", `${i}`);
            newDiv.onclick = handleCellClick;
            cells.push(newDiv)
            gameBoardHTM.appendChild(newDiv);
        }
        gameBoardHTM.style.gridTemplateColumns = `repeat(${n}, 100px)`
        gameBoardHTM.style.gridTemplateRows = `repeat(${n}, 100px)`
    }

    loadGame()
    resetButton.addEventListener('click', resetBoard);
});
