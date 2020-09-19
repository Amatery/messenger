import React, {useState} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css'
import {Chat} from "./Components/Chat/Chat";
import {LoginPage} from "./Components/LoginPage/LoginPage";


export const MessengerApp = () => {

    const [temporaryName, setTemporaryName] = useState('');
    const [name, setName] = useState('anonymous');

    return (
        <div className="App">
            <Switch>
                <Route exact path='/' render={() => <Redirect to={`/login`}/>}/>
                <Route path='/login' render={() => <LoginPage temporaryName={temporaryName} setTemporaryName={setTemporaryName} name={name} setName={setName} />}/>
                <Route path='/chat' render={() => <Chat name={name}/>}/>
            </Switch>
        </div>
    )
};
