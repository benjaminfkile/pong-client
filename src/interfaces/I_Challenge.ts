interface I_Challenge {
    challengerUserId: string
    challengeRecipientUserId: string
    challengerUserName: string
    challengeRecipientUserName: string
    width: number
    height: number
    ballSize: number
    paddleHeight: number
    paddleWidth: number
    pointsToWin: number
    maxVelocity: number
    velocityIncreaseFactor: number
}
export default I_Challenge