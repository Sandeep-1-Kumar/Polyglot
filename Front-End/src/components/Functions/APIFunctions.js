import Cookies from "universal-cookie";
import { API_BASE_URL } from "../../constants";
import {
  signIn,
  signUp,
  getRegisteredLanguages,
  getLanguageScores,
  assignLanguage,
} from "./APIUrl.js";
import { createSearchParams } from "react-router-dom";

export const cookieslog = new Cookies();
export const cook_log = cookieslog.get("login");
export const respSuccess = "10200";
export const respSuccess_2 = "10201";
export const internalError = "10404";
export const internalError_2 = "10409";
export const userPassError = "Please check the Username/Password";
export const userExist = "User Already Exists. Please Signup Again";
export const successMessage = "Successful Credentials";
export const validEmail = "Valid Email";
export const validPassword = "Valid Password";
export const validUsername = "Valid Username";
export const invalidCredentials = "Invalid Credentials";

export function loginForm(
  player,
  setMessageInvalid,
  setCookie,
  userName,
  empty
) {
  fetch(API_BASE_URL + signIn, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(player),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errorCode === respSuccess) {
        setMessageInvalid(successMessage);
        setCookie("user", userName, { path: "/" });
        cookieslog.remove("login");
        empty();
        window.location.href = "/Home";
      } else if (responseJson.errorCode === internalError) {
        setMessageInvalid(userPassError);
        empty();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function signUpForm(
  player,
  setMessageInvalid,
  setCookie,
  empty,
  navigate
) {
  fetch(API_BASE_URL + signUp, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(player),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errorCode === respSuccess_2) {
        setMessageInvalid(successMessage);
        setCookie("login", "Success", { path: "/" });
        empty();
        navigate("/Login");
      } else if (responseJson.errorCode === internalError_2) {
        setMessageInvalid(userExist);
        empty();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getLanguage(
  email,
  setLangCount,
  setLangDash,
  setLangDashCode,
  langCount
) {
  const getEmail = { email };
  fetch(API_BASE_URL + getRegisteredLanguages, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getEmail),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      setLangCount(Object.keys(responseJson.RegisteredLanguages).length);
      for (var i = 0; i < langCount; i++) {
        setLangDash(responseJson.RegisteredLanguages[i]["languageName"]);
        setLangDashCode(responseJson.RegisteredLanguages[i]["languageCode"]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getLanguageDashboard(
  email,
  setLangCount,
  langCount,
  setLangDashCode
) {
  const getEmail = { email };
  const sa = [];
  fetch(API_BASE_URL + getRegisteredLanguages, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getEmail),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      setLangCount(Object.keys(responseJson.RegisteredLanguages).length);
      for (var i = 0; i < langCount; i++) {
        sa.push([
          responseJson.RegisteredLanguages[i]["languageName"],
          responseJson.RegisteredLanguages[i]["languageCode"],
        ]);
      }
      setLangDashCode(sa);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getScores(
  scores,
  setScore1,
  setScore2,
  setScore3,
  setScore4,
  setScore5,
  setScore6
) {
  fetch(API_BASE_URL + getLanguageScores, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scores),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      setScore1(Math.ceil(responseJson.learning_1.Score));
      setScore2(Math.ceil(responseJson.learning_2.Score));
      setScore3(Math.ceil(responseJson.learning_3.Score));
      setScore4(Math.ceil(responseJson.activity_1.Score));
      setScore5(Math.ceil(responseJson.activity_2.Score));
      setScore6(Math.ceil(responseJson.activity_3.Score));
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getRegisterLanguages(
  email,
  setLangCount,
  languageName,
  languageNameCode,
  langCount,
  setLangDash,
  setLangDashCode
) {
  const getEmail = { email };
  fetch(API_BASE_URL + getRegisteredLanguages, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getEmail),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      setLangCount(Object.keys(responseJson.RegisteredLanguages).length);
      for (var i = 0; i < langCount; i++) {
        languageName.push(responseJson.RegisteredLanguages[i]["languageName"]);
        languageNameCode.push([
          responseJson.RegisteredLanguages[i]["languageName"],
          responseJson.RegisteredLanguages[i]["languageCode"],
        ]);
      }
      setLangDash(languageName);
      setLangDashCode(languageNameCode);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function assignLang(email, languageId, language, navigate) {
  const lang = { email, languageId };
  fetch(API_BASE_URL + assignLanguage, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lang),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errorCode === "10201") {
        navigate({
          pathname: "/Dashboard",
          search: createSearchParams({
            lang: language,
            languageId: languageId,
          }).toString(),
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
