import React, {useEffect, useState} from "react";
import styles from "../LoginPage/LoginPage.module.css";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import {createConnection, setClientName} from "../../redux/chat-reducer";
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";

type Props = {
    temporaryName: string,
    name: string
    setName: any,
    setTemporaryName: any
}

export const LoginPage = (props: Props) => {

    const dispatch = useDispatch();

    const setClientNameOnKeyPress = (target: any) => {
        if (target.charCode === 13) {
            setClientNameOnClick();
        }
    };

    const setClientNameOnClick = () => {
        props.setName(props.temporaryName);
        dispatch(setClientName(props.temporaryName));
    };

    useEffect(() => {
        dispatch(createConnection());
        return () => {

        }
    }, []);

    return (
        <div>
            <h1 className={styles.header}>Welcome to chat {props.name}</h1>
            <div className={styles.nameField}>
                <TextField id='outlined-basic'
                           label='Enter your name'
                           onChange={(e) => props.setTemporaryName(e.currentTarget.value)}
                           onKeyPress={setClientNameOnKeyPress}/>
            </div>
            <div className={styles.nameButton}>
                <NavLink className={styles.buttonText} to={props.temporaryName.length < 1 ? '/login' : '/chat'}>
                    <Button className={styles.buttonText}
                            size='medium'
                            variant='outlined'
                            color='primary'
                            disabled={props.temporaryName.length < 1}
                            onClick={setClientNameOnClick}>
                        Enter to chat
                    </Button>
                </NavLink>
            </div>
        </div>
    )
};