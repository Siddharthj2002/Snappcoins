import { combineReducers } from "redux";
import merchantReducer from "./merchantReducer";
import gamerReducer from "./gamerReducer";

export const merchantRootReducer = combineReducers({
    merchantReducer,
});

export default merchantRootReducer;


export const gamerRootReducer = combineReducers({
    gamerReducer,
});