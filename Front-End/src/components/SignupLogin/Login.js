import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import { CloseButton, Alert, Button } from "react-bootstrap";
import { BiLogInCircle } from "react-icons/bi";
import Cookies from "universal-cookie";
import LoginForm from "./LoginForm.js";

function Login() {
  const cookieslog = new Cookies();
  const cook_log = cookieslog.get("login");
  const [messInvalid, setMessageInvalid] = useState(cook_log);

  const removestyle = () => {
    setMessageInvalid("");
  };

  return (
    <div className="sign-div">
      <div id="con" className="contact">
        <div className="icon-div row">
          <div className="col-12">
            <Button className="title-beauty">LOGIN</Button>
          </div>
          <div className="col-12">
            <BiLogInCircle className="big-icon" />
          </div>
        </div>
        <p className="about-p">Signin to Continue</p>
        {messInvalid === "Success" && (
          <Alert key="success" variant="success" className="col-md-8 alert">
            <p className="alert-p">Account Created. Please Signin</p>
            <CloseButton className="alert-close" onClick={removestyle} />
          </Alert>
        )}
        {messInvalid === undefined && (
          <Alert key="warning" variant="warning" className="col-md-5 alert">
            <p className="alert-p">Please Signin</p>
            <CloseButton className="alert-close" onClick={removestyle} />
          </Alert>
        )}
        {messInvalid === "Invalid Credentials" && (
          <Alert key="danger" variant="danger" className="col-md-5 alert">
            <p className="alert-p">{messInvalid}</p>
            <CloseButton className="alert-close" onClick={removestyle} />
          </Alert>
        )}
        {messInvalid === "Please check the Username/Password" && (
          <Alert key="danger" variant="danger" className="col-md-10 alert">
            <p className="alert-p">{messInvalid}</p>
            <CloseButton className="alert-close" onClick={removestyle} />
          </Alert>
        )}
        <LoginForm setMessageInvalid={setMessageInvalid} />
      </div>
    </div>
  );
}

export default Login;
