import { FunctionComponent, useEffect, useState } from "react"
import I_ChallengeAnswer from "../../../interfaces/I_ChallengeAnswer"
import stateService from "../../../stateManagement/StateService"
import socketService from "../../socket_io/SocketService"
import { Dialog, DialogTitle, DialogContent, Button, DialogActions } from "@mui/material"
import I_Challenge from "../../../interfaces/I_Challenge"


const ChallengeAnswer: FunctionComponent<{}> = () => {

    const { updateState, manageSubscriptionAndStateUpdate } = stateService
    const [state, setState] = useState<I_ChallengeAnswer>(stateService.state.challengeAnswerState)
    const { accepted, challenge } = state

    useEffect(() => {

        const unsubscribe = manageSubscriptionAndStateUpdate(setState, "challengeAnswerState")

        socketService.on('challenge_accepted', (payload: I_Challenge) => {

            // //(`${payload.challengeRecipientUserId} accepted your challenge`);

            updateState("challengeAnswerState", [
                { key: "accepted", value: 1 },
                { key: "challenge", value: payload }
            ])

        });

        socketService.on('challenge_declined', (payload: I_Challenge) => {
            //(`${payload.challengeRecipientUserId} declined your challenge`);

            updateState("challengeAnswerState", [
                { key: "accepted", value: -1 },
                { key: "challenge", value: payload }
            ])
        });

        return () => {
            unsubscribe()
        }

    }, [manageSubscriptionAndStateUpdate])

    return (
        <div className="ChallengeAnswer">
            <Dialog open={accepted !== 0}>
                <DialogTitle>{`${challenge.challengeRecipientUserId} ${accepted > 0 ? "accepted" : "declined"} your challenge`}</DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => updateState("challengeAnswerState", [
                            { key: "accepted", value: 0 },
                            { key: "challenge", value: { challengerUserId: "none", challengeRecipientUserId: "none" } }
                        ])}
                        color="primary"
                    >
                        Close
                    </Button>
                    <Button
                        onClick={() => {
                            socketService.emit('start_game', challenge);
                        }}
                        color="primary"
                    >
                        Start Game
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ChallengeAnswer