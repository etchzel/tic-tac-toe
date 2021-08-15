import Controller from "./Controller.js";
import Gameboard from "./Gameboard.js";

const displayController = (() => {
    let _cells;

    const _init = () => {
        const mainContainer = document.querySelector('.main-container');
        const board = Gameboard.init();
        const cells = Array.from(board.children);

        cells.forEach((cell) => {
            cell.addEventListener('click', (e) => {
                const idx = +e.target.dataset.index;
                Controller.playerMove(Gameboard, idx);
                _updateGameboard(cell, idx);
                _updateMessage(Controller.getRoundResult());
            });
        });

        mainContainer.insertBefore(board, mainContainer.lastElementChild);
        _cells = cells;
    };

    const _updateGameboard = (cell, idx) => {
        cell.textContent = Gameboard.getCell(idx);
    };

    const _updateMessage = (message) => {
        const msg = document.querySelector('.message');
        msg.textContent = message;
    };

    const resetDisplay = () => {
        Gameboard.clearBoard();
        Controller.reset();
        _cells.forEach((cell) => {
            cell.textContent = ''
        });
        _updateMessage(`Player X's turn`);
    };

    _init();

    return { resetDisplay }    
})();

export default displayController;