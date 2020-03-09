import React, {
    useContext,
    useState, 
    useEffect,
} from 'react';
import {GameOverContext} from './App';
import {useSpring, animated} from 'react-spring'

const Playable = ({gridInfo, handlePress}) => {

    const gameOver = useContext(GameOverContext);
    const [isTextShown, setIsTextShown] = useState(false);
    const effect = useSpring({
        opacity: isTextShown ? 1 : 0,
        config: {
            duration: 500,
        }
    });

    useEffect(
        () => {
            if(gridInfo.value){
                setIsTextShown(true);
            }else{
                setIsTextShown(false);
            }
        },[gridInfo.value]
    );
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
            border: gridInfo.considered ? '2px solid red' : 'none',
            // border: '2px solid red',
        }}
        onClick={() => {
            if(!gridInfo.value && !gameOver) handlePress(gridInfo);
            // console.log("clicked");
        }}
        >
            <animated.div
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '80px',
                alignSelf: 'center',
                textAlign: 'center',
                width: '100%',
                height: '100%',
                color: '#ffffff',
                opacity: effect.opacity,
            }}
            >
                    {gridInfo.value}
            
            </animated.div>
        </div>

    );
}

export default React.memo(Playable);