import React, { Component } from "react";
import PropTypes from "prop-types";
import Item from "./Item";

class Projects extends Component {
  render() {
    const { comments, postId } = this.props;

    return comments.map(comment => (
      <Item key={comment._id} comment={comment} postId={postId} />
    ));
  }
}

Projects.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

export default Projects;
