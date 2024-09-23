import {applyMiddleware, combineReducers, createStore} from 'redux';
import {eventReducer} from "./eventReducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import {thunk} from "redux-thunk";

const rootReducer = combineReducers({
    eventReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));