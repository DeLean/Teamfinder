import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Form from "./Form";
import Projects from "./Projects";
import Loading from "../static/Loading";
import { getPosts } from "../../actions/posts";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Loading />;
    } else {
      postContent = <Projects posts={posts} />;
    }

    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Form />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
