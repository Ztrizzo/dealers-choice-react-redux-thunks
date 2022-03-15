import React from 'react';
import {changeSelectedUser, login} from './store';
import {connect} from 'react-redux';

const Login = (props) => {
  return(
    <div id='login'>
        <div>Login</div>
        <select onChange={props.handleChange}>
          <option>-- Please Select a User --</option>
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
    login: function(user){
      dispatch(login(user));
    }


  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);