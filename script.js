const gameBoard = (function () {
    const _cells = [...document.querySelectorAll(".cell")];
    const _restartBtn = document.querySelector(".restart");
    const _board = ["", "", "", "", "", "", "", "", ""];
    const _markers = [...document.querySelectorAll(".icon")];
    const _returnBtn = document.querySelector(".return");
    const _mainContainer = document.querySelector(".main-container");
    const _overlay = document.querySelector(".overlay");

    const _renderContents = function () {
        for (let i = 0; i < 9; i++) {
            const className = `.span-${i}`;
            const cell = document.querySelector(className);
            cell.textContent = _board[i];
        }
    };

    const _placeIconPlayer = function (e) {
        const index = e.target.className.split(" ")[1].split("-")[1];
        let selectedMarker;

        for (let item of _markers) {
            if (item.classList.contains("selected")) {
                selectedMarker = item.className
                    .split(" ")[0]
                    .split("-")[0]
                    .toUpperCase();
                break;
            }
        }

        if (
            _board[index] === "" &&
            (selectedMarker === "X" || selectedMarker === "O")
        ) {
            _board[index] = selectedMarker;
            setTimeout(() => {}, 100);

            _checkForWin();
            _placeIconAI();
            _checkForWin();
        }
    };

    const selectMarker = function () {
        if (this.classList.contains("selected")) {
            this.classList.remove("selected");
        } else {
            _restartIcons();
            this.classList.toggle("selected");
            _clearBoard();
            _renderContents();
        }
    };

    const _restartIcons = function () {
        _markers.forEach(x => x.classList.remove("selected"));
    };

    const _restart = function () {
        _clearBoard();
        _renderContents();
        _restartIcons();
    };

    const _clearBoard = function () {
        for (let i = 0; i < 9; i++) {
            _board[i] = "";
        }
    };

    const _placeIconAI = function () {
        let randomIndex, iconPlayer, iconAI;

        for (let i = 0; i <= 1000; i++) {
            randomIndex = Math.trunc(Math.random() * 9);

            if (_board[randomIndex] === "") {
                break;
            }
        }

        for (let item of _markers) {
            if (item.classList.contains("selected")) {
                iconPlayer = item.className
                    .split(" ")[0]
                    .split("-")[0]
                    .toUpperCase();
                break;
            }
        }

        iconAI = iconPlayer === "X" ? "O" : "X";

        _board[randomIndex] = iconAI;
        _renderContents();
    };

    const _displayWinner = function (str) {
        const winnerText = document.querySelector(".winner-text");
        const overlay = document.querySelector(".overlay");

        winnerText.textContent =
            str !== "Tie" ? `The winner is ${str}` : "The game is draw";

        // mainContainer.classList.add("hidden");
        overlay.classList.remove("hidden");
    };

    const _return = function (e) {
        console.log(e.target.parentNode);
        if (e.target.className === "return") {
            const winnerText = document.querySelector(".winner-text");

            winnerText.textContent = "";
            _mainContainer.classList.remove("hidden");
            _overlay.classList.add("hidden");
            _restart();
        }
    };
    const _checkForWin = function () {
        let finished = true;
        let _winnerIcon = "";

        // CHECKING HORIZONTAL LINES
        for (let i = 0; i <= 6; i += 3) {
            if (_board[i] === _board[i + 1] && _board[i] === _board[i + 2]) {
                if (_board[i] !== "") {
                    _winnerIcon = _board[i];
                }
            }
        }

        // CHECKING VERTICAL LINES
        for (let i = 0; i <= 2; i++) {
            if (_board[i] === _board[i + 3] && _board[i] === _board[i + 6]) {
                if (_board[i] !== "") {
                    _winnerIcon = _board[i];
                }
            }
        }

        // CHECKING DIAGONAL LINES
        if (_board[2] === _board[4] && _board[2] === _board[6]) {
            if (_board[2] !== "") {
                _winnerIcon = _board[2];
            }
        }

        if (_board[0] === _board[4] && _board[0] === _board[8]) {
            if (_board[0] !== "") {
                _winnerIcon = _board[0];
            }
        }

        for (let item of _board) {
            if (item === "") {
                finished = false;
            }
        }

        if (_winnerIcon !== "") {
            _displayWinner(_winnerIcon);
        } else if (_winnerIcon === "" && finished) {
            _displayWinner("Tie");
        }
    };

    _cells.forEach(x => x.addEventListener("click", _placeIconPlayer));
    _restartBtn.addEventListener("click", _restart);
    _markers.forEach(x => x.addEventListener("click", selectMarker));
    _returnBtn.addEventListener("click", _return);
    _mainContainer.addEventListener("click", _return);
})();
