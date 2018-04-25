import React, {Component} from 'react';
import {Row, Col, Card, Button, CardTitle, CardPanel, Input, Icon} from 'react-materialize';
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
        this.sleep = this.sleep.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.editBody = React.createRef();
        this.state = {posts: [], postIsClicked: false, currentPost: {}, logged: this.props.logged, edit: false};
    }

    /**
     * fetchs all blogposts from the backend.
     */
    fetchPosts(props) {
        let url = 'http://localhost:8080/blogpost'

        fetch(url).then((response) => response.json()).then((blogList) => {
            this.setState({posts: blogList});
            console.log(this.state.posts);
        })
    }

    /**
     * Used to update the UI when a new post is made.
     *
     * @param {*} props a boolean prop sent by App.js that is used when a new post is made.
     */
    componentWillReceiveProps(props) {
        if (props.update) {
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
        this.setState({postIsClicked: true, currentPost: blog, searching: false, edit: false})
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
        this.setState({edit: false})
    }

    handleChange(e) {
        console.log("Value: " + e.target.value);
        console.log("Inside Handle change")
        let tempBlogList1 = this.state.posts;
        let finalBlogList = [];
        if (e.target.value === '') {

            console.log("Empty")
            this.setState({searching: false, searchPosts: this.state.posts});
        } else {
            console.log("Not empty")
            for (let blog of tempBlogList1) {
                let blogBody = blog.body.toLowerCase();
                let blogTitle = blog.title.toLowerCase();
                let blogUser = blog.username.toLowerCase();
                if (blogBody.includes(e.target.value.toLowerCase()) || blogTitle.includes(e.target.value.toLowerCase()) || blogUser.includes(e.target.value.toLowerCase())) {
                    finalBlogList.push(blog);
                }
            }
            if (finalBlogList != undefined) {
                console.log(finalBlogList);
                this.setState({searching: true, searchPosts: finalBlogList});
            } else {
                console.log("Nothing found");
            }
        }


        //TODO shit here? or am i lost with this, i might be but atleast i wrote this here
    }
    saveBlogPost(id,e){
        console.log("CURRENT ID:");
        console.log(id);
        var url = `http://localhost:8080/blogpost/${id}/edit`
        console.log(url)
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                title: this.state.title,
                body: this.editBody.current.input.value,
                username: this.state.username
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response)).then(() => {
                let url2 = `http://localhost:8080/blogpost/${id}`
                fetch(url2).then((promise) => promise.json()).then((blog) => {
                    console.log("CURRENT BLOG");
                    console.log(blog);
                this.openPost(e, blog)});
            });
    }

    deletePost(id, e) {
        console.log('Click');
        var url = `http://localhost:8080/blogpost/${id}`
        console.log(url)
        fetch(url, {
            method: 'DELETE'
        }).then(response => response.json())
            .catch(() => console.log("Exception caught"))
            .then(() => fetch(`http://localhost:8080/blogpost`).then((response) => response.json()).then((blogList) => {
                this.setState({posts: blogList});
            }));
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    /**
     * Renders either all posts or just a single post.
     *
     * If state postIsclicked is true, then it renders the post specified in currentPost
     * and all comments that are linked to that post. Otherwise it renders
     * all posts in the backend.
     */
    render() {
        console.log("CALLING RENDER!");
        let _this = this;

        function dislikePost(id, e) {
            e.preventDefault();
            console.log('Dislike');
            console.log(id)
            var url = `http://localhost:8080/comment/${id}/dislike`
            fetch(url);
        }

        //If a post has NOT been clicked, go inside this loop
        if (!this.state.postIsClicked) {
            var blogList = this.state.posts;
            var blogP = []
            if (this.state.searching) {
                blogList = this.state.searchPosts
                blogP = []
            }
            for (let blog of blogList) {
                //If the user is currently logged in as admin
                var postBody = blog.body
                if (postBody.length >= 100) {
                    postBody = postBody.substring(0, postBody.length / 3) + "...";
                }
                if (this.state.logged) {
                    blogP.push(
                        <Row>
                            <Col m={1} l={3}>
                            </Col>
                            <Col s={12} m={10} l={6}>
                                <Card header={<CardTitle
                                    image='http://www.pizzaromaaventura.com/media/wysiwyg/pizza/pizzaromabanner.jpg'>{blog.title}</CardTitle>}
                                      actions={[<Button waves='light'
                                                        onClick={(e) => this.openPost(e, blog)}>Read more</Button>,
                                          <Button waves='light' id={`dlt-${blog.id}`}
                                                  onClick={(e) => this.deletePost(blog.id, e)}>Delete</Button>]}>
                                    <p>{blog.username}</p>
                                    <p>{postBody}</p>
                                </Card>
                            </Col>
                        </Row>
                    )
                    //User is not currently logged in as admin
                } else {
                    blogP.push(
                        <Row key={`cardNumber${blog.id}`}>
                            <Col m={1} l={3}>
                            </Col>
                            <Col s={12} m={10} l={6}>
                                <Card header={<CardTitle
                                    image='http://www.pizzaromaaventura.com/media/wysiwyg/pizza/pizzaromabanner.jpg'>{blog.title}</CardTitle>}
                                      actions={[<Button key="openPostButton" waves='light'
                                                        onClick={(e) => this.openPost(e, blog)}>Read more</Button>]}>
                                    {postBody}
                                </Card>
                            </Col>
                        </Row>
                    )
                }
            }
            blogP = blogP.reverse();
            return <div key="searchBarDiv">
                <Row>
                    <Col m={1} l={3}>
                    </Col>
                    <Col s={12} m={10} l={6}>
                        <Input s={12} id={'searchBar'} placeholder={'Search'}
                               onChange={(e) => this.handleChange(e)}><Icon tiny>search</Icon></Input>
                    </Col>
                </Row>
                {blogP}
            </div>
        }
        //A single post has been clicked
        else {
            console.log(`Hei kato tää!!!!`);
            if (this.state.logged) {
                if (this.state.edit) {
                    return (
                        <span>
                    <Row>
                        <Col m={2} l={2}>
                        </Col>
                        <Col s={12} l={8}>
                          <Card horizontal header={<CardTitle
                              image="http://www.pizzaromaaventura.com/media/wysiwyg/pizza/pizzaromabanner.jpg">{this.state.currentPost.title}</CardTitle>}
                                actions={[<Button waves='light' href="#" onClick={(e) => this.returnToPostList(e)}>Go
                                    Back</Button>,<Button waves='light' href="#"
                                                          onClick={(e) => this.saveBlogPost(this.state.currentPost.id,e)}>Save</Button>,<Button waves='light' href="#"
                                                                                                                             onClick={(e) => this.setState({edit: false})}>Cancel</Button>,
                                    <span
                                        id="singlePost">{this.state.currentPost.username} {this.state.currentPost.date}</span>]}>
                              <Row><Input ref={this.editBody} type="textarea" id="editBlogBody" l={12}rows="16" cols="25" placeholder={this.state.currentPost.body}/></Row>
                          </Card>
                          </Col>
                    </Row>
                    <Row>
                        <Comment blogPostId={this.state.currentPost.id} logged={this.state.logged}/>
                    </Row>
                </span>
                    );
                }
                else {
                    return (
                        <span>
                    <Row>
                        <Col m={2} l={2}>
                        </Col>
                        <Col s={12} l={8}>
                          <Card horizontal header={<CardTitle
                              image="http://www.pizzaromaaventura.com/media/wysiwyg/pizza/pizzaromabanner.jpg">{this.state.currentPost.title}</CardTitle>}
                                actions={[<Button waves='light' href="#" onClick={(e) => this.returnToPostList(e)}>Go
                                    Back</Button>, <Button waves='light' href="#"
                                                           onClick={(e) => this.setState({edit: true})}>Edit</Button>,
                                    <span
                                        id="singlePost">{this.state.currentPost.username} {this.state.currentPost.date}</span>]}>
                             <p>{this.state.currentPost.body}</p>
                          </Card>
                          </Col>
                    </Row>
                    <Row>
                        <Comment blogPostId={this.state.currentPost.id} logged={this.state.logged}/>
                    </Row>
                </span>
                    );
                }
            }
        else
            {
                return (
                    <span>
                    <Row>
                        <Col m={2} l={2}>
                        </Col>
                        <Col s={12} l={8}>
                          <Card horizontal header={<CardTitle
                              image="http://www.pizzaromaaventura.com/media/wysiwyg/pizza/pizzaromabanner.jpg">{this.state.currentPost.title}</CardTitle>}
                                actions={[<Button waves='light' href="#" onClick={(e) => this.returnToPostList(e)}>Go
                                    Back</Button>,
                                    <span
                                        id="singlePost">{this.state.currentPost.username} {this.state.currentPost.date}</span>]}>
                             <p>{this.state.currentPost.body}</p>
                          </Card>
                          </Col>
                    </Row>
                    <Row>
                        <Comment blogPostId={this.state.currentPost.id} logged={this.state.logged}/>
                    </Row>
                </span>
                );
            }
        }
    }
}
export default Blogs;
