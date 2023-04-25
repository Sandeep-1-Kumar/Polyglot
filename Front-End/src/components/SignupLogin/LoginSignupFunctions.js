import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import { BsXCircleFill, BsCheckCircleFill } from "react-icons/bs";
import {
  validEmail,
  validUsername,
  validPassword,
} from "../Functions/APIFunctions.js";

export function checkEmail(setMessage, setMessageEmail, email) {
  const regExp = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/;
  setMessage((e) => {
    if (regExp.test(email)) {
      setMessageEmail(validEmail);
      return setMessage(
        <span className="span-acc-pass">
          <BsCheckCircleFill className="icon-acc" />
          Valid Email
        </span>
      );
    } else if (!regExp.test(email) && email !== "") {
      setMessageEmail("");
      return setMessage(
        <span className="span-acc-error">
          <BsXCircleFill className="icon-acc" />
          Invalid Email
        </span>
      );
    } else {
      setMessageEmail("");
      return setMessage(<span className="span-acc-error"></span>);
    }
  });
}

export function checkPass(setMessage, setMessagePassword, password) {
  const regExp = /^[a-zA-Z0-9!@#$%^&*]{8,}$/;
  setMessage((e) => {
    if (!regExp.test(password) && password !== "") {
      setMessagePassword("");
      return setMessage(
        <span className="span-acc-error">
          <BsXCircleFill className="icon-acc" />
          Enter atleast 8 Characters
        </span>
      );
    } else if (regExp.test(password)) {
      setMessagePassword(validPassword);
      return setMessage(
        <span className="span-acc-pass">
          <BsCheckCircleFill className="icon-acc" />
          Valid Password
        </span>
      );
    } else {
      setMessagePassword("");
      return setMessage(<span className="span-acc-error"></span>);
    }
  });
}

export function checkUser(setMessage, setMessageUsername, username) {
  const regExp = /^[a-zA-Z]{8,}$/;
  setMessage((e) => {
    if (!regExp.test(username) && username !== "") {
      setMessageUsername("");
      return setMessage(
        <span className="span-acc-error">
          <BsXCircleFill className="icon-acc" />
          Enter atleast 8 Characters
        </span>
      );
    } else if (regExp.test(username)) {
      setMessageUsername(validUsername);
      return setMessage(
        <span className="span-acc-pass">
          <BsCheckCircleFill className="icon-acc" />
          Valid Username
        </span>
      );
    } else {
      setMessageUsername("");
      return setMessage(<span className="span-acc-error"></span>);
    }
  });
}
