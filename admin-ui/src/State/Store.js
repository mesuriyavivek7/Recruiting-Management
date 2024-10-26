import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import AdminReducer from "./Admin/Reducer";



const rootReducers=combineReducers({
           admin:AdminReducer,
})
export const store=legacy_createStore(rootReducers,applyMiddleware(thunk));