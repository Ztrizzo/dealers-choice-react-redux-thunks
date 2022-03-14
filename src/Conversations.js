import React from 'react';
import { connect } from 'react-redux';

const Conversations = (props) => {
  return (
    <div id='Conversations'>
      {props.conversations.map((conversation) => {
        return <div key={conversation.id}>
          {props.selectedUser === conversation.users[0].id ? conversation.users[1].name : conversation.users[0].name}
        </div>
      })}
    </div>
  )
}


const mapStateToProps = (state) => {
  return {conversations: state.conversations, selectedUser: state.selectedUser}
}


export default connect(mapStateToProps)(Conversations);

