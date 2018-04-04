import React, { Component } from 'react';

class Blogs extends Component {
    constructor(props) {
        super(props);
        this.fetchPosts = this.fetchPosts.bind(this);
        this.openPost = this.openPost.bind(this);
        this.returnToPostList = this.returnToPostList.bind(this);
        this.state = {posts: [], postIsClicked: false, currentPost: {}};
    }

    fetchPosts() {
        let url = 'http://localhost:8080/blogpost'

        fetch(url).then((response) => response.json()).then((blogList) => {
                            this.setState({posts: blogList});
            console.log(this.state.posts);
        })
    }

    componentWillReceiveProps(props) {
        if(props.update) { 
            this.fetchPosts();
        }
        else {
            console.log("false");
        }
    }

    componentDidMount() {
        this.fetchPosts();
    }

    openPost(e, blog) {
        this.setState({postIsClicked: true, currentPost: blog})
    }

    returnToPostList(e) {
        this.setState({postIsClicked: false, currentPost: {}});
    }

    render() {
        let _this = this;

        function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}            
        function deletePost(id, e) {
            //TODO: Fixaa UI update
            e.preventDefault();
            console.log('Click');
            var url = `http://localhost:8080/blogpost/${id}`
            console.log(url)
            fetch(url, {
            method: 'DELETE'
            }).then(response => response.json()).then();
            //koodi jossa se menee kantaan ja käskee poistamaan tossa urlissa olevaa dataa

            sleep(100).then(() => {
                fetch(`http://localhost:8080/blogpost`).then((response) => response.json()).then((blogList) => {
                            _this.setState({posts: blogList});
                console.log(_this.state.posts);
                })            
            })
        }

        function dislikePost(id, e) {
            e.preventDefault();
            console.log('Dislike');
            console.log(id)
            var url = `http://localhost:8080/comment/${id}/dislike`
            fetch(url);     
        }  
        
        if(!this.state.postIsClicked) {
            let blogList = this.state.posts;
            var blogP = []
            for(let blog of blogList) {
                blogP.push(<div>
                <h2 onClick={(e) => this.openPost(e, blog)}>{blog.title}</h2>
                <p>{blog.username} @ {blog.date}</p>
                <p>{blog.body}</p> 
                <button id={`edit-${blog.id}`}>Edit</button>
                <button id={`dlt-${blog.id}`}  onClick={(e) => deletePost(blog.id, e)}>Delete</button>
                <button id={`dislike-${blog.id}`} onClick={(e) => dislikePost(blog.id, e)}> Dislike </button> </div>)
            }
            return <div>{blogP}</div>
        }
        else {
            return (
                <div>
                    <h2>{this.state.currentPost.title}</h2>
                    <p>{this.state.currentPost.username} @ {this.state.currentPost.date}</p>
                    <p>{this.state.currentPost.body}</p>
                    <button onClick={(e) => this.returnToPostList(e)}>Go back</button>
                </div>
            );

        }
    }
}

export default Blogs;
