import React, {Component} from 'react';
import axios from 'axios';
import Comments from '../../components/FreebiesList/Freebies/FreebieDetail/Comments/Comments';
import './CommentsContainer.css';

class CommentsContainer extends Component {
  state = {
    comments: [],
    content: "",
    ajaxLoaded: false,
  };

  fetchAllComments = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/comments`, {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data.data.length) {
        const comments = res.data.data;
        const filteredComments = comments.filter((comment) => comment.post._id === this.props.freebie._id);
        const sortedComments = filteredComments.sort((a, b) => (a.commentDate < b.commentDate) ? 1 : -1)
        this.setState({
          comments: sortedComments,
          content: "",
          ajaxLoaded: true,
        })
      }
    })
    .catch(err => console.log(err));
  };

  componentDidMount() {
    this.fetchAllComments();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCommentSubmit = () => {
    const body = {
      author: this.props.currentUser,
      content: this.state.content,
      post: this.props.freebie._id
    };
    axios.post(`${process.env.REACT_APP_API_URL}/comments`, body, {
      withCredentials: true,
    })
    .then((res) => {
      this.fetchAllComments();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.ajaxLoaded !== prevState.ajaxLoaded) {
      this.fetchAllComments();
    }
  }

  ajaxIsLoaded = () => {
    if (this.state.ajaxLoaded === true) {
      if (this.state.comments.length) {
        return (
          <Comments comments={this.state.comments} />
        )
      } else {
        return (
          <p>No comments yet</p>
        )
      }
    }
  }

  render() {
    // Comments panel snippet source: https://www.bootdey.com/snippets/view/Simple-Comment-panel#preview
    return (
      <div className="comments-container row">
        <div className="comment-wrapper">
          <div className="panel panel-info">
            <div className="panel-heading">
              Comments
            </div>
            <div className="panel-body">
              <textarea value={this.state.content} onChange={this.handleChange} name="content" className="form-control" placeholder="Write a comment..." rows="3"></textarea>
              <br />
              <button type="button" className="btn btn-info pull-right" onClick={this.handleCommentSubmit}>Post</button>
              <div className="clearfix"></div>
              <hr />
              {this.ajaxIsLoaded()}
                {/* {this.state.comments.length ?
                  <Comments comments={this.state.comments} />
                  :
                  <p>No comments yet</p>
                } */}
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default CommentsContainer;