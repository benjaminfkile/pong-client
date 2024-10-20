import { FunctionComponent, useEffect, useState } from "react"
import stateService from "../../stateManagement/StateService"
import I_GameState from "../../interfaces/I_GameState"
import socketService from "../socket_io/SocketService"
import Paddle1 from "./game_components/paddles/Paddle1"
import Paddle2 from "./game_components/paddles/Paddle2"
import I_GameUpdatePayload from "../../interfaces/I_GameUpdatePayload"
import getLocalUserId from "../utils/getLocalUserId"
import "./Game.css"
import Ball from "./game_components/ball/Ball"

const Game: FunctionComponent<{}> = () => {

    const { updateState, manageSubscriptionAndStateUpdate } = stateService
    const [state, setState] = useState<I_GameState>(stateService.state.gameState)
    const { challenger, player1Y, player2Y, ballX, ballY, width, height, ballRadius, swapSides } = state
    const [localPaddleY, setLocalPaddleY] = useState<number>(challenger ? player1Y : player2Y)
    const PADDLE_HEIGHT = 100
    const localUserId = getLocalUserId()

    let y2Emmit = 0

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
    
        const unsubscribe = manageSubscriptionAndStateUpdate(setState, "gameState");
    
        socketService.on("game_update", (payload: I_GameUpdatePayload) => {
            const { player1, player2, ball } = payload;
    
            updateState("gameState", [
                { key: "player1Y", value: challenger ? localPaddleY : player1.y },
                { key: "player2Y", value: !challenger ? localPaddleY : player2.y },
                { key: "ballX", value: ball.x },
                { key: "ballY", value: ball.y },
            ]);
        });
    
        const intervalId = setInterval(() => {
            socketService.emit("update_paddle", { y: y2Emmit, id: localUserId });
        }, 1000 / 60);
    
        return () => {
            unsubscribe();
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(intervalId); // Clear interval on unmount
        };
    }, [manageSubscriptionAndStateUpdate, updateState]);


    const handleMouseMove = (event: MouseEvent) => {
        const gameRect = document.getElementById('game-content')?.getBoundingClientRect();
        if (gameRect) {
            let newY = event.clientY - gameRect.top - (PADDLE_HEIGHT / 2);
    
            // Adjust Y position if the game is flipped
            if (swapSides) {
                newY = gameRect.height - newY - PADDLE_HEIGHT;
            }
    
            // Ensure the paddle stays within bounds
            newY = Math.max(0, Math.min(newY, gameRect.height - PADDLE_HEIGHT));
    
            setLocalPaddleY(newY);
            y2Emmit = newY;
        }
    };


    return (
        <div
            id="game"
            className="Game"
        >
            <div
                className="GameContent"
                id={"game-content"}
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                }}
            >
                {getLocalUserId()}
                {/* Swap paddles if sides are swapped */}
                {swapSides ? (
                    <>
                        <Paddle2
                            y={challenger ? localPaddleY : player1Y}
                            gameWidth={width}
                        />
                        <Ball
                            x={ballX}
                            y={ballY}
                            radius={ballRadius}
                        />
                        <Paddle1
                            y={!challenger ? localPaddleY : player2Y}
                        />
                    </>
                ) : (
                    <>
                        <Paddle1
                            y={challenger ? localPaddleY : player1Y}
                        />
                        <Ball
                            x={ballX}
                            y={ballY}
                            radius={ballRadius}
                        />
                        <Paddle2
                            y={!challenger ? localPaddleY : player2Y}
                            gameWidth={width}
                        />
                    </>
                )}
            </div>
            <button onClick={() => {
                updateState("gameState", [{ key: "swapSides", value: !swapSides }])
            }}
            >
                swap
            </button>
        </div>
    )
}

export default Game