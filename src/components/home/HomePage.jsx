import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => (
    <div className="jumbotron">
        <h1>React, Redux, Hooks and Jest in Use</h1>
        <p>Use it for the best webpages in the biz</p>
        <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
    </div>
);

export default Homepage;



