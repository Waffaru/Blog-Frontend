import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Login from './Login';

//ReactDOM.render(<App />, document.getElementById('root'));
//TODO: Fix Login
ReactDOM.render(<Login />, document.getElementById('login'));
ReactDOM.render(<App />, document.getElementById('root'));
/*ReactDOM.render(<Field />, document.getElementById('field'));
ReactDOM.render(<BlogPost />, document.getElementById('blogPost'));*/
registerServiceWorker();
