
import React, { Component } from 'react';

class Comment extends Component {
    constructor(props) {
      super(props);
      this.fetchComments = this.fetchComments.bind(this);
      this.state = {comments: [], blogPostId: this.props.blogPostId};
    }

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
        for(let comment of commentList) {
            commentArr.push(<div>
            <p>{comment.username}</p>
            <p> {comment.date} @ {comment.dislikes}</p>
            <p>{comment.body}</p>
            <button id={`edit-${comment.id}`}>Edit</button>
            <button id={`dlt-${comment.id}`}  onClick={(e) => deletePost(comment.id, e)}>Delete</button>
            <button id={`dislike-${comment.id}`} onClick={(e) => dislikePost(comment.id, e)}> Dislike </button> </div>)
        }
        return <div>{commentArr}</div>
    }
  }

  export default Comment;