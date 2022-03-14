import React from 'react';
import { connect } from 'react-redux';
import { goToConversation } from './store';

const Conversations = (props) => {
  return (
    <div id='conversations'>
      <h3>Conversation with:</h3>
      {props.conversations.map((conversation) => {
        return (
        <div key={conversation.id} className='conversation' onClick={() => props.goToConversation(conversation)}>
          {props.selectedUser === conversation.users[0].id ? conversation.users[1].name : conversation.users[0].name}
        </div>
      )})}
    </div>
  )
}


const mapStateToProps = (state) => {
  return {conversations: state.conversations, selectedUser: state.selectedUser}
}
const mapDispatchToProps = (dispatch) => {
  return {
    goToConversation: function (conversation){
      dispatch(goToConversation(conversation));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Conversations);

