document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const turnIndicator = document.getElementById('turn-indicator');
    const resetButton = document.getElementById('reset-button');
    const gameBoardHTM = document.getElementById('game-board');
    const n = 3
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const loadGame  = () => {
        for(var i = 0; i < n * n; i++){
            var newDiv = document.createElement("div");
            newDiv.classList.add("cell");
            newDiv.setAttribute("data-index", `${i}`);
            gameBoardHTM.appendChild(newDiv);
        }
        gameBoardHTM.style.gridTemplateColumns = `repeat(${n}, 100px)`
        gameBoardHTM.style.gridTemplateRows = `repeat(${n}, 100px)`
    }

    loadGame()
     
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

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

        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameBoard[winCondition[0]];
            let b = gameBoard[winCondition[1]];
            let c = gameBoard[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }

            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            turnIndicator.innerHTML = `Player ${currentPlayer} wins!`;
            gameActive = false;
            setTimeout(resetBoard, 5000);
            return;
        }

        let roundDraw = !gameBoard.includes('');
        if (roundDraw) {
            turnIndicator.innerHTML = 'Draw!';
            setTimeout(resetBoard, 5000);
            return;
        }

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

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetBoard);
});
