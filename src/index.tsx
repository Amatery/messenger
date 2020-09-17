import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {chatReducer} from './chat-reducer'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'


let rootReducer = combineReducers({chat: chatReducer})
export type AppStateType = ReturnType<typeof rootReducer>

const store = createStore(rootReducer,
    applyMiddleware(thunk))


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
