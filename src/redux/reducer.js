import {UPDATE, DELETE, CLEAR} from "./actionTypes";

export const historyReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE:
      return [...state, action.history];
    case DELETE:
      return state.filter((s) => s != action.history);
    case CLEAR:
      return [];
    default:
      return state;
  }
};