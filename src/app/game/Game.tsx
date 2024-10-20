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
    const { challenger, player1Y, player2Y, ballX, ballY, width, height, ballRadius } = state
    const [localPaddleY, setLocalPaddleY] = useState<number>(challenger ? player1Y : player2Y)
    const PADDLE_HEIGHT = 100
    const localUserId = getLocalUserId()

    let y2Emmit = 0

    useEffect(() => {
        const gameElement = document.getElementById('game');
        gameElement?.addEventListener('mousemove', handleMouseMove);

        const unsubscribe = manageSubscriptionAndStateUpdate(setState, "gameState");

        socketService.on("game_update", (payload: I_GameUpdatePayload) => {
            //(payload)
            const { player1, player2, ball } = payload

            updateState("gameState", [
                { key: "player1Y", value: challenger ? localPaddleY : player1.y },
                { key: "player2Y", value: !challenger ? localPaddleY : player2.y },
                { key: "ballX", value: ball.x },
                { key: "ballY", value: ball.y },

            ])
        });

        // Use 16.67ms interval for 60 FPS
        const intervalId = setInterval(() => {
            socketService.emit("update_paddle", { y: y2Emmit, id: localUserId });
        }, 1000 / 240);

        return () => {
            unsubscribe();
            gameElement?.removeEventListener('mousemove', handleMouseMove);
            clearInterval(intervalId); // Clear interval on unmount
        };

    }, [manageSubscriptionAndStateUpdate, updateState]);


    const handleMouseMove = (event: MouseEvent) => {
        const gameRect = document.getElementById('game')?.getBoundingClientRect();
        if (gameRect) {
            let newY = event.clientY - gameRect.top - (PADDLE_HEIGHT / 2);
            newY = Math.max(0, Math.min(newY, gameRect.height - PADDLE_HEIGHT));
            setLocalPaddleY(newY)
            y2Emmit = newY
        }
    }

 
    return (
        <div
            id="game"
            className="Game"
            style={{
                width: `${width}px`,
                height: `${height}px`
            }}
        >
            {getLocalUserId()}
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
        </div>
    )
}

export default Game