import AILogic from "./aiController.js";
import Player from "./Player.js";

const Controller = (() => {
    let _playerA = Player('X');
    let _playerB = Player('O');
    const _aiLogic = AILogic;
    let round = 1;
    let _isOver = false;
    let _roundResult = null;

    const setPlayerSign = (sign) => {
        _playerA = Player(sign);
        if (sign === 'X') {
            _playerB = Player('O');
        } else {
            _playerB = Player('X');
        };
    };
    
    const getRoundResult = () => _roundResult;

    const getPlayerTurn = () => {
        if (_playerA.getSign() === 'X')
            return round % 2 === 1 ? _playerA : _playerB;
        return round % 2 === 1 ? _playerB : _playerA;
    };

    const getHumanPlayer = () => _playerA;
    const getAiPlayer = () => _playerB;

    const checkWin = (board) => {
        const winningLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        const win = winningLines.some((line) => {
            return (line.every(i => board[i] === 'O') ||
                    line.every(i => board[i] === 'X'));
        });

        return win;
    };

    const checkDraw = (board) => {
        if (board.some(cell => !isNaN(cell))) return false;
        return true;
    };

    const playerMove = (boardObj, idx) => {
        const cell = boardObj.getCell(idx);
        if (_isOver || isNaN(cell)) return;

        const playerSign = getPlayerTurn().getSign();
        boardObj.setCell(idx, playerSign);

        const board = boardObj.getBoard();
        if (checkWin(board)) {
            console.log(`Player ${playerSign} win!`);
            _roundResult = `Player ${playerSign} win!`;
            _isOver = true;
            return;
        };

        if (checkDraw(board)) {
            console.log(`It's a draw!`);
            _roundResult = `It's a draw!`;
            _isOver = true;
            return;
        };

        round++;
        _roundResult = `Player ${getPlayerTurn().getSign()}'s turn`;
    };

    const aiMove = (boardObj) => {
        if (_isOver) return undefined;
        const idx = _aiLogic.minimax(
            boardObj.getBoard(), 
            getAiPlayer().getSign()
        ).index;

        playerMove(boardObj, idx);
        return idx;
    };

    const reset = () => {
        round = 1;
        _isOver = false;
        _roundResult = null;
    };

    return {
        setPlayerSign,
        getPlayerTurn,
        getHumanPlayer,
        getAiPlayer,
        checkWin,
        checkDraw,
        playerMove,
        aiMove,
        reset,
        getRoundResult
    };
})();

export default Controller;
