import { combineReducers } from 'redux';
import paddleReducer from './paddleReducer';

const rootReducer = combineReducers({
    paddle: paddleReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
