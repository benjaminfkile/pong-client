import I_ChallengeAnswer from "../../../interfaces/I_ChallengeAnswer"
import { v4 as uuidv4 } from "uuid"

const challengeAnswerState: I_ChallengeAnswer = {
    accepted: 0,
    challenge: {
        challengerUserId: "none",
        challengeRecipientUserId: "none",
        width: 800,
        height: 500,
        ballRadius: 25
    }
}

export default challengeAnswerState