import React, {
    useContext,
} from 'react';
import {GameOverContext} from './App';

const Playable = ({gridInfo, handlePress}) => {

    const gameOver = useContext(GameOverContext);
    return(
        <div
        style={{
            width: '30%',
            height: '30%',
            backgroundColor: gridInfo.isInWin ? '#18a300': '#b1b3b1',
            border: 'none',
            borderRadius: 5,
            margin: 3,
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
        }}
        onClick={() => {
            if(!gridInfo.value && !gameOver) handlePress(gridInfo);
            // console.log("clicked");
        }}
        >
            <div
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '80px',
                alignSelf: 'center',
                textAlign: 'center',
                width: '100%',
                height: '100%',
                color: '#ffffff',
            }}
            >
                    {gridInfo.value}
            
            </div>
        </div>

    );
}

export default React.memo(Playable);