import {Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {api} from '../api/api'
import {MessageType, UserType} from '../Components/Chat/Chat';
import {AppStateType, InferActionTypes} from './store';

const initialState = {
    messages: [] as Array<MessageType>,
    typingUsers: [] as Array<UserType>
};

export const chatReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'messages-received': {
            return {...state, messages: action.messages}
        }
        case 'new-message-received': {
            return {
                ...state,
                messages: [...state.messages, action.message],
                typingUsers: state.typingUsers.filter(u => u.id !== action.message.user.id)
            }
        }
        case 'typingUserAdded': {
            return {...state, typingUsers: [...state.typingUsers.filter(u => u.id !== action.user.id), action.user]}
        }
        case 'typingUserDeleted' : {
            return {
                ...state,
                typingUsers: state.typingUsers.filter(u => u.id !== action.user.id)
            }
        }
        default:
            return state
    }
};


const action = {
    messagesReceived: (messages: Array<MessageType>) => ({
        type: 'messages-received',
        messages
    } as const),
    newMessageReceived: (message: MessageType) => ({
        type: 'new-message-received',
        message
    } as const),
    typingUserAdded: (user: UserType) => ({
        type: 'typingUserAdded',
        user
    } as const),
    typingUserDelete: (user: UserType) => ({
        type: 'typingUserDeleted',
        user
    } as const)
};

let timerId = 0;

export const createConnection = () => (dispatch: Dispatch) => {
    api.createConnection();
    api.subscribe((messages: Array<MessageType>, fn: (data: string) => void) => {
            dispatch(action.messagesReceived(messages));
            fn("data from front");
        },
        (message: MessageType) => {
            dispatch(action.newMessageReceived(message))
        },
        (user: UserType) => {
            dispatch(action.typingUserAdded(user));
            clearTimeout(timerId);
             timerId = window.setTimeout(() => {
                dispatch(action.typingUserDelete(user))
            }, 5000)
        })
};


export const setClientName = (name: string): ThunkType => (dispatch: Dispatch) => {
    api.sendName(name);
};

export const typeMessage = (): ThunkType => (dispatch: Dispatch) => {
    api.typeMessage();
};
export const sendMessage = (messages: string): ThunkType => (dispatch: Dispatch) => {
    api.sendMessage(messages);
};

export const destroyConnection = (): ThunkType => (dispatch: Dispatch) => {
    api.destroyConnection()
};


//Types
type ActionTypes = InferActionTypes<typeof action>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>
type InitialStateType = typeof initialState




