const Gameboard = (() => {
    let _board = new Array(9);

    const init = () => {
        const container = document.createElement('div');
        container.classList.add('board');

        for (let i = 0; i < _board.length; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            container.appendChild(cell);
        };
        
        return container;
    };

    const getBoard = () => _board;

    const clearBoard = () => {
        _board = _board.map(elem => elem = undefined);
    };

    const setCell = (idx, player) => {
        _board[idx] = player.getSign();
    };

    const getCell = (idx) => {
        return _board[idx];
    };

    const getEmptyCellsIndex = (cellIndex) => {
        let cells = [];
        _board.forEach((elem) => {
            if (elem === undefined) cells.push(cellIndex);
        });
        return cells;
    };

    return {
        getBoard,
        clearBoard,
        init,
        setCell,
        getCell,
        getEmptyCellsIndex
    };
})();

export default Gameboard;