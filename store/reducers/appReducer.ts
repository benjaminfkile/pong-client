import { createReducer } from "@reduxjs/toolkit"
import { setInGame } from "@/store/actions/appAction"
import AppState from "../../types/AppState"


const initialState: AppState = {
    inGame: false,
}

const appReducer = createReducer(initialState, (builder) => {
    builder.addCase(setInGame, (state, action) => {
        state.inGame = action.payload
    })
})

export default appReducer
