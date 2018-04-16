import React, { Component } from 'react';
import Comment from './Comment';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';

/**
 * Component that handles blog posts.
 * It either shows all blogposts or a single post, with all its comments (Comment is a child component).
 */
class Blogs extends Component {
    constructor(props) {
        super(props);
        this.fetchPosts = this.fetchPosts.bind(this);
        this.openPost = this.openPost.bind(this);
        this.returnToPostList = this.returnToPostList.bind(this);
        this.state = {posts: [], postIsClicked: false, currentPost: {}};
    }

    /**
     * fetchs all blogposts from the backend.
     */
    fetchPosts() {
        let url = 'http://localhost:8080/blogpost'

        fetch(url).then((response) => response.json()).then((blogList) => {
                            this.setState({posts: blogList, logged: false});
            console.log(this.state.posts);
        })
    }

    /**
     * Used to update the UI when a new post is made.
     * 
     * @param {*} props a boolean prop sent by App.js that is used when a new post is made.
     */
    componentWillReceiveProps(props) {
        if(props.update) { 
            this.fetchPosts();
        }
        else {
            this.setState({logged: props.logged});
        }
    }

    componentDidMount() {
        this.fetchPosts();
    }

    /**
     * Opens a single blog post.
     * 
     * @param {*} e Synthetic Event
     * @param {*} blog the blog post to open.
     */
    openPost(e, blog) {
        console.log(blog);
        console.log(blog.id);
        this.setState({postIsClicked: true, currentPost: blog})
    }

    /**
     * Sets flags to false, making the component render all posts again.
     * 
     * @param {*} e Synthetic Event 
     */
    returnToPostList(e) {
        this.setState({postIsClicked: false, currentPost: {}});
    }

    /**
     * Renders either all posts or just a single post.
     * 
     * If state postIsclicked is true, then it renders the post specified in currentPost
     * and all comments that are linked to that post. Otherwise it renders
     * all posts in the backend.
     */
    render() {
        let _this = this;

        function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}            
        function deletePost(id, e) {
            e.preventDefault();
            console.log('Click');
            var url = `http://localhost:8080/blogpost/${id}`
            console.log(url)
            fetch(url, {
            method: 'DELETE'
            }).then(response => response.json()).then();
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
                if(this.state.logged) {
                blogP.push(
                    <Row>
                        <Col sm={2}md={3}>
                        </Col>
                        <Col xs={12} sm={8} md={6}>
                            <div id={'mainBlogpostDiv'}>
                            <h2 id={'mainBlogpostTitle'} onClick={(e) => this.openPost(e, blog)}>{blog.title}</h2>
                            <p id={'mainBlogpostUsername'}>{blog.username} @ {blog.date}</p>
                            <p id={'mainBlogpostBody'}>{blog.body}</p>
                            <button id={`edit-${blog.id}`}>Edit</button>
                            <button id={`dlt-${blog.id}`}  onClick={(e) => deletePost(blog.id, e)}>Delete</button>
                            </div>
                        </Col>
                    </Row>
                )
                } else {
                    blogP.push(
                        <Row>
                            <Col sm={2}md={3}>
                            </Col>
                            <Col xs={12} sm={8} md={6}>
                                <div id={'mainBlogpostDiv'}>
                                <h2 id={'mainBlogpostTitle'} onClick={(e) => this.openPost(e, blog)}>{blog.title}</h2>
                                <p id={'mainBlogpostUsername'}>{blog.username} @ {blog.date}</p>
                                <p id={'mainBlogpostBody'}>{blog.body}</p>
                                </div>
                            </Col>
                        </Row>
                    )                    
                }
            }
            return <Grid><div>{blogP}</div></Grid>
        }
        else {
            console.log(`Hei kato tää!!!!`);
            return (
                <Grid>
                    <row>
                        <Col sm={2}md={3}>
                        </Col>
                        <Col xs={12} sm={8} md={6}>
                        <div id={'openBlogpostDiv'}>
                            <h2 id={'openBlogpostTitle'}>{this.state.currentPost.title}</h2>
                            <p id={'openBlogpostUsername'}>{this.state.currentPost.username} @ {this.state.currentPost.date}</p>
                            <p id={'openBlogpostBody'}>{this.state.currentPost.body}</p>
                            <button onClick={(e) => this.returnToPostList(e)}>Go back</button>
                            <Comment blogPostId={this.state.currentPost.id} logged={this.state.logged}/>
                        </div>
                        </Col>
                    </row>
                </Grid>
            );

        }
    }
}

export default Blogs;
