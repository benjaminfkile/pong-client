import { FunctionComponent, useEffect, useState } from "react"
import stateService from "../../../stateManagement/StateService"
import socketService from "../../socket_io/SocketService"
import onlinePlayersCrudService from "../../../crud/OnlinePlayersCrudService"
import I_OnlinePlayers from "../../../interfaces/I_OnlinePlayersState"
import getLocalUser from "../../utils/getLocalUser"
import I_Challenge from "../../../interfaces/I_Challenge"
import "./OnlinePlayers.css"

const OnlinePlayers: FunctionComponent<{}> = () => {

    const { manageSubscriptionAndStateUpdate } = stateService
    const [state, setState] = useState<I_OnlinePlayers>(stateService.state.onlinePlayersState)
    const { onlinePlayers } = state

    useEffect(() => {

        const unsubscribe = manageSubscriptionAndStateUpdate(setState, "onlinePlayersState")

        socketService.on("get_online_players", async () => {
            await onlinePlayersCrudService.getAllOnlinePlayers()
        })

        return () => {
            unsubscribe()
        }

    }, [manageSubscriptionAndStateUpdate])

    return (
        <div className="OnlinePlayers">

            {onlinePlayers.map((player, i) =>
                <div
                    key={i}
                    className="OnlinePlayerListitem"
                    onClick={() => {
                        const localUser = getLocalUser()
                        const payload: I_Challenge = {
                            challengerUserId: localUser.userId,
                            challengeRecipientUserId: player.user_id,
                            challengerUserName: localUser.userName || "",
                            challengeRecipientUserName: player.user_name,
                            width: 800,
                            height: 500,
                            ballSize: 15,
                            paddleHeight: 120,
                            paddleWidth: 15,
                            pointsToWin: 20,
                            maxVelocity: 20,
                            velocityIncreaseFactor: 1.40
                        }
                        socketService.emit('send_challenge', payload);
                    }}
                >
                    {player.user_name}
                    <button
                        onClick={() => null}
                    >
                        Challenge
                    </button>
                </div>
            )}
        </div>
    )
}

export default OnlinePlayers