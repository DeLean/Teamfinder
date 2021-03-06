import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authentification";
import { clearProfile } from "../../actions/profiles";

class Navbar extends Component {
  clickLogout(e) {
    e.preventDefault();
    this.props.clearProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/projects">
            Projekte
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/welcome">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.clickLogout.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}

            />{" "}
            Abmelden
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Registrieren
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Anmelden
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-xl navbar-dark bg-dark mb-4">

        <Link className="navbar-brand" to="/">
          Teamfinder
          </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profiles">
                {" "}
                Profile
                </Link>
            </li>
          </ul>
          {isAuthenticated ? authLinks : guestLinks}

        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearProfile })(
  Navbar
);
