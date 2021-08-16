const Gameboard = (() => {
    let _board = [...Array(9).keys()];

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
        _board = [...Array(9).keys()];
    };

    const setCell = (idx, playerSign) => {
        _board[idx] = playerSign;
    };

    const getCell = (idx) => {
        return _board[idx];
    };

    const getEmptyCells = () => {
        return _board.filter(c => c !== 'O' && c !== 'X');
    };

    return {
        getBoard,
        clearBoard,
        init,
        setCell,
        getCell,
        getEmptyCells
    };
})();

export default Gameboard;