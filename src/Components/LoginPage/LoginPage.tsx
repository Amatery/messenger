import React, {useEffect, KeyboardEvent} from "react";
import styles from "../LoginPage/LoginPage.module.css";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import {createConnection, setClientName} from "../../redux/chat-reducer";
import {useDispatch} from "react-redux";
import {NavLink, useHistory} from "react-router-dom";

type Props = {
    temporaryName: string,
    name: string
    setName: (name: string) => void,
    setTemporaryName: (name: string) => void
}

export const LoginPage = (props: Props) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const setClientNameOnKeyPress = (target: KeyboardEvent<HTMLDivElement>) => {
        if (target.key === 'Enter' && props.temporaryName.length > 0) {
            setClientNameOnClick();
            history.push('/chat')
        }
    };

    const setClientNameOnClick = () => {
        props.setName(props.temporaryName);
        dispatch(setClientName(props.temporaryName));
    };

    useEffect(() => {
        dispatch(createConnection());
    }, []);

    return (
        <div>
            <h1 className={styles.header}>Welcome to chat</h1>
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