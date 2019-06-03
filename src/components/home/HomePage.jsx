import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => (
  <div className="jumbotron">
    <h1>CRM Starter</h1>
    <p>This is a starter pack for HCP systems</p>
    <Link to="about" className="btn btn-primary btn-lg">
      Learn More
    </Link>
  </div>
);

export default Homepage;
