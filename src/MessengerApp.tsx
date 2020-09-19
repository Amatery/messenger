import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css'
import {Chat} from "./Components/Chat/Chat";
import {LoginPage} from "./Components/LoginPage/LoginPage";


export const MessengerApp = () => {

    return (
        <div className="App">
            <Switch>
                <Route exact path='/' render={() => <Redirect to={`/login`}/>}/>
                <Route path='/login' render={() => <LoginPage/>}/>
                <Route path='/chat' render={() => <Chat/>}/>
            </Switch>
        </div>
    )
};
