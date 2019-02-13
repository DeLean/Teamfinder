import React, { Component } from "react";
import PropTypes from "prop-types";
import Item from "./Item";

class Projects extends Component {
  render() {
    const { posts } = this.props;

    return posts.map(post => <Item key={post._id} post={post} />);
  }
}

Projects.propTypes = {
  posts: PropTypes.array.isRequired
};

export default Projects;
