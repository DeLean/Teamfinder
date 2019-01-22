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
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName} Ist Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>{firstName} Hat kein Bio</span>
              ) : (
                  <span>{profile.bio}</span>
                )}
            </p>
            <hr />
            <h3 className="text-center text-info">Skills</h3>
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
