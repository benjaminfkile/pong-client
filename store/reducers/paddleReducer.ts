import { createReducer } from '@reduxjs/toolkit'
import { playerPaddlePostion } from '../actions/gameActions'

interface PaddleState {
    position: number
}

const initialState: PaddleState = {
    position: 0,
}

const paddleReducer = createReducer(initialState, (builder) => {
    builder.addCase(playerPaddlePostion, (state, action) => {
        state.position = action.payload
    })
})

export default paddleReducer
