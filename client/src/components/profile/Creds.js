import React, { Component } from "react";
import Moment from "react-moment";

class Creds extends Component {
  render() {
    const { experience, education } = this.props;

    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? (
            " Now"
          ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
        </p>
        <p>
          <strong>Postition:</strong> {exp.title}
        </p>
        <p>
          {exp.location === "" ? null : (
            <span>
              <strong>Ort: </strong> {exp.location}
            </span>
          )}
        </p>
        <p>
          {exp.description === "" ? null : (
            <span>
              <strong>Beschreibung: </strong> {exp.description}
            </span>
          )}
        </p>
      </li>
    ));

    const eduItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.institution}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to === null ? (
            " Now"
          ) : (
              <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            )}
        </p>
        <p>
          <strong>Abschluss:</strong> {edu.degree}
        </p>
        <p>
          <strong>Fachbereich:</strong> {edu.fieldofstudy}
        </p>
        <p>
          {edu.description === "" ? null : (
            <span>
              <strong>Beschreibung: </strong> {edu.description}
            </span>
          )}
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-success">Erfahrung</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
              <p className="text-center">Keine Erfahrung aufgelistet</p>
            )}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-success">Bildung</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
              <p className="text-center">Keine Bildung aufgelistet</p>
            )}
        </div>
      </div>
    );
  }
}

export default Creds;
