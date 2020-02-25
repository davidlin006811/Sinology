import { SET_ACTIVE_MENU_INDEX } from "../actions/types";
const INITIAL_STATE = {
  activeIndex: 0
};
export default (state = INITIAL_STATE, action) => {
  if (action.type === SET_ACTIVE_MENU_INDEX) {
    return { activeIndex: action.payload };
  } else {
    return state;
  }
};
