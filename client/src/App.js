import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./token/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authentification";
import { clearCurrentProfile } from "./actions/profiles";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/static/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Homepage from "./components/layout/Homepage";
import Register from "./components/authentification/Register";
import Login from "./components/authentification/Login";
import Welcome from "./components/welcome/Welcome";
import CreateProfile from "./components/create_profile/CreateProfile";
import EditProfile from "./components/edit_profile/EditProfile";
import AddExperience from "./components/credentials/AddExperience";
import AddEducation from "./components/credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/comment/Post";
import NotFound from "./components/not_found/NotFound";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Homepage} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:profileURL" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/welcome" component={Welcome} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create_profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit_profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add_experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add_education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/comment/:id" component={Post} />
              </Switch>
              <Route exact path="/not_found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
