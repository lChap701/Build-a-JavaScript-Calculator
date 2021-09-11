import {UPDATE, DELETE, CLEAR} from "./actionTypes";

const updateHistory = (history) => {
  return { type: UPDATE, history: history };
};

const deleteFromHistory = (history) => {
  return { type: DELETE, history: history };
};

const clearHistory = () => {
  return { type: CLEAR };
};

export {updateHistory, deleteFromHistory, clearHistory};