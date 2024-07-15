import { createReducer } from '@reduxjs/toolkit';
import { updatePaddlePosition } from '../actions/paddleActions';

interface PaddleState {
    position: number;
}

const initialState: PaddleState = {
    position: 0, // Initial position of the paddle
};

const paddleReducer = createReducer(initialState, (builder) => {
    builder.addCase(updatePaddlePosition, (state, action) => {
        state.position = action.payload;
    });
});

export default paddleReducer;
