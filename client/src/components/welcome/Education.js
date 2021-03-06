import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profiles";

class Education extends Component {
  clickDelete(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.institution}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> -
          {edu.to === null ? (
            " Now"
          ) : (
              <Moment format="DD/MM/YYYY">{edu.to}</Moment>
            )}
        </td>
        <td>
          <button
            onClick={this.clickDelete.bind(this, edu._id)}
            className="btn btn-danger"
          >
            Löschen
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Bildung</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Bildungseinrichtung</th>
              <th>Abschluss</th>
              <th>Jahre</th>
              <th />
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
