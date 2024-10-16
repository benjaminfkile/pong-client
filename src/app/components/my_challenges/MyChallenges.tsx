import { FunctionComponent, useEffect, useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import stateService from "../../../stateManagement/StateService"
import socketService from "../../socket_io/SocketService"
import I_MyChallenges from "../../../interfaces/I_MyChallenges"
import I_Challenge from "../../../interfaces/I_Challenge"
import "./MyChallenges.css"
import getLocalUserId from "../../utils/getLocalUserId"

const MyChallenges: FunctionComponent<{}> = () => {

    const { updateState, manageSubscriptionAndStateUpdate } = stateService
    const [state, setState] = useState<I_MyChallenges>(stateService.state.myChallengesState)
    const { challenges, showChallenges } = state

    useEffect(() => {

        const unsubscribe = manageSubscriptionAndStateUpdate(setState, "myChallengesState")

        socketService.on('receive_challenge', (data) => {
            console.log("receive_challenge", data)
            let updatedChallenges = [...challenges]
            updatedChallenges.unshift({ userId: data.message.userId })
            updateState("myChallengesState", [
                { key: "showChallenges", value: true },
                { key: "challenges", value: updatedChallenges }
            ])
        })

        return () => {
            unsubscribe()
        }

    }, [manageSubscriptionAndStateUpdate])

    const handleAccept = (challenge: I_Challenge) => {
        const challengerId = challenge.userId;
        const challengedId = getLocalUserId();
        socketService.emit('accept_challenge', { challengerId, challengedId });

        const updatedChallenges = challenges.filter(c => c.userId !== challenge.userId);
        updateState("myChallengesState", [
            { key: "challenges", value: updatedChallenges },
            { key: "showChallenges", value: updatedChallenges.length > 0 }
        ]);
    };

    const handleDecline = (challenge: I_Challenge) => {
        const challengerId = challenge.userId;
        const challengedId = getLocalUserId();
        socketService.emit('decline_challenge', { challengerId, challengedId });
        const updatedChallenges = challenges.filter(c => c.userId !== challenge.userId);
        updateState("myChallengesState", [
            { key: "challenges", value: updatedChallenges },
            { key: "showChallenges", value: updatedChallenges.length > 0 }
        ]);
    };

    return (
        <div className="MyChallenges">
            <Dialog open={showChallenges}>
                <DialogTitle>{"You have been challenged to a game of pong"}</DialogTitle>
                <DialogContent>
                    {challenges.map((challenge: I_Challenge, i) =>
                        <div key={i}>
                            <div>{`Challenger ID: ${challenge.userId}`}</div>
                            <Button
                                onClick={() => handleAccept(challenge)}
                                color="primary"
                            >
                                Accept
                            </Button>
                            <Button
                                onClick={() => handleDecline(challenge)}
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
