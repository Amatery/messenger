import React, {useEffect, useState} from "react";
import styles from "../LoginPage/LoginPage.module.css";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import {createConnection, setClientName} from "../../redux/chat-reducer";
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";


export const LoginPage = () => {

    const dispatch = useDispatch();

    const [temporaryName, setTemporaryName] = useState('');
    const [name, setName] = useState('anonymous');

    const setClientNameOnKeyPress = (target: any) => {
        if (target.charCode === 13) {
            setClientNameOnClick();
        }
    };

    const setClientNameOnClick = () => {
        setName(temporaryName);
        dispatch(setClientName(temporaryName));
    };

    useEffect(() => {
        dispatch(createConnection());
        return () => {

        }
    }, []);

    return (
        <div>
            <h1 className={styles.header}>Welcome to chat {name}</h1>
            <div className={styles.nameField}>
                <TextField id='outlined-basic'
                           label='Enter your name'
                           onChange={(e) => setTemporaryName(e.currentTarget.value)}
                           onKeyPress={setClientNameOnKeyPress}/>
            </div>
            <div className={styles.nameButton}>
                <NavLink className={styles.buttonText} to={temporaryName.length < 1 ? '/login' : '/chat'}>
                    <Button className={styles.buttonText}
                            size='medium'
                            variant='outlined'
                            color='primary'
                            disabled={temporaryName.length < 1}
                            onClick={setClientNameOnClick}>
                        Enter to chat
                    </Button>
                </NavLink>
            </div>
        </div>
    )
};