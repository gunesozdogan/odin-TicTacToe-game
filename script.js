const gameBoard = (function () {
    const _cells = [...document.querySelectorAll(".cell")];
    const _restartBtn = document.querySelector(".restart");
    const board = [[], [], []];

    const renderContents = function () {
        for (let i = 0; i < board.length; i++) {
            for (let ii = 0; ii < board[0].length; ii++) {
                const className = `.span-${i}-${ii}`;
                const cell = document.querySelector(className);
                cell.textContent = board[i][ii];
            }
        }
    };

    const _changeContent = function (e) {
        const row = e.target.className.split(" ")[1].split("-")[1];
        const col = e.target.className.split(" ")[1].split("-")[2];
        board[row][col] = "X";
        renderContents();
    };

    const restart = function () {
        for (let i = 0; i < board.length; i++) {
            for (let ii = 0; ii < board[0].length; ii++) {
                board[i][ii] = "";
            }
        }
        renderContents();
    };

    _cells.forEach(x => x.addEventListener("click", _changeContent));
    _restartBtn.addEventListener("click", restart);
    return { board, renderContents };
})();
