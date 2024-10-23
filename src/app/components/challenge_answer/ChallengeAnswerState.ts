import I_ChallengeAnswer from "../../../interfaces/I_ChallengeAnswer"

const challengeAnswerState: I_ChallengeAnswer = {
    accepted: 0,
    challenge: {
        challengerUserId: "",
        challengeRecipientUserId: "",
        challengerUserName: "",
        challengeRecipientUserName: "",
        width: 0,
        height: 0,
        ballSize: 0,
        paddleHeight: 0,
        paddleWidth: 0,
        pointsToWin: 0,
        maxVelocity: 0,
        velocityIncreaseFactor: 0
    }
}

export default challengeAnswerState