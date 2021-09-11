import {createStore} from "redux";
import {historyReducer} from "./reducer";

export const store = createStore(historyReducer);