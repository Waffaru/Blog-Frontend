import React, { Component } from 'react';
import {Row,Col, Input, Button} from 'react-materialize';
/**
 * This component is used to send new blogposts to the backend.
 * It is a child component of App.js
 */
class Field extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {title: "", body: "", username: "", logged: false, allPosts: true};
        this.userField = React.createRef();
    }

    componentWillReceiveProps(props) {
        console.log(props);
        if(props.logged != undefined) {
            if(props.logged) { 
                this.setState({logged: true});
                console.log("Joo")
            }
            else {
                this.setState({logged: false});
                console.log("ei")
            }
        }
        if(props.allPosts != undefined) {
            if(props.allPosts) {
                this.setState({allPosts: true})
            }
             else {
                this.setState({allPosts: false})
            }
        }
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
        
        var url = 'http://localhost:8080/blogpost';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({title: this.state.title, body: this.state.body, username: this.state.username}), 
            headers: new Headers({
                'Content-Type': 'application/json'
            })
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
            this.setState({title: "", body: "", username: ""});
            //Callback function to parent
            this.props.postButtonClicked();
    }

    render() {
        if(this.state.logged && this.state.allPosts) {
            var margin = {
                marginLeft: "0.75%"
            }
            return (
                <div>
                    <Row>
                        <Col l={4}>
                        </Col>
                        <h4>New Blog Post:</h4>
                        </Row>
                        <Row>
                        <Col l={4}>
                        </Col>
                        <Input ref="userField" type="text" l={2} id="username" placeholder='Username' onChange={(e) => this.handleChange(e)}/>
                        <Input ref="titleField"type="text" l={2} id="title" placeholder='Title' onChange={(e) => this.handleChange(e)}/>
                    </Row>
                    <Row>
                        <Col l={4}>
                        </Col>
                        <Input ref="bodyField" type="textarea" id="body" l={4}rows="6" cols="25" placeholder='Kirjoita tähän' onChange={(e) => this.handleChange(e)}/>

                    </Row>   
                    <Row> 
                        <Col l={4}>
                        </Col>
                        <Button waves='light' id="nappi" style={margin} onClick={(e) => this.handleClick(e)}>post blog</Button>
                    </Row>
                </div>
            );
        }
        else{
            return null;
        }

    }
}

export default Field;