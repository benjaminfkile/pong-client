import { FunctionComponent, useEffect, useState } from "react"
import stateService from "../../../stateManagement/StateService"
import socketService from "../../socket_io/SocketService"
import onlinePlayersCrudService from "../../../crud/OnlinePlayersCrudService"
import I_OnlinePlayers from "../../../interfaces/I_OnlinePlayersState"
import "./OnlinePlayers.css"
import getLocalUserId from "../../utils/getLocalUserId"

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

    console.log(state)

    return (
        <div className="OnlinePlayers">
            {onlinePlayers.map((player, i) =>
                <div
                    key={i}
                    onClick={() => {
                        const targetUserId = player.user_id
                        const message = `msg from: ${getLocalUserId()}`
                        socketService.emit('send_private_message', { targetUserId, message });
                    }}
                >
                    {player.user_id}
                </div>
            )}
        </div>
    )
}

export default OnlinePlayers