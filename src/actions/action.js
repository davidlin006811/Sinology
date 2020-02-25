import axios from "axios";

export const fetchItems = (url, request_type, receive_type) => {
  return async dispatch => {
    try {
      dispatch({ type: request_type });
      const res = await axios.get(url);
      dispatch({ type: receive_type, payload: res.data.data });
    } catch (e) {
      console.log(e);
      dispatch({ type: receive_type, payload: {} });
    }
  };
};
