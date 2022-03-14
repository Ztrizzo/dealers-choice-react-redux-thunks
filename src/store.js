import {createStore, applyMiddleware} from 'redux';
import loggerMiddleware from 'redux-logger';

const CHANGE_SELECTED_USER = 'CHANGE_SELECTED_USER';
const LOAD_USERS = 'LOAD_USERS';
const LOGIN = 'LOGIN';

const initialState = {
  users: [],
  selectedUser: '',
  view: 'login',
  conversations: []
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
  return state;
}

const store = createStore(reducer, applyMiddleware(loggerMiddleware));

export default store;