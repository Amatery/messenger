import io from 'socket.io-client'
import {MessageType, UserType} from "../Components/Chat/Chat";

export const api = {
    socket: null as null | SocketIOClient.Socket,

    createConnection() {
        // this.socket = io('http://localhost:3009');
        this.socket = io('https://sin-messenger.herokuapp.com/');
    },
    subscribe(initMessagesHandler: (messages: Array<MessageType>, fn: () => void) => void,
              newMessageSentHandler: (message: MessageType) => void,
              userTypingHandler: (user: UserType) => void
    ) {
        this.socket?.on('init-messages-published', initMessagesHandler);
        this.socket?.on('new-message-sent', newMessageSentHandler);
        this.socket?.on('user-typing', userTypingHandler);
    },
    destroyConnection() {
        this.socket?.disconnect();
        this.socket = null
    },
    sendName(name: string) {
        this.socket?.emit('client-name-sent', name, (error: string | null) => {
            console.log(error);
            if (error) alert(error);
        })
    },
    sendMessage(message: string) {
        this.socket?.emit('client-message-sent', message, (error: string | null) => {
            if (error) alert(error);
        })
    },
    typeMessage() {
        this.socket?.emit('client-typed');
    }
};
