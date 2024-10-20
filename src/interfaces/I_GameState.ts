interface I_GameState {
    challenger: boolean
    player1Y: number
    player2Y: number
    ballX: number
    ballY: number
    width: number
    height: number
    ballRadius: number
    swapSides: boolean
}

export default I_GameState