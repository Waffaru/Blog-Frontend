import React, { Component } from 'react';
import BlogPost from './BlogPost';
import Field from './Field';
//import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.updateUI = this.updateUI.bind(this);
    this.state = {update: false};
  }
  updateUI() {
    this.setState({update: true});
  }

  render() {
    return (
      <div>
        <Field postButtonClicked={this.updateUI}/>
        <BlogPost update={this.state.update}/>
      </div>
    );
  }
}

export default App;
