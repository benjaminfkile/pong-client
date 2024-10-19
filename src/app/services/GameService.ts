import I_GameStartedPayload from "../../interfaces/I_GameStartedPayload";
import stateService from "../../stateManagement/StateService";
import socketService from "../socket_io/SocketService";

const { updateState } = stateService

const gameService = {
    listenForGameUpdates: () => {
        socketService.on('game_started', (payload: I_GameStartedPayload) => {

            const { player } = payload

            updateState("gameState", [
                { key: "challenger", value: player === 1 }
            ])

            updateState("appState", [
                { key: "inGame", value: true }
            ])

        })
    }
}

export default gameService