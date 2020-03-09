export const initializeGrid = () => {
    let grid = [];
    let gridNumber = 1;
    for(let outerGrid = 0; outerGrid < 3; outerGrid++){
        let currentGrid = [];
        
        for(let innerGrid = 0; innerGrid < 3; innerGrid++){
            currentGrid = [...currentGrid, {
                value: null,
                isInWin: false,
                considered: false,
                gridNumber,
            }]
            gridNumber++;
        }

        grid = [...grid, currentGrid];
    }

    return grid;
}

export const handleUserClick = (currentGrid, gridNumber, turn) => {
    let gridCopy = currentGrid;
    currentGrid.forEach(
        (row, rowIndex) => {
            row.forEach(
                (square, squareIndex) => {
                    if(gridNumber == square.gridNumber){
                        gridCopy[rowIndex][squareIndex].value = turn
                    }
                }
            )
        }
    );

    return gridCopy;
}

export const checkForWin = (currentGrid) => {
    let winStatus = {
        win: false,
        winner: null,
        inWin: [],
        draw: false,
    }

    let grid = currentGrid;

    //the following code will check for a win in all tic tac toe win scenario possibilities
    //first row
    if(grid[0][0].value && grid[0][1].value && grid[0][2].value 
        && grid[0][0].value === grid[0][1].value
        && grid[0][1].value === grid[0][2].value){
            winStatus.win = true;
            winStatus.winner = grid[0][0].value;
            winStatus.inWin = [
            grid[0][0].gridNumber,
            grid[0][1].gridNumber,
            grid[0][2].gridNumber,
            ];
        }
    
    //second row
    if(grid[1][0].value && grid[1][1].value && grid[1][2].value 
        && grid[1][0].value === grid[1][1].value
        && grid[1][1].value === grid[1][2].value){
            winStatus.win = true;
            winStatus.winner = grid[1][0].value;
            winStatus.inWin = [
                grid[1][0].gridNumber,
                grid[1][1].gridNumber,
                grid[1][2].gridNumber,
                ];
        }

    //third row
    if(grid[2][0].value && grid[2][1].value && grid[2][2].value 
        && grid[2][0].value === grid[2][1].value
        && grid[2][1].value === grid[2][2].value){
            winStatus.win = true;
            winStatus.winner = grid[2][0].value;
            winStatus.inWin = [
                grid[2][0].gridNumber,
                grid[2][1].gridNumber,
                grid[2][2].gridNumber,
                ];
        }

    //first column
    if(grid[0][0].value && grid[1][0].value && grid[2][0].value 
        && grid[0][0].value === grid[1][0].value
        && grid[1][0].value === grid[2][0].value){
            winStatus.win = true;
            winStatus.winner = grid[0][0].value;
            winStatus.inWin = [
                grid[0][0].gridNumber,
                grid[1][0].gridNumber,
                grid[2][0].gridNumber,
                ];
        }

    //second column
    if(grid[0][1].value && grid[1][1].value && grid[2][1].value 
        && grid[0][1].value === grid[1][1].value
        && grid[1][1].value === grid[2][1].value){
            winStatus.win = true;
            winStatus.winner = grid[0][1].value;
            winStatus.inWin = [
                grid[0][1].gridNumber,
                grid[1][1].gridNumber,
                grid[2][1].gridNumber,
                ];
        }

    //third column
    if(grid[0][2].value && grid[1][2].value && grid[2][2].value 
        && grid[0][2].value === grid[1][2].value
        && grid[1][2].value === grid[2][2].value){
            winStatus.win = true;
            winStatus.winner = grid[0][2].value;
            winStatus.inWin = [
                grid[0][2].gridNumber,
                grid[1][2].gridNumber,
                grid[2][2].gridNumber,
                ];
        }

    //first diagonal
    if(grid[0][0].value && grid[1][1].value && grid[2][2].value 
        && grid[0][0].value === grid[1][1].value
        && grid[1][1].value === grid[2][2].value){
            winStatus.win = true;
            winStatus.winner = grid[2][2].value;
            winStatus.inWin = [
                grid[0][0].gridNumber,
                grid[1][1].gridNumber,
                grid[2][2].gridNumber,
                ];
        }

    //other diagonal
    if(grid[0][2].value && grid[1][1].value && grid[2][0].value 
        && grid[0][2].value === grid[1][1].value
        && grid[1][1].value === grid[2][0].value){
            winStatus.win = true;
            winStatus.winner = grid[2][0].value;
            winStatus.inWin = [
                grid[0][2].gridNumber,
                grid[1][1].gridNumber,
                grid[2][0].gridNumber,
                ];
        }

    //check for a draw
    if(!winStatus.win){
        let squareIsAvailable = false;
        grid.forEach(
            (row, rowIndex) => {
                row.forEach(
                    (square, squareIndex) => {
                        if(!square.value){
                            squareIsAvailable = true;
                        }
                    }
                )
            }
        );

        if(!squareIsAvailable){
            winStatus.draw = true;
        }
    }


    return winStatus;
}

export const minimax = (turn, grid, depth, alpha, beta, maximizingPlayer) => {

            let winStatus = checkForWin(grid);
            if(winStatus.win){
                if(winStatus.winner === 'X') return 1;
                if(winStatus.winner === 'O') return -1;
            }
            if(winStatus.draw) return 0;
            if(depth === 0){
                if(maximizingPlayer){
                    return -1;
                }else{
                    return 1;
                }
            }

            if(maximizingPlayer){
                let newTurn;
                if(turn === 'X'){
                    newTurn = 'O';
                }else{
                    newTurn = 'X';
                }
                let gridCopy = grid;
                    //make a move
                    let bestScore = -Infinity;
                    for(let rowCounter = 0; rowCounter < 3; rowCounter++){ 
                        for(let columnCounter = 0; columnCounter < 3; columnCounter++){
                            if(!grid[rowCounter][columnCounter].value){
                                gridCopy[rowCounter][columnCounter].value = newTurn;
                                gridCopy[rowCounter][columnCounter].considered = true;
                                // setGrid(gridCopy);
                                let score = minimax(newTurn, gridCopy, depth - 1, alpha, beta, false);
                                gridCopy[rowCounter][columnCounter].value = null;
                                gridCopy[rowCounter][columnCounter].considered = false;
                                // setGrid(gridCopy);
                                bestScore = Math.max(bestScore, score);
                                alpha = Math.max(alpha, score);
                            }
                        }
                        if(beta <= alpha){
                            // console.log("prunning on X");
                            break;
                        }
                    }
                    return bestScore;
            }else{
                let newTurn;
                if(turn === 'X'){
                    newTurn = 'O';
                }else{
                    newTurn = 'X';
                }
                let gridCopy = grid;
                    //make a move
                    let bestScore = Infinity;
                    for(let rowCounter = 0; rowCounter < 3; rowCounter++){ 
                        for(let columnCounter = 0; columnCounter < 3; columnCounter++){
                            if(!grid[rowCounter][columnCounter].value){
                                gridCopy[rowCounter][columnCounter].value = newTurn;
                                gridCopy[rowCounter][columnCounter].considered = true;
                                // setGrid(gridCopy);
                                let score = minimax(newTurn, gridCopy, depth - 1, alpha, beta, true);
                                gridCopy[rowCounter][columnCounter].value = null;
                                gridCopy[rowCounter][columnCounter].considered = false;
                                // setGrid(gridCopy);
                                bestScore = Math.min(bestScore, score);
                                beta = Math.min(beta, score)
                            }
                        }

                        if(beta <= alpha){
                            // console.log("prunning on O");
                            break;
                        }
                    }
                    return bestScore;
            }      
}
