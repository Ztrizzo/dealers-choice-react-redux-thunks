import React from 'react';
import { connect } from 'react-redux';
import { backToConversations, newMessage, deleteMessage } from './store';

const Conversation = (props) => {
  return(
    <div>
      <button onClick={props.backToConversations}>back</button>
      {props.messages.map(message => {
        return <div key={message.id}>
          <h4>{props.conversation.users[0].id === message.senderId ? props.conversation.users[0].name : props.conversation.users[1].name}: </h4>
          {message.text}
          {message.senderId === props.selectedUser ? <button className='deleteMessage' onClick={() => props.deleteMessage(message.id, props.conversation.id)}>x</button> : null}
          
          </div>
      })}
      <button onClick={() => props.newMessage(props.conversation, props.selectedUser)}>New Message</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  
  return {
    messages: state.conversation.messages,
    conversation: state.conversation,
    selectedUser: state.selectedUser
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    backToConversations: function(){
      dispatch(backToConversations());
    },
    newMessage: function(conversation, selectedUserId){
      dispatch(newMessage(conversation, selectedUserId))
    },
    deleteMessage: function(messageId, conversationId){
      dispatch(deleteMessage(messageId, conversationId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);