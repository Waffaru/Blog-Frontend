import React, { Component } from 'react';
import {Grid,Row,Col} from 'react-materialize';
/**
 * This component is used to send new blogposts to the backend.
 * It is a child component of App.js
 */
class Field extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {title: "", body: "", username: "", logged: false};
    }

    componentWillReceiveProps(props) {
        if(props.logged) { 
            this.setState({logged: true});
            console.log("Joo")
        }
        else {
            this.setState({logged: false});
            console.log("ei")
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
            document.getElementById("postBlog").reset();
            this.setState({title: "", body: "", username: ""});
            //Callback function to parent
            this.props.postButtonClicked();
    }

    render() {
        if(this.state.logged) {
            return (
                    <Row>
                        <Col m={2}l={3}>
                        </Col>
                        <Col s={12} m={12} l={12}>
                        <div>
                        <form id="postBlog">
                            New Blog Post:<br/>
                            <input type="text" id="title" placeholder={'Title'} onChange={(e) => this.handleChange(e)}/>
                            <br/>
                            <input type="text" id="username" placeholder={'Username'} onChange={(e) => this.handleChange(e)}/>
                            <br/>
                            <textarea id="body" rows="6" cols="25" placeholder="Kirjoita tähän" onChange={(e) => this.handleChange(e)}></textarea>
                            <br/>
                        </form>
                        <button id="nappi" onClick={(e) => this.handleClick(e)}>post blog</button>
                        </div>
                        </Col>
                    </Row>
        );
        }
        else{
            return null;
        }

    }
}

export default Field;