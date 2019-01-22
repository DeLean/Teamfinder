import React from "react";
import { Link } from "react-router-dom";

const Actions = () => {
  return (
    <div className="btn-toolbar mb-4" role="group">
      <Link to="/edit_profile" className="btn btn-light">
        <i className="fas fa-user-circle text-success mr-1" /> Profil editieren
      </Link>
      <Link to="/add_experience" className="btn btn-light">
        <i className="fab fa-black-tie text-success mr-1" />
        Erfahrung hinzufügen
      </Link>
      <Link to="/add_education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-success mr-1" />
        Bildung hinzufügen
      </Link>
    </div>
  );
};

export default Actions;
