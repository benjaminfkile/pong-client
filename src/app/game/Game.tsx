import { FunctionComponent, useEffect, useState } from "react"
import stateService from "../../stateManagement/StateService"
import I_GameState from "../../interfaces/I_GameState"
import socketService from "../socket_io/SocketService"
import Paddle1 from "./game_components/paddles/Paddle1"
import Paddle2 from "./game_components/paddles/Paddle2"
import I_GameUpdatePayload from "../../interfaces/I_GameUpdatePayload"
import getLocalUserId from "../utils/getLocalUserId"
import Ball from "./game_components/ball/Ball"
import I_ScorePayload from "../../interfaces/I_ScorePayload"
import I_GameOverPayload from "../../interfaces/I_GameOverPayload"
import GameResult from "./game_components/game_result/GameResult"
import "./Game.css"

const Game: FunctionComponent<{}> = () => {
    const { updateState, manageSubscriptionAndStateUpdate } = stateService;
    const [state, setState] = useState<I_GameState>(stateService.state.gameState);
    const { challenger, player1Y, player2Y, ballX, ballY, width, height, ballSize, paddleHeight, paddleWidth, score, winner } = state;
    const [localPaddleY, setLocalPaddleY] = useState<number>(challenger ? player1Y : player2Y);
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const localUserId = getLocalUserId()

    let y2Emmit = 0;

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);

        const unsubscribe = manageSubscriptionAndStateUpdate(setState, "gameState");

        socketService.on("game_update", (payload: I_GameUpdatePayload) => {
            const { player1, player2, ball } = payload;

            updateState("gameState", [
                { key: "player1Y", value: challenger ? localPaddleY : player1.y },
                { key: "player2Y", value: !challenger ? localPaddleY : player2.y },
                { key: "ballX", value: ball.x },
                { key: "ballY", value: ball.y }
            ]);
        });

        socketService.on("game_over", (payload: I_GameOverPayload) => {
            console.log("game_over", payload)
            updateState("gameState", [
                { key: "score", value: payload.score },
                { key: "winner", value: payload.winner }
            ]);
        })

        socketService.on("score_update", (payload: I_ScorePayload) => {
            if (!winner) {
                console.log("score_update", payload)
                updateState("gameState", [
                    { key: "score", value: payload }
                ]);
            }
        })

        const intervalId = setInterval(() => {
            socketService.emit("update_paddle", { y: y2Emmit, id: localUserId });
        }, 1000 / 60);

        return () => {
            unsubscribe();
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(intervalId);
        };
    }, [manageSubscriptionAndStateUpdate, updateState]);

    const handleMouseMove = (event: MouseEvent) => {
        const gameRect = document.getElementById('game-content')?.getBoundingClientRect();
        if (gameRect) {
            let newY = event.clientY - gameRect.top - (paddleHeight / 2);

            // Adjust Y position based on player's view side
            if (isFlipped) {
                newY = gameRect.height - newY - paddleHeight;
            }

            newY = Math.max(0, Math.min(newY, gameRect.height - paddleHeight));
            setLocalPaddleY(newY);
            y2Emmit = newY;
        }
    };

    return (
        <div
            id="game"
            className="Game"
            style={{
                top: `calc(50% - ${(height / 2) + 30}px)`,
                left: `calc(50% - ${(width / 2) + 30}px)`,
                width: `${width + 60}px`,
                height: `${height + 60}px`

            }}
        >
            {/* <div className="GameHeader">
                <div className="GameHeaderItem">
                    {`p1: ${score.player1.score}`}
                </div>
                <div className="GameHeaderItem">
                    {`p2: ${score.player2.score}`}
                </div>
            </div> */}
            <div
                className="GameContent"
                id="game-content"
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    // top: `calc(50% - ${(height / 2) + 30}px)`,
                    // left: `calc(50% - ${(width / 2) + 30}px)`,
                    transform: `rotateY(${isFlipped ? 180 : 0}deg)`
                }}
            >
                <Paddle1 y={challenger ? localPaddleY : player1Y} width={paddleWidth} height={paddleHeight} />
                <Ball x={ballX} y={ballY} size={ballSize} />
                <Paddle2 y={!challenger ? localPaddleY : player2Y} width={paddleWidth} height={paddleHeight} gameWidth={width} />
            </div>
            <button onClick={() => setIsFlipped(!isFlipped)}>
                Flip View
            </button>
            {winner &&
                <GameResult
                    winner={winner === localUserId}
                    score={score}
                />
            }
        </div>
    );
};

export default Game;
