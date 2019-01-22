import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profiles";
import Spinner from "../static/Spinner";
import ProfileActions from "./Actions";
import Experience from "./Experience";
import Education from "./Education";

class Welcome extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Willkomen <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Lösche Account
            </button>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Willkommen {user.name}</p>
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
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Welcome.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Welcome
);
