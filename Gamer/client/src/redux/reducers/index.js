import { combineReducers } from "redux";
import gamerReducer from './gamerReducer';

const rootReducer = combineReducers({
    gamerReducer,
});

export default rootReducer;