import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {api} from '../api/api'
import {AppStateType, InferActionTypes } from './store';

const initialState = {
    messages: [] as any,
    typingUsers: [] as any
};

export const chatReducer = (state: InitialStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case 'messages-received': {
            return {...state, messages: action.messages}
        }
        case 'new-message-received': {
            return {...state,
                messages: [...state.messages, action.message],
                typingUsers: state.typingUsers.filter((u: any) => u.id !== action.message.user.id)
            }
        }
        case 'typingUserAdded': {
            return {...state, typingUsers: [...state.typingUsers.filter((u: any) => u.id !== action.user.id), action.user]}
        }
        default:
            return state
    }
};


const action = {
    messagesReceived: (messages: any) => ({
        type: 'messages-received',
        messages
    }as const),
    newMessageReceived: (message: any) => ({
        type: 'new-message-received',
        message
    }as const),
    typingUserAdded: (user: any) => ({
        type: 'typingUserAdded',
        user
    }as const)
};

export const createConnection = () => (dispatch: any) => {
    api.createConnection();
    api.subscribe((messages: any, fn: (data: string) => void) => {
            dispatch(action.messagesReceived(messages));
            fn("data from front");
        },
        (message: any) => {
            dispatch(action.newMessageReceived(message))
        },
        (user: any) => {
            dispatch(action.typingUserAdded(user))
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




