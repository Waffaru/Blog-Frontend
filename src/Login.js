import React, { Component } from 'react';
import {Row,Col,Navbar,Input,Button} from 'react-materialize';

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
                    this.setState({password: "", logged: response});
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
                    <Row>
                        <Col l={12}>
                            <Navbar brand={'Pizza Lovers Blog'} right>
                                    <Input s={4} type="text" id="username" label="Username" onChange={(e) => this.handleChange(e)}/>

                                    <Input s={5} type="password" id="password" label="Password" onChange={(e) => this.handleChange(e)}/>

                                    <Button waves='light' s={3} type="submit" id="loginBtn" onClick={(e) => this.handleClick(e)}>Login</Button>
                            </Navbar>
                        </Col>
                    </Row>
            );
        }else {
            return (
                    <Row>
                        <Col l={12}>
                            <Navbar brand={'Pizza Lovers Blog'} right>
                                    <Row>
                                    <Col l={6}>
                                    Welcome {this.state.username}!
                                    </Col>
                                    <Col l={6}>
                                    <Button waves='light' type="submit" id="logout" onClick={() => this.logOut()}>Logout</Button>
                                    </Col>
                                    </Row>
                            </Navbar>
                        </Col>
                    </Row>
            );
        }
    }

}

export default Login;