import React, { Component } from 'react';
import {Row,Col,Navbar,Input,Button} from 'react-materialize';

class Login extends Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.logOut = this.logOut.bind(this);
        this.state = {username: "", password: "", logged: false};
        this.logged = false;
        this.username = null;
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
        console.log(new Buffer((this.state.username + ":" + this.state.password)).toString('base64'));
        let encoded = new Buffer((this.state.username + ":" + this.state.password)).toString('base64');
        console.log(encoded);

        var url = 'http://localhost:8080/login';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(encoded),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => {
                            console.log(response)
                if(response.status === 200){
                    this.setState({password: "", logged: true});
                    this.logged = true;
                    this.props.checkLogin(this.state.username);
                }else{
                    this.setState({logged: false});
                }
        })
            .catch(error => console.error('Error:', error))
            .then(response => {

            });
        console.log(this.state.logged);
        //document.getElementById("login").reset();

        //Callback function to parent
        //this.props.postButton§Clicked();
    }

    logOut(){
        this.setState({logged: false});
        this.logged = false;
        this.props.checkLogin(this.state.username);
    }
    render() {
        if(!this.state.logged){
            return (
                    <Row>
                            <Navbar id="navBar" brand={'Pizza Lovers Blog'} right>
                                    <Input className="logField" s={2}m={4} type="text" id="username" label="Username" onChange={(e) => this.handleChange(e)}/>

                                    <Input className="logField" rows="1" cols="5" s={2}m={5} type="password" id="password" label="Password" onChange={(e) => this.handleChange(e)}/>

                                    <Button className="logButton" waves='light' s={12}m={3} type="submit" id="loginBtn" onClick={(e) => this.handleClick(e)}>Login</Button>
                            </Navbar>
                    </Row>
            );
        }else {
            return (
                    <Row>
                            <Navbar id="navBar" brand={'Pizza Lovers Blog'} right>
                                    <Row>
                                    <Col l={6}>
                                    Welcome {this.state.username}!
                                    </Col>
                                    <Col l={6}>
                                    <Button className="logButton" waves='light' type="submit" id="logout" onClick={() => this.logOut()}>Logout</Button>
                                    </Col>
                                    </Row>
                            </Navbar>
                    </Row>
            );
        }
    }

}

export default Login;