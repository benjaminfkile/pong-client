import I_Coords from "./I_Coords"

interface I_GameUpdatePayload {
    ball: I_Coords
    player1: I_Coords
    player2: I_Coords
}

export default I_GameUpdatePayload