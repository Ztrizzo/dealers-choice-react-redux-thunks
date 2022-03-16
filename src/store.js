 import {createStore, applyMiddleware} from 'redux';
import loggerMiddleware from 'redux-logger';
import axios from 'axios';
import thunk from 'redux-thunk';
import faker from 'faker';

const CHANGE_SELECTED_USER = 'CHANGE_SELECTED_USER';
const LOAD_USERS = 'LOAD_USERS';
const LOGIN = 'LOGIN';
const GO_TO_CONVERSATION = 'GO_TO_CONVERSATION';
const BACK_TO_CONVERSATIONS = 'BACK_TO_CONVERSATIONS';
const DELETE_MESSAGE = 'DELETE_MESSAGE';



const initialState = {
  users: [],
  selectedUser: '',
  view: 'login',
  conversations: [],
  conversation: {}
}


export const newMessage = (conversation, selectedUserId) =>{
  return async(dispatch) => {
    await axios.post(`/conversation/${conversation.id}`, {
      selectedUser: selectedUserId,
      message: faker.lorem.paragraph(1)
    });
    const newConversation = (await axios.get(`/conversation/${conversation.id}`)).data;
    dispatch({
      type: GO_TO_CONVERSATION,
      view: 'conversation',
      conversation: newConversation[0]
    })
  }
}

export const deleteMessage = (messageId, conversationId) => {
  return async(dispatch) => {
    await axios.delete(`/message/${messageId}`);
    const conversation = (await axios.get(`/conversation/${conversationId}`)).data[0];
    dispatch({
      type: DELETE_MESSAGE,
      conversation: conversation
    })
  }
}

export const  goToConversation = (conversation) => {
  return{
        type: GO_TO_CONVERSATION,
        conversation: conversation,
        view: 'conversation'
      }
}

export const backToConversations = () => {
  return async(dispatch) => {
    const conversations = (await axios.get(`/user/${store.getState().selectedUser}/conversations`)).data;
    dispatch(
      {
        type: LOGIN,
        view: 'logged in',
        selectedUser: store.getState().selectedUser,
        conversations: conversations
      }
    )

  }
}


export const login = (selectedUser) => {
  return async(dispatch) => {
    try{
      const conversations = (await axios.get(`/user/${selectedUser}/conversations`)).data;
      dispatch(
        {
          type: LOGIN,
          view: 'logged in',
          selectedUser: selectedUser,
          conversations: conversations
        }
      )
    }
    catch(error){
      dispatch({type: 'ERROR'});
    }
    
    
    
  }
  
  
}
export const changeSelectedUser = (user) => {
  return{
    type: CHANGE_SELECTED_USER,
    user: user
  }
}
export const loadUsers = () => {
  return async (dispatch) => {
    const users = (await axios.get('/users')).data;
    dispatch({
      type: LOAD_USERS,
      users: users
      }
    )
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
    if(action.selectedUser === initialState.selectedUser)
      return {...state};
    return { ...state, view: action.view, selectedUser: action.selectedUser, conversations: action.conversations};
  }
  if(action.type === GO_TO_CONVERSATION){
    return {...state, view: action.view, conversation: action.conversation};

  }
  if(action.type === BACK_TO_CONVERSATIONS){
    return {...state, view: action.view};
  }
  if(action.type === DELETE_MESSAGE){
    return{...state, conversation: action.conversation};
    
  }
  return state;
}

const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunk));

export default store;