import { FunctionComponent, useEffect, useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import stateService from "../../../stateManagement/StateService"
import socketService from "../../socket_io/SocketService"
import I_MyChallenges from "../../../interfaces/I_MyChallenges"
import getLocalUserId from "../../utils/getLocalUserId"
import I_Challenge from "../../../interfaces/I_Challenge"
import "./MyChallenges.css"

const MyChallenges: FunctionComponent<{}> = () => {

    const { updateState, manageSubscriptionAndStateUpdate } = stateService
    const [state, setState] = useState<I_MyChallenges>(stateService.state.myChallengesState)
    const { challenges, showChallenges } = state

    useEffect(() => {

        const unsubscribe = manageSubscriptionAndStateUpdate(setState, "myChallengesState")

        socketService.on('receive_challenge', (payload: I_Challenge) => {
            const { challengerUserId, challengeRecipientUserId } = payload
            let updatedChallenges = [...challenges]

            updatedChallenges.unshift(payload)

            updateState("myChallengesState", [
                { key: "showChallenges", value: true },
                { key: "challenges", value: updatedChallenges }
            ])
        })

        return () => {
            unsubscribe()
        }

    }, [manageSubscriptionAndStateUpdate])

    const handelAcceptOrDecline = (challenge: I_Challenge, prefix: "accept" | "decline") => {

        const payload: I_Challenge = {
            challengerUserId: challenge.challengerUserId,
            challengeRecipientUserId: getLocalUserId(),
            width: challenge.width,
            height: challenge.height,
            ballRadius: challenge.ballRadius
        }

        socketService.emit(`${prefix}_challenge`, payload);

        const updatedChallenges = challenges.filter(c => c.challengerUserId !== challenge.challengerUserId);

        updateState("myChallengesState", [
            { key: "challenges", value: updatedChallenges },
            { key: "showChallenges", value: updatedChallenges.length > 0 },
        ]);

        // if (prefix === "accept") {
        //     updateState("appState", [
        //         { key: "inGame", value: true}
        //     ])
        // }
    };

    return (
        <div className="MyChallenges">
            <Dialog open={showChallenges}>
                <DialogTitle>{"You have been challenged to a game of pong"}</DialogTitle>
                <DialogContent>
                    {challenges.map((challenge: I_Challenge, i) =>
                        <div key={i}>
                            <div>{`Challenger ID: ${challenge.challengerUserId}`}</div>
                            <Button
                                onClick={() => handelAcceptOrDecline(challenge, "accept")}
                                color="primary"
                            >
                                Accept
                            </Button>
                            <Button
                                onClick={() => handelAcceptOrDecline(challenge, "decline")}
                                color="secondary"
                            >
                                Decline
                            </Button>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => updateState("myChallengesState", [{ key: "showChallenges", value: false }])}
                        color="primary"
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default MyChallenges
