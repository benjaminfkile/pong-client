import { combineReducers } from "redux"
import appReducer from "./appReducer"
import paddleReducer from "./paddleReducer"

const rootReducer = combineReducers({
    paddle: paddleReducer,
    appReducer: appReducer
})

export type ReduxState = ReturnType<typeof rootReducer>

export default rootReducer
