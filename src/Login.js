import React from 'react';
import store, {changeSelectedUser, login} from './store';
import {connect} from 'react-redux';
import axios from 'axios';

const Login = (props) => {
  return(
    <div id='login'>
        <div>Login</div>
        <select onChange={props.handleChange}>
          {props.users.map(user => {
            return <option key={user.id} value={user.id}>{user.name}</option>
          })}
        </select>
        <button onClick={() => props.login(props.selectedUser)}>Enter</button>
      </div>
  )
}

const mapStateToProps = (state) => {
  return {users: state.users, selectedUser: state.selectedUser}
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: function(e){
      const user = e.target.value;
      dispatch(changeSelectedUser(user));
    },
    login: async function(user){
      console.log(user);
      const conversations = (await axios.get(`/user/${user}/conversations`)).data;
      dispatch(login(user, conversations));
    }


  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);