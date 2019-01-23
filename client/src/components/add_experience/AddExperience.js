import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../static/TextFieldGroup";
import TextAreaFieldGroup from "../static/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profiles";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
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

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(expData, this.props.history);
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
      <div className="add_experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/welcome" className="btn btn-light">
                Zurück
              </Link>
              <h1 className="display-4 text-center">Füge deine Erfahrung hinzu</h1>
              <p className="lead6 text-center">
                Füge deinen aktuellen oder vergangenen Job hinzu
              </p>
              <small className="d-block pb-3">*  erforderliche Felder</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Unternehmen"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="* Jobtitel"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeholder="Ort"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <h6>Von (Datum)</h6>
                <TextFieldGroup
                  name="frok"
                  type="string"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <h6>Bis (Datum)</h6>
                <TextFieldGroup
                  name="to"
                  type="string"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
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
                    Aktueller Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job Beschreibung"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Sag was über deine Stelle"
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addExperience })(
  withRouter(AddExperience)
);
