import React, { Component } from 'react';
import {Row,Col,Card,Button, Icon, Input} from 'react-materialize';
/**
 * This component handles all comments of any specified post.
 * It is used to render all the comments of a specified post.
 * 
 * This component is used as a child component for BlogPost.js
 */
class Comment extends Component {
    constructor(props) {
      super(props);
      this.fetchComments = this.fetchComments.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.sleep = this.sleep.bind(this);
      this.userField = React.createRef();
      this.bodyField = React.createRef();
      this.state = {comments: [], blogPostId: this.props.blogPostId, logged: props.logged, body: this.props.body, username: this.props.username};
    }

    /**
     * Fetches all comments related to the specified blog post ID in state blogPostId.
     */
    fetchComments() {
        let url = `http://localhost:8080/comment/byPostId/${this.state.blogPostId}`

        fetch(url).then((response) => response.json()).then((commentList) => {
                            this.setState({comments: commentList});
            console.log(this.state.comments);
        })
    }

    componentDidMount() {
        this.fetchComments();
    }

    componentWillReceiveProps(props) {
        if(props.logged != undefined) {
            console.log("Is props logged? " + props.logged);
            this.setState({logged: props.logged});
        }
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
        console.log(`${e.target.id}: ${e.target.value}`);
        console.log(this.state);
    }


    handleClick(e) {
        e.preventDefault();
        var url = 'http://localhost:8080/comment';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({body: this.state.body, username: this.state.username, blogPostId: this.state.blogPostId}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response)).then(() => this.setState({username: "", body: ""})).then(() => this.fetchComments());
        this.userField.current.input.value ="";
        this.bodyField.current.input.value ="";
    }


    sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}
  
    /**
     * Renders all comments related to the blog post id.
     */
    render() {
        let _this = this;       
        function deletePost(id, e) {
            //TODO: Fixaa UI update
            e.preventDefault();
            console.log('Click');
            var url = `http://localhost:8080/comment/${id}`
            console.log(url)
            fetch(url, {
            method: 'DELETE'
            }).then(response => response.json()).then();
            //koodi jossa se menee kantaan ja käskee poistamaan tossa urlissa olevaa dataa

            _this.sleep(100).then(() => {
                fetch(`http://localhost:8080/blogpost`).then(() =>{
                    _this.fetchComments();
                });
            })
        }

        function dislikePost(id, e) {
            e.preventDefault();
            console.log('Dislike');
            console.log(id)
            var url = `http://localhost:8080/comment/${id}/dislike`
            fetch(url).then(() =>{
                _this.fetchComments();
            });
        }          



        let commentList = this.state.comments;
        console.log(this.state.blogPostId);
        console.log(commentList);
        var commentArr = []
        if(this.state.logged) {
            for(let comment of commentList) {
                commentArr.push(
                    <Row>
                        <Col m={2}l={2}>
                        </Col>
                        <Col s={12} m={12} l={8}>
                            <Card actions={[<a href='#' id={`dlt-${comment.id}`}  onClick={(e) => deletePost(comment.id, e)}>Delete</a>]}>
                                <p id={'commentUsername'}>{comment.username}</p>
                                <p id={'commentDate'}> {comment.date} Dislikes: { comment.dislikes}
                                <Button floating className='red' waves='light' icon='thumb_down' id={`dislike-${comment.id}`} onClick={(e) => dislikePost(comment.id, e)}></Button> </p>
                                <p id={'commentBody'}>{comment.body}</p>
                            </Card>
                        </Col>
                    </Row>);
            }            
        } else {
            for(let comment of commentList) {
                commentArr.push(
                    <Row>
                        <Col m={2}l={2}>
                        </Col>
                        <Col s={12} m={12} l={8}>
                            <Card>
                                <p id={'commentUsername'}>{comment.username}</p>
                                <p id={'commentDate'}> {comment.date} { comment.dislikes}
                                <Button tooltip="dislike" floating className='red' waves='light' icon='thumb_down'  id={`dislike-${comment.id}`} onClick={(e) => dislikePost(comment.id, e)}>  </Button> </p>
                                <p id={'commentBody'}>{comment.body}</p>
                            </Card>
                        </Col>
                    </Row>);
            }            
        }

        return <div>
            <Row>
               <Col m={2}l={2}>
                </Col>
                <Col s={12} m={12} l={8}>
                    <p>Post comment</p>
            <Card>
                <Input ref={this.userField}  id='username'type="text" l={2} placeholder='Username' onChange={(e) => this.handleChange(e)}/>
                <Input ref={this.bodyField} s={8} id='body' type="text" placeholder='Comment' onChange={(e) => this.handleChange(e)} />
                <Button waves='light' id="postComment" onClick={(e) => this.handleClick(e) }>Comment</Button>
            </Card>
                </Col>
            </Row>
            {commentArr}</div>
    }
  }

  export default Comment;