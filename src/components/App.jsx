import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./home/HomePage.jsx";
import AboutPage from "./about/AboutPage.jsx";

function App() {
    return (
        <div className="containewr-fluid">
            <Route exact path="/" component={HomePage} />
            <Route path="/about" component={AboutPage} />
        </div>
    )
}

export default App;
