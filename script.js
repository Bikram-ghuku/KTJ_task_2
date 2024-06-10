document.addEventListener('DOMContentLoaded', () => {
    var cells = []
    const turnIndicator = document.getElementById('turn-indicator');
    const resetButton = document.getElementById('reset-button');
    const gameBoardHTM = document.getElementById('game-board');
    const gridSizeEle = document.getElementById('grid-size-sel');
    for(var i = 4; i < 10; i++){
        var ele = document.createElement("OPTION")
        ele.value = `${i}`
        ele.innerHTML = `${i}x${i}`
        gridSizeEle.appendChild(ele)
    }
    var n = 3
    let currentPlayer = 'X';
    let gameBoard = Array(n).fill(null).map(() => Array(n).fill(''));
    let gameActive = true;

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
            setTimeout(resetBoard, 5000);
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnIndicator.innerHTML = `Player ${currentPlayer}'s turn`;
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
        loadGame();
        gameBoard = Array(n).fill(null).map(() => Array(n).fill(''));
    };

    const loadGame  = () => {
        gameBoardHTM.innerHTML = ''
        n = gridSizeEle.value
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
    gridSizeEle.onclick = loadGame
    loadGame()
    resetButton.addEventListener('click', resetBoard);
});
