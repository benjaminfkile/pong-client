interface I_GameStartedPayload{
    gameKey: string,
    player: number,
    width: number
    height: number
    ballSize: number
    paddleWidth: number
    paddleHeight: number
    maxVelocity: number
    velocityIncreaseFactor: number
}

export default I_GameStartedPayload