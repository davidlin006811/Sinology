import { REQUEST_HOME_CONTENT, RECEIVE_HOME_CONTENT } from "../actions/types";

const INITIAL_STATE = {
  menuItems: [],
  isFetching: false
};
/*获取首页内容 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_HOME_CONTENT:
      return { ...state, isFetching: true };
    case RECEIVE_HOME_CONTENT:
      return { ...state, isFetching: false, menuItems: action.payload };
    default:
      return state;
  }
};
