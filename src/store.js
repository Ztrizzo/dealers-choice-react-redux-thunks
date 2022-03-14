import {createStore, applyMiddleware} from 'redux';
import loggerMiddleware from 'redux-logger';

const CHANGE_SELECTED_USER = 'CHANGE_SELECTED_USER';
const LOAD_USERS = 'LOAD_USERS';
const LOGIN = 'LOGIN';
const GO_TO_CONVERSATION = 'GO_TO_CONVERSATION';
const BACK_TO_CONVERSATIONS = 'BACK_TO_CONVERSATIONS';

const initialState = {
  users: [],
  selectedUser: '',
  view: 'login',
  conversations: [],
  conversation: {}
}

export const  goToConversation = (conversation) => {
  return{
    type: GO_TO_CONVERSATION,
    view: 'conversation',
    conversation: conversation
  }
}

export const backToConversations = () => {
  return {
    type: BACK_TO_CONVERSATIONS,
    view: 'logged in'
  }
}

export const login = (selectedUser, conversations) => {
  return{
    type: LOGIN,
    view: 'logged in',
    selectedUser: selectedUser,
    conversations: conversations
  }
}
export const changeSelectedUser = (user) => {
  return{
    type: CHANGE_SELECTED_USER,
    user: user
  }
}
export const loadUsers = (users) => {
  return{
    type: LOAD_USERS,
    users: users
  }
}

const reducer = ( state = initialState, action ) => {
  if(action.type === CHANGE_SELECTED_USER){
    return {...state, selectedUser: action.user}
  }
  if(action.type === LOAD_USERS){
    return {...state, users: action.users}
  }
  if(action.type === LOGIN){
    return { ...state, view: action.view, selectedUser: action.selectedUser, conversations: action.conversations};
  }
  if(action.type === GO_TO_CONVERSATION){
    return {...state, view: action.view, conversation: action.conversation};
  }
  if(action.type === BACK_TO_CONVERSATIONS){
    return {...state, view: action.view};
  }
  return state;
}

const store = createStore(reducer, applyMiddleware(loggerMiddleware));

export default store;