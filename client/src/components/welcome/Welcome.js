import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfile, deleteAccount } from "../../actions/profiles";
import Loading from "../static/Loading";
import ProfileActions from "./Actions";
import Experience from "./Experience";
import Education from "./Education";

class Welcome extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  clickDelete(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let welcomeContent;

    if (profile === null || loading) {
      welcomeContent = <Loading />;
    } else {
      // Überprüfunen ob der Nutzer Profilinfos hat
      if (Object.keys(profile).length > 0) {
        welcomeContent = (
          <div>
            <p className="lead text-muted">
              Hey <Link to={`/profile/${profile.profileURL}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.clickDelete.bind(this)}
              className="btn btn-danger"
            >
              Lösche Account
            </button>
          </div>
        );
      } else {
        // Nutzer ist eingeloggt besitzt aber kein Profil
        welcomeContent = (
          <div>
            <p className="lead text-muted">Hey {user.name}</p>
            <p>Dein Profil ist noch leer, fülle es doch aus</p>
            <Link to="/create_profile" className="btn btn-lg btn-info">
              Profil erstellen
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="welcome">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Willkommen</h1>
              {welcomeContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Welcome.propTypes = {
  getProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfile, deleteAccount })(
  Welcome
);
