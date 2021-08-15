import Player from "./Player.js";

const Controller = (() => {
    const _playerA = Player('X');
    const _playerB = Player('O');
    let round = 1;
    let _isOver = false;
    let _roundResult = null;

    const getRoundResult = () => _roundResult;

    const getPlayerTurn = () => {
        return round % 2 === 1 ? _playerA : _playerB;
    };

    const _winByRow = (board) => {
        for (let i = 0; i < 3; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) row.push(board.getCell(j));

            if (row.every(e => e === 'X') || row.every(e => e === 'O')) {
                return true;
            };
        };

        return false;
    };

    const _winByColumn = (board) => {
        for (let i = 0; i < 3; i++) {
            let col = [];
            for (let j = 0; j < 3; j++) col.push(board.getCell(i+j*3));

            if (col.every(e => e === 'X') || col.every(e => e === 'O')) {
                return true;
            };
        };

        return false;
    };

    const _winByDiagonals = (board) => {
        const diagonals = {
            1: [board.getCell(0), board.getCell(4), board.getCell(8)],
            2: [board.getCell(2), board.getCell(4), board.getCell(6)]
        };

        for (const d in diagonals) {
            if (diagonals[d].every(e => e === 'X') ||
                diagonals[d].every(e => e === 'O')) return true;
        };

        return false;
    };

    const _checkWin = (board) => {
        if (_winByRow(board) || 
            _winByColumn(board) || 
            _winByDiagonals(board)) return true;

        return false;
    };

    const _checkDraw = (board) => {
        console.log(board);
        if (_checkWin(board)) return false;
        if (board.getBoard().includes(undefined)) return false;
        return true;
    };

    const playerMove = (board, idx) => {
        const cell = board.getCell(idx);
        if (_isOver || cell !== undefined) return;

        const player = getPlayerTurn();
        board.setCell(idx, player);
        if (_checkWin(board)) {
            console.log(`Player ${player.getSign()} win!`);
            _roundResult = `Player ${player.getSign()} win!`;
            _isOver = true;
            return;
        };

        if (_checkDraw(board)) {
            console.log(`It's a draw!`);
            _roundResult = `It's a draw!`;
            _isOver = true;
            return;
        };

        round++;
        _roundResult = `Player ${getPlayerTurn().getSign()}'s turn`;
    };

    const reset = () => {
        round = 1;
        _isOver = false;
    };

    return {
        getPlayerTurn,
        playerMove,
        reset,
        getRoundResult
    };
})();

export default Controller;
