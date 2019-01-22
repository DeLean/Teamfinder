import axios from "axios";

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.static["Authorization"] = token;
  } else {
    delete axios.defaults.headers.static["Authorization"];
  }
};

export default setAuthToken;
