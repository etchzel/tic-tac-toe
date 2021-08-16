import Controller from "./Controller.js";
import Gameboard from "./Gameboard.js";

const displayController = (() => {
    let _cells;
    let _gameMode = 'ai';
    let _aiTurn = false;

    const _sleep = (ms) => {
        _aiTurn = true;
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const _init = () => {
        const mainContainer = document.querySelector('.main-container');
        const board = Gameboard.init();
        const cells = Array.from(board.children);

        cells.forEach((cell) => {
            cell.addEventListener('click', (e) => {
                if (_aiTurn) return;
                const idx = +e.target.dataset.index;
                if (e.target.textContent !== '') return;
                Controller.playerMove(Gameboard, idx);
                _updateGameboard(cell, idx);
                _updateMessage(Controller.getRoundResult());

                if (_gameMode === 'ai') {
                    (async () => {
                        await _sleep(500);
                        _aiTurn = false;
                        const aiMoveIdx = Controller.aiMove(Gameboard);
                        if(isNaN(aiMoveIdx)) return;

                        const aiMoveCell = document.querySelector(
                            `.cell[data-index='${aiMoveIdx}']`
                        );
                        _updateGameboard(aiMoveCell, aiMoveIdx);
                        _updateMessage(Controller.getRoundResult());
                    })();
                };
            });
        });

        mainContainer.insertBefore(board, mainContainer.lastElementChild);
        _cells = cells;
    };

    const _updateGameboard = (cell, idx) => {
        if (!isNaN(Gameboard.getCell(idx))) return;
        cell.textContent = Gameboard.getCell(idx);
    };

    const _updateMessage = (message) => {
        const msg = document.querySelector('.game-message');
        msg.textContent = message;
    };

    const setGameMode = (mode) => {
        _gameMode = mode;
    };

    const resetDisplay = () => {
        Gameboard.clearBoard();
        Controller.reset();
        _cells.forEach((cell) => {
            cell.textContent = ''
        });
        _updateMessage(`Player X's turn`);
    };

    const _aiDisplayMove = async () => {
        await _sleep(500);
        _aiTurn = false;
        const aiMoveIdx = Controller.aiMove(Gameboard);
        if(isNaN(aiMoveIdx)) return;

        const aiMoveCell = document.querySelector(
            `.cell[data-index='${aiMoveIdx}']`
        );
        _updateGameboard(aiMoveCell, aiMoveIdx);
        _updateMessage(Controller.getRoundResult());
    };

    const updateSign = (sign) => {
        Controller.setPlayerSign(sign);

        if (Controller.getAiPlayer().getSign() === 'X') {
            _aiDisplayMove();
        } else {
            return;
        }
    };

    _init();

    return { setGameMode, resetDisplay, updateSign }    
})();

export default displayController;