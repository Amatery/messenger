import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import React, {useEffect, useRef, useState} from "react";
import {destroyConnection, sendMessage, typeMessage} from "../../redux/chat-reducer";
import styles from '../../../src/Components/Chat/Chat.module.css'
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import Avatar from "@material-ui/core/Avatar/Avatar";


export const Chat = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages);
    const typingUsers = useSelector((state: AppStateType) => state.chat.typingUsers);
    const dispatch = useDispatch();


    const [message, setMessage] = useState('');
    const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        if (isAutoScrollActive) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages]);

    useEffect(() => {
        return () => {
            dispatch(destroyConnection())
        }
    }, []);

    const messagesAnchorRef = useRef<HTMLDivElement>(null);

    const scrollMessages = (e: any) => {
        let element = e.currentTarget;
        const maxScrollPosition = element.scrollHeight - element.clientHeight;
        if (element.scrollTop > lastScrollTop && Math.abs(maxScrollPosition - element.scrollTop) < 100) {
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
            <Avatar>
            </Avatar>
            <b>{m.user.name}: </b>
            {m.message}
            <hr/>
        </div>
    });

    const typingUsersElement = typingUsers.map((m: any) => {
        return <div key={m.id}>
            <b>{m.name}:</b> ...
        </div>
    });

    const typeMessageFunc = (target: any) => {
        if (target.charCode === 13) {
            dispatch(sendMessage(message));
            setMessage('');
            dispatch(typeMessage())
        }
    };


    return (

        <div>
            <div className={styles.chatWindow}
                 onScroll={scrollMessages}>
                {messageElements}
                {typingUsersElement}
                <div
                    ref={messagesAnchorRef}>
                </div>
            </div>
            <div className={styles.messageField}>
                <TextField id='outlined-basic'
                           label='Enter your message...'
                           value={message}
                           onKeyPress={typeMessageFunc}
                           onChange={(e) => setMessage(e.currentTarget.value)}/>
            </div>
            <div className={styles.messageButton}>
                <Button size='medium'
                        variant='outlined'
                        color='primary'
                        onClick={sendMessageFunc}>
                    Send message
                </Button>
            </div>
        </div>
    )
};

