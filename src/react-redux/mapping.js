import {updateHistory, deleteFromHistory, clearHistory} from "../redux/actionCreators";

const mapStateToProps = (state) => {
  return { history: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToHistory: (history) => dispatch(updateHistory(history)),
    removeFromHistory: (history) => dispatch(deleteFromHistory(history)),
    clear: () => dispatch(clearHistory())
  };
};

export {mapStateToProps, mapDispatchToProps};