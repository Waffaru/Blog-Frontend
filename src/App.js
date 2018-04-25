import React, { Component } from 'react';
import BlogPost from './BlogPost';
import Field from './Field';
import Login from './Login';
import Footah from './Footer';
//import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.updateUI = this.updateUI.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.arePostsShowing = this.arePostsShowing.bind(this);
    this.state = {update: false, logged: false, allPosts: true, username: props.username};
  }
  updateUI() {
    this.setState({update: true});
  }
  checkLogin(username) {
    if(!this.state.logged) {
      this.setState({logged: true, username: username});
    }else {
      this.setState({logged: false, username: null});
    }
  }

  arePostsShowing(e, props) {
    if(!this.state.allPosts) {
      this.setState({allPosts: true});
    }else {
      this.setState({allPosts: false});
    }
  }

  render() {
    return (
      <div>
        <Login checkLogin={this.checkLogin}/>
        <Field postButtonClicked={this.updateUI}  logged={this.state.logged} allPosts={this.state.allPosts} username={this.state.username} />
        <BlogPost update={this.state.update} logged={this.state.logged} arePostsShowing={this.arePostsShowing}/>
        <Footah />
      </div>
    );
  }
}

export default App;
