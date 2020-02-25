import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootReducer from "./reducers";
import reduxThunk from "redux-thunk";
import { createLogger } from "redux-logger";

/*const logger = createLogger({
  collapsed: true,
  diff: true
});

export default createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(reduxThunk, logger))
);
*/
export default createStore(rootReducer, {}, applyMiddleware(reduxThunk));
