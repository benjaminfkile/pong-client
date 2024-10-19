import { FunctionComponent, useEffect, useState } from "react"
import stateService from "../../stateManagement/StateService"
import I_GameState from "../../interfaces/I_GameState"
import socketService from "../socket_io/SocketService"
import Paddle1 from "./game_components/paddles/Paddle1"
import Paddle2 from "./game_components/paddles/Paddle2"
import I_GameUpdatePayload from "../../interfaces/I_GameUpdatePayload"
import getLocalUserId from "../utils/getLocalUserId"
import "./Game.css"

const Game: FunctionComponent<{}> = () => {

    const { updateState, manageSubscriptionAndStateUpdate } = stateService
    const [state, setState] = useState<I_GameState>(stateService.state.gameState)
    const { player1Y, player2Y, width, height } = state
    const PADDLE_HEIGHT = 50
    const localUserId = getLocalUserId()

    useEffect(() => {
        const gameElement = document.getElementById('game');
        gameElement?.addEventListener('mousemove', handleMouseMove);

        const unsubscribe = manageSubscriptionAndStateUpdate(setState, "gameState");

        socketService.on("game_update", (payload: I_GameUpdatePayload) => {
            const {player1, player2, ball} = payload
            updateState("gameState", [
                { key: "player1Y", value: player1.y},
                { key: "player2Y", value: player2.y}
            ])
        });

        return () => {
            unsubscribe();
            gameElement?.removeEventListener('mousemove', handleMouseMove);
        };

    }, [manageSubscriptionAndStateUpdate, updateState]);


    const handleMouseMove = (event: MouseEvent) => {
        const gameRect = document.getElementById('game')?.getBoundingClientRect();
        if (gameRect) {
            let newY = event.clientY - gameRect.top - (PADDLE_HEIGHT / 2);
            newY = Math.max(0, Math.min(newY, gameRect.height - PADDLE_HEIGHT));
            socketService.emit("update_paddle", { y: newY, id: localUserId });
        }
    }

    // console.log("player1Y",player1Y)
    // console.log("player2Y",player2Y)


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
                y={player1Y}
            />
            <Paddle2
                y={player2Y}
                gameWidth={width}
            />
        </div>
    )
}

export default Game