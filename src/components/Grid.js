import React from 'react';
import Playable from './Playable';

const Grid = ({grid, playerActivity}) => {

    const formattedGrid = grid.map(
        (row, rowIndex) => {
           return(
                row.map(
                    (playable, playableIndex) => {
                        return(
                            <Playable
                             key={playable.gridNumber} 
                             gridInfo={playable}
                             handlePress={playerActivity}                              
                             />
                        );
                    }
                )
           );
        }
    );
    return(
        <>
            <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                width: '100%',
                height: '70%',
                // border: '5px solid #000000',
                position: 'relative',
                bottom: '0',
            }}
            >
                {formattedGrid}
            </div>
        </>
    );
}

export default React.memo(Grid);