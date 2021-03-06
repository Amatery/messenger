import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import React, {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from "react";
import {destroyConnection, sendMessage, typeMessage} from "../../redux/chat-reducer";
import styles from '../../../src/Components/Chat/Chat.module.css'
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import Avatar from "@material-ui/core/Avatar/Avatar";
import {Redirect} from "react-router-dom";

type Props = {
    name: string
}

export type MessageType = {
    message: string,
    id: number
    user: UserType
}

export type UserType = {
    id: string,
    name: string
}


export const Chat = (props: Props) => {
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
    }, [messages, typingUsers]);

    useEffect(() => {
        return () => {
            dispatch(destroyConnection())
        }
    }, []);

    const messagesAnchorRef = useRef<HTMLDivElement>(null);

    const scrollMessages = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget;
        const maxScrollPosition = element.scrollHeight - element.clientHeight;
        if (element.scrollTop > lastScrollTop && Math.abs(maxScrollPosition - element.scrollTop) < 2) {
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

    const messageElements = messages.map((m: MessageType) => {
        return <div key={m.id}>
            <div className={styles.chatName}>
                <Avatar className={styles.chatAvatar}>
                </Avatar>
                <div>
                    <b>{m.user.name}: </b>
                    {m.message}
                </div>
            </div>
            <hr/>
        </div>
    });

    const typingUsersElement = typingUsers.map((m: UserType) => {
        return <div key={m.id}>
            <b>{m.name}:</b> ...
        </div>
    });

    const typeMessageFunc = (target: KeyboardEvent<HTMLDivElement>) => {
        if (target.key === 'Enter') {
            dispatch(sendMessage(message));
            setMessage('');

        }
    };

    const onChangeTyping = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value);
        dispatch(typeMessage())
    };

    if (props.name === 'anonymous') {
        return <Redirect to={`/login`}/>
    }

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
                           onChange={onChangeTyping}/>
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

