import I_App from "../interfaces/I_App"
import getLocalUser from "./utils/getLocalUser"

const appState: I_App = {
    socketId: null,
    userName: getLocalUser().userName,
    inGame: false
}

export default appState