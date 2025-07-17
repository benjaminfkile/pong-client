import stateService from "../../stateManagement/StateService"
import socketService from "../socket_io/SocketService"

const { updateState } = stateService

const userService = {
    init: () => {
        socketService.on("receive_random_user_name", (userName: string) => {
            localStorage.setItem("user_name", userName)

            updateState("appState", [
                { key: "userName", value: userName }
            ])
        })
    }
}

export default userService