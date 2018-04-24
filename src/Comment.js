import React, { Component } from 'react';
import {Row,Col,Card,Button} from 'react-materialize';
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
      this.state = {comments: [], blogPostId: this.props.blogPostId, logged: false};
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
        this.setState({logged: props.logged});
    }    
  
    /**
     * Renders all comments related to the blog post id.
     */
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



        let commentList = this.state.comments;
        console.log(this.state.blogPostId);
        console.log(commentList);
        var commentArr = []
        if(this.state.logged) {
            for(let comment of commentList) {
                commentArr.push(
                    <Row>
                        <Col m={2}l={3}>
                        </Col>
                        <Col s={12} m={12} l={12}>
                            <Card className='small'>
                                <p id={'commentUsername'}>{comment.username}</p>
                                <p id={'commentDate'}> {comment.date} <Button className='dislikeButton' id={`dislike-${comment.id}`} onClick={(e) => dislikePost(comment.id, e)}> Dislike </Button>{ comment.dislikes}</p>
                                <p id={'commentBody'}>{comment.body}</p>
                            </Card>
                            <Button waves='light' id={`edit-${comment.id}`}>Edit</Button>
                            <Button waves='light' id={`dlt-${comment.id}`}  onClick={(e) => deletePost(comment.id, e)}>Delete</Button>
                        </Col>
                    </Row>
                    /*<div id={'commentDiv'}>
                <p id={'commentUsername'}>{comment.username}</p>
                <p id={'commentDate'}> {comment.date} | Dislikes {comment.dislikes}</p>
                <p id={'commentBody'}>{comment.body}</p>

                <button id={`dislike-${comment.id}`} onClick={(e) => dislikePost(comment.id, e)}> Dislike </button> </div>*/)
            }            
        } else {
            for(let comment of commentList) {
                commentArr.push(
                    <Row>
                        <Col m={2}l={3}>
                        </Col>
                        <Col s={12} m={12} l={12}>
                            <Card className='commentCards'>
                                <p id={'commentUsername'}>{comment.username}</p>
                                <p id={'commentDate'}> {comment.date} <Button className='dislikeButton' id={`dislike-${comment.id}`} onClick={(e) => dislikePost(comment.id, e)}> Dislike </Button>{ comment.dislikes}</p>
                                <p id={'commentBody'}>{comment.body}</p>
                            </Card>
                        </Col>
                    </Row>
                    /*<div id={'commentDiv'}>
                <p id={'commentUsername'}>{comment.username}</p>
                <p id={'commentDate'}> {comment.date} | Dislikes {comment.dislikes}</p>
                <p id={'commentBody'}>{comment.body}</p>
                <button id={`dislike-${comment.id}`} onClick={(e) => dislikePost(comment.id, e)}> Dislike </button></div>*/)
            }            
        }

        return <div>{commentArr}</div>
    }
  }

  export default Comment;