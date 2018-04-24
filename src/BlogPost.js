import React, { Component } from 'react';
import {Row,Col,Card,Button,CardTitle,CardPanel,Input,Icon} from 'react-materialize';
import Comment from './Comment';

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
        this.props.arePostsShowing();
    }

    /**
     * Sets flags to false, making the component render all posts again.
     * 
     * @param {*} e Synthetic Event 
     */
    returnToPostList(e) {
        this.setState({postIsClicked: false, currentPost: {}});
        this.props.arePostsShowing();
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
        
        //If a post has NOT been clicked, go inside this loop
        if(!this.state.postIsClicked) {
            let blogList = this.state.posts;
            var blogP = []
            for(let blog of blogList) {
                //If the user is currently logged in as admin
                var postBody = blog.body
                postBody = postBody.substring(0,postBody.length /3) + "...";
                if(this.state.logged) {
                blogP.push(
                    <Row>
                        <Col m={1}l={3}>
                        </Col>
                        <Col s={12} m={10} l={6}>
                            <Card header={<CardTitle image='http://www.pizzaromaaventura.com/media/wysiwyg/pizza/pizzaromabanner.jpg'>{blog.title}</CardTitle>}
                                actions={[<Button nameClass='readMoreButton' waves='light' onClick={(e) => this.openPost(e, blog)}>Read more</Button>,
                                <Button waves='light' id={`edit-${blog.id}`}>Edit</Button>,
                                <Button waves='light' id={`dlt-${blog.id}`}  onClick={(e) => deletePost(blog.id, e)}>Delete</Button>  ]}>
                                <h1>{blog.title}</h1>
                                <p>{blog.username}</p>
                                <p>{postBody}</p>
                            </Card>
                        </Col>
                    </Row>
                )
                //User is not currently logged in as admin
                } else {
                    blogP.push(
                        <Row>
                            <Col m={1}l={3}>
                            </Col>
                            <Col s={12} m={10} l={6}>
                                <Card header={<CardTitle image='http://www.pizzaromaaventura.com/media/wysiwyg/pizza/pizzaromabanner.jpg'>{blog.title}</CardTitle>}
                                actions={[<Button nameClass='readMoreButton' waves='light' onClick={(e) => this.openPost(e, blog)}>Read more</Button>]}>
                                    {postBody}
                            </Card>
                            </Col>
                        </Row>
                    )                    
                }
            }
            return <div>
                <Row>
                <Col m={1}l={3}>
                </Col>
                <Col s={12} m={10} l={6}>
                    <Input l={12} id={'searchBar'}  placeholder={'Search'} onChange={(e) => this.handleChange(e)}><Icon tiny>search</Icon></Input>
                </Col>
            </Row>
                {blogP}
                </div>
        }
        //A single post has been clicked
        else {
            console.log(`Hei kato tää!!!!`);
            return (
                <span>
                    <Row>
                        <Col s={9} m={5}>
                            <CardPanel className="testi">
                                <span></span>
                            </CardPanel>
                            <Button waves='light' onClick={(e) => this.returnToPostList(e)}>Go back</Button>
                        </Col>
                        <Col s={12} m={7}>
                            <h2>{this.state.currentPost.title}</h2>
                            <p id={'korttijuttu'}>{this.state.currentPost.body}|||| {this.state.currentPost.username}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Comment blogPostId={this.state.currentPost.id} logged={this.state.logged}/>
                    </Row>
                </span>

                

                    /*<Row>
                        <Col m={2}l={3}>
                        </Col>
                        <Col s={12} m={12} l={12}>
                            <Card className='small'
                                  actions={[<Button waves='light' onClick={(e) => this.returnToPostList(e)}>Go back</Button>]}>
                                <h1 id={'openBlogpostTitle'}>{this.state.currentPost.title}</h1>
                                <p id={'openBlogpostUsername'}>{this.state.currentPost.username} @ {this.state.currentPost.date}</p>
                                <p id={'openBlogpostBody'}>{this.state.currentPost.body}</p>
                            </Card>
                            <Comment blogPostId={this.state.currentPost.id} logged={this.state.logged}/>
                        </Col>
                    </Row>*/
            );

        }
    }
}

export default Blogs;
