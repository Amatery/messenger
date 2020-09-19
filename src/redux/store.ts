import {applyMiddleware, combineReducers, createStore} from "redux";
import {chatReducer} from "./chat-reducer";
import thunk from "redux-thunk";


let rootReducer = combineReducers({
    chat: chatReducer
});

// let composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE___;
export let store = createStore(rootReducer, applyMiddleware(thunk));

//@ts-ignore
window.store = store;

export type AppStateType = ReturnType<typeof rootReducer>
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never