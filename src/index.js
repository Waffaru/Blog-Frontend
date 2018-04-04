import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import BlogPost from './BlogPost';
import Field from './Field';
import Login from './Login';

//ReactDOM.render(<App />, document.getElementById('root'));
//TODO: Fix Login
ReactDOM.render(<Login />, document.getElementById('login'));
ReactDOM.render(<Field />, document.getElementById('field'));
ReactDOM.render(<BlogPost />, document.getElementById('blogPost'));
registerServiceWorker();
