import { SET_ACTIVE_MENU_INDEX } from "./types";
export const setMenuIndex = index => {
  return dispatch => {
    dispatch({ type: SET_ACTIVE_MENU_INDEX, payload: index });
  };
};
