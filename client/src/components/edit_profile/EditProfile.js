import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import GroupTextField from "../static/GroupTextField";
import GroupTextArea from "../static/GroupTextArea";
import SelectListGroup from "../static/SelectListGroup";
import { createProfile, getProfile } from "../../actions/profiles";
import isEmpty from "../../validation/is_empty";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      profileURL: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;


      const skillsCSV = profile.skills.join(",");

      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";


      this.setState({
        profileURL: profile.profileURL,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        bio: profile.bio

      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      profileURL: this.state.profileURL,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio

    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;


    const options = [
      { label: "* Wähle professionellen Status aus", value: 0 },
      { label: "Entwickler", value: "Entwickler" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student", value: "Student" },
      { label: "Lehrer oder Intruktor", value: "Lehrer oder Instruktor" },
      { label: "Praktikant", value: "Praktikant" },
      { label: "Andere", value: "Andere" }
    ];

    return (

      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/welcome" className="btn btn-light">
                Zurück
              </Link>
              <h1 className="display-4 text-center">Editiere dein Profil</h1>
              <p className="lead5 text-center">
                Hier kannst du dein Profil editieren
              </p>
              <small className="d-block pb-3">*erforderliche Felder</small>
              <form onSubmit={this.onSubmit}>
                <GroupTextField
                  placeholder="* Profil URL"
                  name="profileURL"
                  value={this.state.profileURL}
                  onChange={this.onChange}
                  error={errors.profileURL}
                  info="Eine kurze Zeichenkette um direkt über die Adressleiste auf dein Profil zuzugreifen"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Wo befindest du dich gerade auf der Karierreleiter"
                />
                <GroupTextField
                  placeholder="Bsp.: Robert Bosch"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Dein Unternehmen oder für welches du arbeitest"
                />
                <GroupTextField
                  placeholder="Bsp.: www.robert-bosch.de"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Deine Website oder des Unternehmens für welches du arbeitest"
                />
                <GroupTextField
                  placeholder="Bsp.: Stuttgart"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="In Welcher Stadt?"
                />
                <GroupTextField
                  placeholder="Bsp.: Matlab, CAD, Python, SAP"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="* Füge hier deine Skills hinzu, jeweils getrennt durch ein Komma"
                />
                <GroupTextArea
                  placeholder="Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Erzähl etwas über dich"
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getProfile })(
  withRouter(CreateProfile)
);
