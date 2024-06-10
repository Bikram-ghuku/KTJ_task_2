document.addEventListener('DOMContentLoaded', () => {
    const turnIndicator = document.getElementById('turn-indicator');
    const resetButton = document.getElementById('reset-button');
    const gameBoardHTM = document.getElementById('game-board');
    const gridSizeEle = document.getElementById('grid-size-sel');
    const opponentSel = document.getElementById('opponent-sel');

    for (let i = 4; i <= 9; i++) {
        const ele = document.createElement('OPTION');
        ele.value = `${i}`;
        ele.innerHTML = `${i}x${i}`;
        gridSizeEle.appendChild(ele);
    }

    let n = 3;
    let currentPlayer = 'X';
    let gameBoard = Array(n).fill(null).map(() => Array(n).fill(''));
    let gameActive = true;
    let cells = [];

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        const rowIndex = Math.floor(clickedCellIndex / n);
        const colIndex = clickedCellIndex % n;

        if (gameBoard[rowIndex][colIndex] !== '' || !gameActive) {
            return;
        }

        gameBoard[rowIndex][colIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;

        checkResult();

        if (gameActive && opponentSel.value === 'computer') {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            turnIndicator.innerHTML = `Player ${currentPlayer}'s turn`;
            setTimeout(computerMove, 500);
        }
    };

    const computerMove = () => {
        if (!gameActive) return;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (gameBoard[i][j] === '') {
                    gameBoard[i][j] = currentPlayer;
                    const cellIndex = i * n + j;
                    cells[cellIndex].innerHTML = currentPlayer;
                    checkResult();
                    currentPlayer = 'X';
                    turnIndicator.innerHTML = `Player ${currentPlayer}'s turn`;
                    return;
                }
            }
        }
    };

    const checkResult = () => {
        const win = checkWinConditions();
        if (win) {
            turnIndicator.innerHTML = `Player ${currentPlayer} wins!`;
            gameActive = false;
            setTimeout(resetBoard, 5000);
            return;
        }

        const draw = gameBoard.flat().every(cell => cell !== '');
        if (draw) {
            turnIndicator.innerHTML = 'Draw!';
            gameActive = false;
            setTimeout(resetBoard, 5000);
            return;
        }
    };

    const checkWinConditions = () => {
        for (let i = 0; i < n; i++) {
            if (gameBoard[i].every(cell => cell === currentPlayer)) return true;
            if (gameBoard.every(row => row[i] === currentPlayer)) return true;
        }
        if (gameBoard.every((row, idx) => row[idx] === currentPlayer)) return true;
        if (gameBoard.every((row, idx) => row[n - idx - 1] === currentPlayer)) return true;

        return false;
    };

    const resetBoard = () => {
        gameActive = true;
        currentPlayer = 'X';
        turnIndicator.innerHTML = `Player X's turn`;
        gameBoard = Array(n).fill(null).map(() => Array(n).fill(''));
        loadGame();
    };

    const loadGame = () => {
        gameBoardHTM.innerHTML = '';
        cells = [];
        n = parseInt(gridSizeEle.value);

        for (let i = 0; i < n * n; i++) {
            const newDiv = document.createElement('div');
            newDiv.classList.add('cell');
            newDiv.setAttribute('data-index', `${i}`);
            newDiv.addEventListener('click', handleCellClick);
            cells.push(newDiv);
            gameBoardHTM.appendChild(newDiv);
        }

        gameBoardHTM.style.gridTemplateColumns = `repeat(${n}, 100px)`;
        gameBoardHTM.style.gridTemplateRows = `repeat(${n}, 100px)`;
    };

    gridSizeEle.addEventListener('change', loadGame);
    opponentSel.addEventListener('change', resetBoard);
    loadGame();
    resetButton.addEventListener('click', resetBoard);
});
