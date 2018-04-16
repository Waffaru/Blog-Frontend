import React, { Component } from 'react';
import BlogPost from './BlogPost';
import Field from './Field';
import Login from './Login'
//import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.updateUI = this.updateUI.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.state = {update: false, logged: false};
  }
  updateUI() {
    this.setState({update: true});
  }
  checkLogin(e, props) {
    if(!this.state.logged) {
      this.setState({logged: true});
    }else {
      this.setState({logged: false});
    }
  }

  render() {
    return (
      <div>
        <Login checkLogin={this.checkLogin}/>
        <Field postButtonClicked={this.updateUI}  logged={this.state.logged}/>
        <BlogPost update={this.state.update}/>
      </div>
    );
  }
}

export default App;
