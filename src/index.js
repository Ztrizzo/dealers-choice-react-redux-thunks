import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import store, {loadUsers} from './store';
import {Provider, connect} from 'react-redux';
import Conversations from './Conversations';
import Conversation from './Conversation';


class _Main extends React.Component{
  constructor(){
    super();
    // this.state = {
    //   users: [],
    //   selectedUser: '',
    //   view: 'login'
    // }
  }

  async componentDidMount(){
    
    this.props.bootstrap();
  }
  
  // login(){
  //   this.setState({view:'conversations'});
  // }

  render(){
    // console.log(this.props)
    if(this.props.view === 'login'){
      return(
        <Login/>
      );
    }
    else if(this.props.view === 'logged in'){
      return (
        <Conversations/>
      );
    }
    else if(this.props.view === 'conversation'){
      return (<Conversation/>);
    }
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    bootstrap: function(){
      dispatch(loadUsers());
    }
  }
}

const Main = connect(state => state, mapDispatchToProps)(_Main);


ReactDOM.render(<Provider store={store}><Main/></Provider>, document.querySelector('#root'));