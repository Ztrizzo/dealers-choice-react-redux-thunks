import React from 'react';
import { connect } from 'react-redux';
import { backToConversations, goToConversation } from './store';
import axios from 'axios';
import faker from 'faker';

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
    newMessage: async function(conversation, selectedUserId){
      await axios.post(`/conversation/${conversation.id}`, {
        selectedUser: selectedUserId,
        message: faker.lorem.paragraph(1)
      });

      const newConversation = (await axios.get(`/conversation/${conversation.id}`)).data;

      console.log(newConversation);
      dispatch(goToConversation(newConversation[0]))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);