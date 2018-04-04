import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Login from './Login';
import Comment from './Comment';

//ReactDOM.render(<App />, document.getElementById('root'));
//TODO: Fix Login
ReactDOM.render(<Login />, document.getElementById('login'));
ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<Comment />, document.getElementById('root'));
registerServiceWorker();
