import I_ChallengeAnswer from "../../../interfaces/I_ChallengeAnswer"

const challengeAnswerState: I_ChallengeAnswer = {
    accepted: 0,
    challenge: {
        challengerUserId: "none",
        challengeRecipientUserId: "none",
        width: 800,
        height: 500,
        ballSize: 25,
        paddleHeight: 100,
        paddleWidth: 10,
        maxVelocity: 10,
        velocityIncreaseFactor: 5
    }
}

export default challengeAnswerState