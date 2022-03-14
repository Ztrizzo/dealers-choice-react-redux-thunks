import React from 'react';
import { connect } from 'react-redux';
import { backToConversations } from './store';

const Conversation = (props) => {
  return(
    <div>
      <button onClick={props.backToConversations}>back</button>
      {props.messages.map(message => {
        return <div key={message.id}>
          <h4>{props.conversation.users[0].id === message.senderId ? props.conversation.users[0].name : props.conversation.users[1].name}: </h4>
          {message.text}
          </div>
      })}
    </div>
  )
}

const mapStateToProps = (state) => {
  
  return {
    messages: state.conversation.messages,
    conversation: state.conversation
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    backToConversations: function(){
      dispatch(backToConversations());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);