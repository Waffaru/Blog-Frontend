import React, { Component } from 'react';

class Field extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {title: "", body: "", username: ""};
    }

    handleChange(e) {
        let id = e.target.id;
        let value = e.target.value;
        this.setState({id: value});
        console.log(`${e.target.id}: ${e.target.value}`);
    }

    render() {
        return (
            <div>
            <form id="postBlog">
                Otsikko:<br/>
                <input type="text" id="title" onChange={(e) => this.handleChange(e)}/>
                <br/>
                Teksi:<br/>
                <input type="text" id="body" onChange={(e) => this.handleChange(e)}/>
                <br/>
                Nimimerkki:<br/>
                <input type="text" id="username" onChange={(e) => this.handleChange(e)}/>
                <br/>
            </form>
            <button id="nappi" onClick={(e) => this.handleClick(e)}>post blog</button>
            </div>
        );
    }

    handleClick() {
        //TODO: Fix this 
        console.log(this.state.title);
        var url = 'http://localhost:8080/blogpost'
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({title: this.state.title, body: this.state.body, username: this.state.username}), 
            headers: new Headers({
                'Content-Type': 'application/json'
            })
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response))
            document.getElementById("postBlog").reset();
    }
}

export default Field;