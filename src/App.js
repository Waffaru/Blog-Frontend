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
    this.arePostsShowing = this.arePostsShowing.bind(this);
    this.state = {update: false, logged: false, allPosts: true};
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
        <Field postButtonClicked={this.updateUI}  logged={this.state.logged} allPosts={this.state.allPosts} />
        <BlogPost update={this.state.update} logged={this.state.logged} arePostsShowing={this.arePostsShowing}/>
      </div>
    );
  }
}

export default App;
