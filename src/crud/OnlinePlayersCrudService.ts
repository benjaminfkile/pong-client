import axios from "axios"
import stateService from "../stateManagement/StateService"

const { updateState } = stateService

const onlinePlayersCrudService = {
    getAllOnlinePlayers: async () => {
        try {
            const onlinePlayersState = await axios.get(`${process.env.REACT_APP_API_URL}/api/onlinePlayers/getOnlinePlayers`)
            updateState("onlinePlayersState", [{ key: "onlinePlayers", value: onlinePlayersState.data }])
        } catch (error) {
            console.log(error)
        }
    }
}

export default onlinePlayersCrudService