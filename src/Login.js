import React, { Component } from 'react';
import {Grid,Row,Col} from 'react-materialize';

class Login extends Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.logOut = this.logOut.bind(this);
        this.state = {username: "", password: "", logged: false};
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
                    this.setState({username: "", password: "", logged: response});
                    this.logged = true;
                    this.props.checkLogin();
                }else{
                    this.setState({logged: response});
                }

            });
        console.log(this.state.logged);
        //document.getElementById("login").reset();

        //Callback function to parent
        //this.props.postButton§Clicked();
    }

    logOut(){
        this.setState({logged: false});
        this.logged = false;
        this.props.checkLogin();
    }
    render() {
        if(!this.state.logged){
            return (
                  <div id="banner" role="banner">
                    <Row>
                        <Col m={2}l={3}>
                        </Col>
                        <Col s={12} m={12} l={12}>
                            <form>
                                Username :
                                <input type="text" id="username" onChange={(e) => this.handleChange(e)}/>
                                Password :
                                <input type="password" id="password" onChange={(e) => this.handleChange(e)}/>

                                <input type="submit" id="loginBtn" value="Login" onClick={(e) => this.handleClick(e)}/>
                            </form>
                        </Col>
                    </Row>
                </div>
            );
        }else {
            return (
                <div id="banner" role="banner">
                    <Row>
                        <Col m={2}l={3}>
                        </Col>
                        <Col s={12} m={8} l={6}>
                            <button type="submit" id="logout" onClick={() => this.logOut()}>Logout</button>
                        </Col>
                    </Row>
                </div>
            );
        }

    }

}

export default Login;