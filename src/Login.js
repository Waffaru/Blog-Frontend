import React, { Component } from 'react';

class Login extends Component {
    constructor(props){
        super(props);
        //...
    }


    render() {
        return (
            <form id="login">
                Username :
                <input type="text" id="username"/>  
                Password :
                <input type="text" id="password"/>

                <input type="submit" id="loginBtn" value="Login"/>
            </form>
        );
    }

}

export default Login;