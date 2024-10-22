import I_GameState from "../../interfaces/I_GameState"

const gameState: I_GameState = {
    challenger: false,
    player1Y: 0,
    player2Y: 0,
    ballX: 0,
    ballY: 0,
    width: 0,
    height: 0,
    ballSize: 0,
    paddleWidth: 0,
    paddleHeight: 0,
    maxVelocity: 0,
    velocityIncreaseFactor: 0,
    swapSides: false,
    score: {
        player1: { userName: "", userId: "", score: 0 },
        player2: { userName: "", userId: "", score: 0 }
    },
    winner: null
}

export default gameState