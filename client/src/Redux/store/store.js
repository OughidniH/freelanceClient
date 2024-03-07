import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
import {thunk} from "redux-thunk";

import { rootReducer } from "../reducers/rootReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Test des devtools

const middleware = applyMiddleware(thunk);

const store = createStore(rootReducer, composeEnhancers(middleware));

export default store;
