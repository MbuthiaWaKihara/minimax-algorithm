import React, {
    useState,
    useEffect,
} from 'react';
import Grid from './Grid';
import Notification from './Notification';
import { 
    initializeGrid,
    handleUserClick,
    checkForWin,
    minimax,
 } from '../logic/GameLogic';
 import { toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';


export const GameOverContext = React.createContext();
toast.configure();

const App = () => {

    const [grid, setGrid] = useState(initializeGrid);
    const [turn, setTurn] = useState('X');
    const [toPlay, setToPlay] = useState({
        ai: true,
        human: false,
    });
    const [gameOver, setGameOver] = useState(false);
    const [ai, setAi] = useState(true);
    const [depth, setDepth] = useState(Infinity);


    //callbacks
    //1.Callback when a tic tac toe square is clicked
    const launchPlayerActivity = (gridInfo) => {
        let newGrid = handleUserClick(grid, gridInfo.gridNumber, turn);
        
        setGrid(newGrid);
        setTurn(
            previousTurn => {
              let newTurn;
              if(previousTurn === 'X'){
                newTurn = 'O';
              }else{
                newTurn = 'X';
              }
      
              return newTurn;
            }
          );
        
        setAi(true);
        //change to play
        setToPlay({
            ai: true,
            human: false,
        }); 
    }

    //2.Callback when a player restarts
    const restart = () => {
        //the winner should always start
        //if draw, the flow should continue

        let winStatus = checkForWin(grid);
        if(winStatus.win){
            if(toPlay.human && !toPlay.ai){
                setToPlay({
                    ai: true,
                    human: false
                });
                setAi(true);
            }else if(toPlay.ai && !toPlay.human){
                setToPlay({
                 ai: false,
                 human: true,
                });
                setAi(false);
            }
           if(winStatus.winner === 'X'){
               setTurn('X');
           }else{
               setTurn('O');
           }
        }
        setGrid(initializeGrid());
        setGameOver(false);
    }

    //3.Callback when a player opts to play as X
    const changePlayer = event => {
        if(event.target.value === 'X'){
            setTurn('X');
            setToPlay({
                ai: false,
                human: true,
            });
            setAi(false);
            setGrid(initializeGrid());
            setGameOver(false);
        }else{
            setTurn('X');
            setToPlay({
                ai: true,
                human: false,
            });
            setAi(true);
            setGrid(initializeGrid());
            setGameOver(false);
        }
    }

    //4. Callback when a player reduces the search depth
    const changeDepth = event => {
        setDepth(event.target.value);
        setGrid(initializeGrid());
        setGameOver(false);
    }

    //5. Callback to trigger notification when there's a winner
    const notify = message => {
        toast(<Notification message={message} />, {
            //config
        })
    }

    //side effects
    //1. Whenever the turn changes, we need to check for win, or draw
    useEffect(
        () => {
            //check if there's a winner
            const winStatus = checkForWin(grid);
            if(winStatus.win || winStatus.draw){
                setGameOver(true);                
                
                if(winStatus.win && !winStatus.draw){
                    notify(`${winStatus.winner} won!`);
                    let gridCopy = grid;
                    grid.forEach(
                        (row, rowIndex) => {
                            row.forEach(
                                (square, squareIndex) => {
                                    winStatus.inWin.forEach(
                                        (position, positionIndex) => {
                                            if(position === square.gridNumber){
                                                gridCopy[rowIndex][squareIndex].isInWin = true;
                                            }
                                        }
                                    )
                                }
                            )
                        }
                    );
                    setGrid(gridCopy);
                }
                if(winStatus.draw) notify('Draw!');
                
            }
        }, [turn]
    );
    //2. We need to use changes in ai to determine whether it's the computer's turn to play
    useEffect(
        () => {
            //check whether it's the computer's turn to move
            //if it is, use minimax to help the computer make the best move
            if(!gameOver && ai){
                if(toPlay.ai && !toPlay.human){
                    let gridCopy = grid;
                    //make a move
                    //if the ai is always maximizing
                    let bestScore
                    if(turn === 'X'){
                        bestScore = -Infinity;
                    }else{
                        bestScore = Infinity;
                    }
                    let move = {
                        row: null,
                        column: null,
                    }
                    if(turn === 'X'){
                        for(let rowCounter = 0; rowCounter < 3; rowCounter++){ 
                            for(let columnCounter = 0; columnCounter < 3; columnCounter++){
                                if(!grid[rowCounter][columnCounter].value){
                                    gridCopy[rowCounter][columnCounter].value = turn;
                                    let score = minimax(turn, gridCopy, depth, -Infinity, Infinity, false);
                                    gridCopy[rowCounter][columnCounter].value = null;
                                    if(score > bestScore) {
                                        move.row = rowCounter;
                                        move.column = columnCounter;
                                    }
                                    bestScore = Math.max(bestScore, score);
                                }
                            }
                        }
                    }else{
                        for(let rowCounter = 0; rowCounter < 3; rowCounter++){ 
                            for(let columnCounter = 0; columnCounter < 3; columnCounter++){
                                if(!grid[rowCounter][columnCounter].value){
                                    gridCopy[rowCounter][columnCounter].value = turn;
                                    let score = minimax(turn, gridCopy, depth, -Infinity, Infinity, true);
                                    gridCopy[rowCounter][columnCounter].value = null;
                                    if(score < bestScore) {
                                        move.row = rowCounter;
                                        move.column = columnCounter;
                                    }
                                    bestScore = Math.min(bestScore, score);
                                }
                            }
                        }
                    }

                    const winStatus = checkForWin(grid);
                    if(!winStatus.win && !winStatus.draw){
                        gridCopy[move.row][move.column].value = turn;
    
                        //change to play
                        setToPlay({
                            ai: false,
                            human: true,
                        });
        
                        //change grid
                        setGrid(gridCopy);
        
                        //change turn
                        setTurn(
                            previousTurn => {
                            let newTurn;
                            if(previousTurn === 'X'){
                                newTurn = 'O';
                            }else{
                                newTurn = 'X';
                            }
                    
                            return newTurn;
                            }
                        );
                        
                        setAi(false);
                    }else{
                        //change turn
                        setTurn(
                            previousTurn => {
                            let newTurn;
                            if(previousTurn === 'X'){
                                newTurn = 'O';
                            }else{
                                newTurn = 'X';
                            }
                    
                            return newTurn;
                            }
                        );
                        
                        setAi(false);
                        //change to play
                        setToPlay({
                            ai: false,
                            human: true,
                        });
        
                    }
                }
            }
        }, [ai]
    );


    return (
        <>
            <GameOverContext.Provider
            value={gameOver}
            >
                <div
                className="container"
                style={{
                    width: '400px',
                    height: '600px',
                    border: '2px solid #000000',
                    backgroundColor: '#383838',

                }}
                >
                    <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        marginBottom: '15%',
                        marginTop: '2%',
                    }}
                    >
                        <div
                        style={{
                            width: '40%',
                            height: '7%',
                            marginRight: '10%',
                            display: 'flex',
                            flexDirection: 'row',
                            
                        }}
                        >
                            <label
                            style={{
                                color: '#ffffff',
                                marginRight: '3px',
                            }}
                            >Start As: </label>
                            <select
                            style={{
                                width: '100%',
                                height: '100%',
                                border: 'none',
                                borderRadius: '5px',
                                backgroundColor: '#b1b3b1',
                                color: '#ffffff',
                            }}
                            onChange={changePlayer}
                            >
                                <option value={'O'}>O</option>
                                <option value={'X'}>X</option>
                            </select>
                        </div>
                        <div
                        style={{
                            width: '40%',
                            height: '7%',
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                        >
                            <label
                            style={{
                                color: '#ffffff',
                                marginRight: '3px',
                            }}
                            >AI Level: </label>
                            <select
                            style={{
                                width: '100%',
                                height: '100%',
                                border: 'none',
                                borderRadius: '5px',
                                backgroundColor: '#b1b3b1',
                                color: '#ffffff',
                            }}
                            onChange={changeDepth}
                            >
                                <option value={Infinity}>Hard</option>
                                <option value={1}>Easy</option>
                            </select>
                        </div>
                    </div>
                    <Grid
                    grid={grid}
                    playerActivity={toPlay.human ? launchPlayerActivity: () => {}}
                    /> 
                    {
                        gameOver && 
                        <button 
                        onClick={() => restart()}
                        style={{
                            width: '95%',
                            height: '10%', 
                            backgroundColor: '#18a300',
                            border: 'none',
                            color: '#ffffff',
                        }}
                        >
                            Restart
                        </button>
                    }
                </div> 
            </GameOverContext.Provider>
        </>
    )
}

export default React.memo(App);