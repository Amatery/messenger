import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import React, {useEffect, useRef, useState} from "react";
import {createConnection, destroyConnection, sendMessage, setClientName, typeMessage} from "../../redux/chat-reducer";
import styles from '../../../src/Components/Chat/Chat.module.css'
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";


export const Chat = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages);
    const typingUsers = useSelector((state: AppStateType) => state.chat.typingUsers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(createConnection());
        return () => {
            dispatch(destroyConnection())
        }
    }, []);

    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        if (isAutoScrollActive) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages]);

    const messagesAnchorRef = useRef<HTMLDivElement>(null);

    const scrollMessages = (e: any) => {
        let element = e.currentTarget;
        const maxScrollPosition = element.scrollHeight - element.clientHeight;
        if (element.scrollTop > lastScrollTop && Math.abs(maxScrollPosition - element.scrollTop) < 10) {
            setIsAutoScrollActive(true)
        } else {
            setIsAutoScrollActive(false)
        }
        setLastScrollTop(element.scrollTop)
    };

    const sendMessageFunc = () => {
        dispatch(sendMessage(message));
        setMessage('')
    };

    const messageElements = messages.map((m: any) => {
        return <div key={m.id}>
            <b>{m.user.name}:</b>
            {m.message}
            <hr/>
        </div>
    });

    const typingUsersElement = typingUsers.map((m: any) => {
        return <div key={m.id}>
            <b>{m.name}:</b> ...
        </div>
    });

    const typeMessageFunc = () => {
        dispatch(typeMessage())
    };

    return (

        <div>
            <div className={styles.nameField}>
                <TextField id='outlined-basic' label='Enter your name' value={name}
                           onChange={(e) => setName(e.currentTarget.value)}/>
            </div>
            <div className={styles.nameButton}>
                <Button size='small' variant='outlined' color='primary' onClick={() => {
                    dispatch(setClientName(name))
                }}>Set name
                </Button>
            </div>
            <div className={styles.chatWindow} onScroll={scrollMessages}>
                {messageElements}
                {typingUsersElement}
                <div ref={messagesAnchorRef}>
                </div>
            </div>
            <div className={styles.messageField}>
                <TextField id='outlined-basic' label='Enter your message...' value={message}
                           onKeyPress={typeMessageFunc}
                           onChange={(e) => setMessage(e.currentTarget.value)}/>
            </div>
            <div className={styles.messageButton}>
                <Button size='small' variant='outlined' color='primary' onClick={sendMessageFunc}>
                    Send Message
                </Button>
            </div>
        </div>
    )
};

