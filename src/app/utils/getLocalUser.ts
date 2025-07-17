import { v4 as uuidv4 } from "uuid"

const getLocalUser = () => {
    let userId = localStorage.getItem("user_id")
    let userName = localStorage.getItem("user_name")
    if (!userId) {
        userId = uuidv4()
        localStorage.setItem("user_id", userId)
    }
    return {userId: userId, userName: userName}
}

export default getLocalUser