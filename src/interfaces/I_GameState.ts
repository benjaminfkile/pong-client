import I_Score from "./I_Score"

interface I_GameState {
    challenger: boolean
    player1Y: number
    player2Y: number
    ballX: number
    ballY: number
    width: number
    height: number
    ballSize: number
    paddleHeight: number
    paddleWidth: number
    maxVelocity: number
    velocityIncreaseFactor: number
    swapSides: boolean
    score: {
        player1: I_Score,
        player2: I_Score
    }
    winner: string | null
}

export default I_GameState