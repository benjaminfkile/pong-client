import I_GameStartedPayload from "../../interfaces/I_GameStartedPayload"
import stateService from "../../stateManagement/StateService"
import socketService from "../socket_io/SocketService"
import removeChallenge from "./removeChallenge"

const listenForGameStart = () => {

    const { updateState } = stateService

    socketService.on('game_started', (payload: I_GameStartedPayload) => {

        const { challengerUserId, challengeRecipientUserId, player, width, height, ballSize, paddleWidth, paddleHeight, pointsToWin } = payload

        removeChallenge(challengerUserId, challengeRecipientUserId)

        console.log("removeChallenge", stateService.state.myChallengesState.challenges)

        updateState("challengeAnswerState", [
            { key: "accepted", value: 0 }
        ])

        updateState("gameState", [
            { key: "challenger", value: player === 1 },
            { key: "width", value: width },
            { key: "height", value: height },
            { key: "ballSize", value: ballSize },
            { key: "paddleWidth", value: paddleWidth },
            { key: "paddleHeight", value: paddleHeight },
            { key: "pointsToWin", value: pointsToWin }
        ])

        updateState("appState", [
            { key: "inGame", value: true }
        ])

    })
}

export default listenForGameStart