import Controller from "./Controller.js";

const AILogic = (() => {

    const minimax = (newBoard, playerSign) => {

        // get empty cells 
        const availableMove = newBoard.filter(c => !isNaN(c));
        const humanPlayerSign = Controller.getHumanPlayer().getSign();
        const aiPlayerSign = Controller.getAiPlayer().getSign();
        
        if (Controller.checkWin(newBoard)) {

            if (playerSign === humanPlayerSign) {
                return {score: 10};
            } else if (playerSign === aiPlayerSign) {
                return {score: -10}; 
            };

        } else if (availableMove.length === 0) {
            return {score: 0};
        };
    
        // array to collect all the move objects
        let moves = [];
    
        // loop through available spots
        availableMove.forEach((spot) => {
    
            // create object for each spot and store the index
            let move = {};
            move.index = spot;
    
            // set the empty spot to the current player
            newBoard[spot] = playerSign;
    
            /* collect the score resulted from calling minimax
               on the opponent of the current player */
            if (playerSign === aiPlayerSign) {
                const result = minimax(newBoard, humanPlayerSign);
                move.score = result.score;
            } else {
                const result = minimax(newBoard, aiPlayerSign);
                move.score = result.score;
            };
    
            // reset the spot to empty
            newBoard[spot] = move.index;
    
            // push the object to the array
            moves.push(move);
        });

        // find best move
        let bestMove;
        if (playerSign === aiPlayerSign) {
            let bestScore = -10000;
            moves.forEach((move, index) => {
                if (move.score > bestScore) {
                    bestScore = move.score;
                    bestMove = index;
                };
            });
        } else {
            let bestScore = 10000;
            moves.forEach((move, index) => {
                if (move.score < bestScore) {
                    bestScore = move.score;
                    bestMove = index;
                };
            });
        };
    
        return moves[bestMove];
    };

    return {
        minimax,
    };

})();

export default AILogic;
