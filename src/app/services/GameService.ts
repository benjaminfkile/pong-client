import I_GameStartedPayload from "../../interfaces/I_GameStartedPayload";
import stateService from "../../stateManagement/StateService";
import socketService from "../socket_io/SocketService";

const { updateState } = stateService

const gameService = {
    listenForGameUpdates: () => {
        socketService.on('game_started', (payload: I_GameStartedPayload) => {

            const { player, width, height, ballRadius } = payload

            console.log(payload)

            updateState("gameState", [
                { key: "challenger", value: player === 1 },
                { key: "width", value: width },
                { key: "height", value: height },
                { key: "ballRadius", value: ballRadius }
            ])

            updateState("appState", [
                { key: "inGame", value: true }
            ])

        })
    }
}

export default gameService