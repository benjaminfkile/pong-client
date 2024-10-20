import I_GameState from "../../interfaces/I_GameState"

const gameState: I_GameState = {
    challenger: false,
    player1Y: 0,
    player2Y: 0,
    ballX: 0,
    ballY: 0,
    width: 800,
    height: 500,
    ballRadius: 25,
    swapSides: false
}

export default gameState