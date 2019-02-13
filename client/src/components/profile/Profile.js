import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Header from "./Header";
import About from "./About";
import Creds from "./Creds";
import Loading from "../static/Loading";
import { getProfileByURL } from "../../actions/profiles";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.url) {
      this.props.getProfileByURL(this.props.match.params.url);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Loading />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Zurück zu den Profilen
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <Header profile={profile} />
          <About profile={profile} />
          <Creds
            education={profile.education}
            experience={profile.experience}
          />
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByURL: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByURL })(Profile);
