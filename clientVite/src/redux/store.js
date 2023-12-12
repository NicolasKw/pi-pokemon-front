import { createStore, compose, applyMiddleware } from "redux";
import reducer from "./reducer";
import { thunk } from "redux-thunk";

const composeDevTools = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(reducer, composeDevTools(applyMiddleware(thunk)));

export default store;