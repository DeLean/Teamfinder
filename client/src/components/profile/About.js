import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is_empty";

class About extends Component {
  render() {
    const { profile } = this.props;


    const firstName = profile.user.name.trim().split(" ")[0];

    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card border-dark card-body bg-light mb-3">
            <h3 className="text-center text-success">{firstName} über sich</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>{firstName} hat noch nichts über sich geschrieben</span>
              ) : (
                  <span>{profile.bio}</span>
                )}
            </p>
            <hr />
            <h3 className="text-center text-success">Skills</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

About.propTypes = {
  profile: PropTypes.object.isRequired
};

export default About;
