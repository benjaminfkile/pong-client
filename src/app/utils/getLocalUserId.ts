import { v4 as uuidv4 } from "uuid"

const getLocalUserId = () => {
    let deviceId = localStorage.getItem("user_id")
    if (!deviceId) {
        deviceId = uuidv4()
        localStorage.setItem("user_id", deviceId)
    }
    return deviceId
}

export default getLocalUserId