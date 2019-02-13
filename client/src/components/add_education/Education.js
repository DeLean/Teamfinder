import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import GroupTextField from "../static/GroupTextField";
import GroupTextArea from "../static/GroupTextArea";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../actions/profiles";

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      institution: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const eduData = {
      institution: this.state.institution,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(eduData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add_education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/welcome" className="btn btn-light">
                Zurück
              </Link>
              <h1 className="display-4 text-center">Bildung hinzufügen</h1>
              <p className="lead7 text-center">
                Füge jede erdenkliche Bildung hinzu die du möchtest
              </p>
              <small className="d-block pb-3">*erforderliche Felder</small>
              <form onSubmit={this.onSubmit}>
                <GroupTextField
                  placeholder="Bsp.: Universität Hamburg"
                  name="institution"
                  value={this.state.institution}
                  onChange={this.onChange}
                  error={errors.institution}
                  info="*In welcher Instiution hast du deine Bildung erlangt?"
                />
                <GroupTextField
                  placeholder="Bsp.: Bachelor of Science"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                  info="*Was für einen Abschluss hast du in dieser Einrichtung erlangt?"
                />
                <GroupTextField
                  placeholder="Physik"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
                  info="*Aus welchem Fachbereich hast du deinen Abschluss?"
                />
                <h6>Von (Datum)</h6>
                <GroupTextField
                  name="from"
                  type="string"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                  disabled={this.state.disabled ? "disabled" : ""}
                  placeholder=" Bsp.: 01.01.2019"

                />
                <h6>Bis (Datum)</h6>
                <GroupTextField
                  name="to"
                  type="string"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                  placeholder=" Bsp.: 01.01.2019"

                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Aktuelle Einrichtung
                  </label>
                </div>
                <GroupTextArea
                  placeholder="Beschreibung"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Erzählen über den Kurs oder das Programm an dem Sie teilnehmen"
                />
                <input
                  type="submit"
                  value="Senden"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Education.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(
  withRouter(Education)
);
