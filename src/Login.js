import React, { Component } from 'react';

class Login extends Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.logOut = this.logOut.bind(this);
        this.state = {username: "", password: ""};
        this.logged = false;
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
        console.log(`${e.target.id}: ${e.target.value}`);
        console.log(this.state);
    }

    handleClick(e) {
        //TODO: Fix this
        e.preventDefault();
        console.log("sending");
        console.log(this.state);

        var url = 'http://localhost:8080/login';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({username: this.state.username, password: this.state.password}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if(response){
                    this.logged = response;
                    this.setState({username: "", password: ""});
                }else{
                    this.logged = response;
                }

            });
        //TODO TÄHÄN ON SAATAVA SLEEP
        console.log(this.logged);
        //document.getElementById("login").reset();

        //Callback function to parent
        //this.props.postButtonClicked();
    }

    logOut(){
        this.logged = false;
        alert(this.logged);
    }
    render() {
        if(!this.logged){
            return (
                <form id="login">
                    Username :
                    <input type="text" id="username" onChange={(e) => this.handleChange(e)}/>
                    Password :
                    <input type="text" id="password" onChange={(e) => this.handleChange(e)}/>

                    <input type="submit" id="loginBtn" value="Login" onClick={(e) => this.handleClick(e)}/>
                </form>
            );
        }else {
            return (
                <button type="submit" id="logout" onClick={() => this.logOut()}>Logout</button>
            );
        }

    }

}

export default Login;