import axios from "axios"
import stateService from "../stateManagement/StateService"
import getLocalUserId from "../app/utils/getLocalUserId"
import I_OnlinePlayer from "../interfaces/I_OnlinePlayer"

const { updateState } = stateService

const onlinePlayersCrudService = {
    getAllOnlinePlayers: async () => {
        const userId = getLocalUserId()
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/onlinePlayers/getOnlinePlayers`)
            const onlinePlayers = response.data
            const filteredOnlinePlayers = onlinePlayers.filter((player: I_OnlinePlayer) => player.user_id !== userId)
            updateState("onlinePlayersState", [{ key: "onlinePlayers", value: filteredOnlinePlayers }])
        } catch (error) {
            ////(error)
        }
    }
}

export default onlinePlayersCrudService
