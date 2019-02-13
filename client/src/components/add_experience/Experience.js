import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import GroupTextField from "../static/GroupTextField";
import GroupTextArea from "../static/GroupTextArea";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profiles";

class Experience extends Component {
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
                <GroupTextField
                  placeholder="Bsp.: BMW"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="*Gib ein Unternehmen an für das du gearbeitet hast"
                />
                <GroupTextField
                  placeholder="Bsp.: Vertriebsingenieur"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                  info="*Wie lautete dein Jobtitel zu dieser Stelle?"
                />
                <GroupTextField
                  placeholder="Ort"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="In welcher Stadt hast du gearbeitet?"
                />
                <h6>Von (Datum)</h6>
                <GroupTextField
                  name="from"
                  type="string"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <h6>Bis (Datum)</h6>
                <GroupTextField
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
                <GroupTextArea
                  placeholder="Stellenbeschreibung"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Sag was über deine Stelle"
                />
                <input
                  type="submit"
                  value="Speichern"
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

Experience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addExperience })(
  withRouter(Experience)
);
