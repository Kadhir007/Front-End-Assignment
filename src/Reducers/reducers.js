import { INCREMENT_DELETE, RESET_DELETE } from "./action";

const deleteQueueData = window.localStorage.getItem("deleteQueue");
const initialState = {
  deleteCount: deleteQueueData ? JSON.parse(deleteQueueData).length : 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_DELETE:
      window.localStorage.setItem("deleteCount", state.deleteCount + 1);
      return {
        ...state,
        deleteCount: state.deleteCount + 1,
      };
    case RESET_DELETE:
      
      return {
        ...state,
        deleteCount: 0,
      };
    default:
      return state;
  }
};
export default reducer;
