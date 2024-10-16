import { FunctionComponent, useEffect, useState } from "react"
import I_ChallengeAnswer from "../../../interfaces/I_ChallengeAnswer"
import stateService from "../../../stateManagement/StateService"
import socketService from "../../socket_io/SocketService"

interface ChallengeAnswerProps {

}

const ChallengeAnswer: FunctionComponent<ChallengeAnswerProps> = () => {

    const { updateState, manageSubscriptionAndStateUpdate } = stateService
    const [state, setState] = useState<I_ChallengeAnswer>(stateService.state.challengeAnswerState)

    useEffect(() => {

        const unsubscribe = manageSubscriptionAndStateUpdate(setState, "myChallengesState")

        socketService.on('challenge_accepted', (challengedId) => {
            console.log(`Your challenge was accepted ${challengedId}`);
        });

        // Listen for challenge declined
        socketService.on('challenge_declined', (challengedId) => {
            console.log(`Your challenge was declined ${challengedId}`);
        });

        return () => {
            unsubscribe()
        }

    }, [manageSubscriptionAndStateUpdate])

    return (
        <div className="ChallengeAnswer">

        </div>
    )
}

export default ChallengeAnswer