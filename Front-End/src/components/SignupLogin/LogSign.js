import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import Signup from "./Signup.js";
import Login from "./Login.js";
import Navbar from "../Navbar/NavBar.js";

function LogSign(props) {
  return (
    <div>
      <div className="absol">
        <div className="top-div"></div>
        <Navbar />
      </div>
      <div className="row">
        <div className="first-div col-lg-6">
          <h2 className="h2-acc">Learn</h2>
          <p className="p-acc">
            PolyGlot is a platform for language learning. This application
            enabling english speakers to learn a different language.
          </p>
          <img className="img-acc" src="./images/icon.png" alt="icon"></img>
        </div>
        <div className="second-div col-lg-6">
          {props.active === "first" && <Login />}
          {props.active === "second" && <Signup />}
        </div>
      </div>
    </div>
  );
}

export default LogSign;
