import Cookies from "universal-cookie";
import { API_BASE_URL } from "../../constants";
import {
  signIn,
  signUp,
  getRegisteredLanguages,
  getLanguageScores,
  assignLanguage,
  updateModuleScore,
  getGame,
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
    .catch();
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
    .catch();
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
      for (
        var i = 0;
        i < Object.keys(responseJson.RegisteredLanguages).length;
        i++
      ) {
        setLangDash(responseJson.RegisteredLanguages[i]["languageName"]);
        setLangDashCode(responseJson.RegisteredLanguages[i]["languageCode"]);
      }
    })
    .catch();
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
    .catch();
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
      setScore1(responseJson.learning_1.Score);
      setScore2(responseJson.learning_2.Score);
      setScore3(responseJson.learning_3.Score);
      setScore4(responseJson.activity_1.Score);
      setScore5(responseJson.activity_2.Score);
      setScore6(responseJson.activity_3.Score);
    })
    .catch();
}

export function getRegisterLanguages(
  email,
  setLangCount,
  languageName,
  languageNameCode,
  langCount,
  setLangDash
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
      for (
        var i = 0;
        i < Object.keys(responseJson.RegisteredLanguages).length;
        i++
      ) {
        languageName.push(responseJson.RegisteredLanguages[i]["languageName"]);
      }
      setLangDash(languageName);
    })
    .catch();
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
    .catch();
}

export function updateScore(
  email,
  languageId,
  moduleId,
  cardCount,
  language,
  navigate
) {
  const updScores = {
    email,
    languageId,
    moduleId,
    newScore: cardCount,
  };
  fetch(API_BASE_URL + updateModuleScore, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updScores),
  });
  navigate({
    pathname: "/Dashboard",
    search: createSearchParams({
      lang: language,
      languageId: languageId,
    }).toString(),
  });
}

export function getGameL1(
  languageId,
  setLangCount,
  headings,
  trans,
  images,
  setHeadCards,
  setTransCards,
  setImagesCards
) {
  const game = {
    languageId,
    moduleId: 1,
  };
  fetch(API_BASE_URL + getGame, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      setLangCount(Object.keys(responseJson["game_first"]).length);
      for (var i = 0; i < Object.keys(responseJson["game_first"]).length; i++) {
        headings.push(responseJson["game_first"][i]["englishVerb"]);
        trans.push(responseJson["game_first"][i]["translatedVerb"]);
        images.push(responseJson["game_first"][i]["urlImage"]);
      }
      setHeadCards(headings);
      setTransCards(trans);
      setImagesCards(images);
    })
    .catch();
}

export function getGameL2(
  languageId,
  setLangCount,
  headings,
  trans,
  images,
  features,
  conjugate,
  italian,
  setHeadCards,
  setTransCards,
  setImagesCards,
  setFeaturesCards,
  setConjugateCards,
  setItalianCards
) {
  const game = {
    languageId,
    moduleId: 3,
  };
  fetch(API_BASE_URL + getGame, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      setLangCount(Object.keys(responseJson["game_second"]).length);
      for (
        var i = 0;
        i < Object.keys(responseJson["game_second"]).length;
        i++
      ) {
        headings.push(responseJson["game_second"][i]["englishVerb"]);
        images.push(responseJson["game_second"][i]["urlImage"]);
        trans.push(responseJson["game_second"][i]["translatedVerb"]);
        features.push(
          checkPerson(responseJson["game_second"][i]["features"].split("+"))
        );
        conjugate.push(responseJson["game_second"][i]["conjugateEnglishVerb"]);
        italian.push(responseJson["game_second"][i]["verb"]);
      }
      setHeadCards(headings);
      setTransCards(trans);
      setImagesCards(images);
      setFeaturesCards(features);
      setConjugateCards(conjugate);
      setItalianCards(italian);
    })
    .catch();
}

export function getGameL3(
  languageId,
  setLangCount,
  headings,
  trans,
  images,
  features,
  conjugate,
  italian,
  setHeadCards,
  setTransCards,
  setImagesCards,
  setFeaturesCards,
  setConjugateCards,
  setItalianCards
) {
  const game = {
    languageId,
    moduleId: 5,
  };
  fetch(API_BASE_URL + getGame, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (languageId === "2004") {
        setLangCount(Object.keys(responseJson["game_third"]).length - 57);
        for (
          var i = 57;
          i < Object.keys(responseJson["game_third"]).length;
          i++
        ) {
          headings.push(responseJson["game_third"][i]["englishVerb"]);
          images.push(responseJson["game_third"][i]["urlImage"]);
          trans.push(responseJson["game_third"][i]["translatedVerb"]);
          features.push(
            checkPerson(responseJson["game_third"][i]["features"].split("+"))
          );
          conjugate.push(responseJson["game_third"][i]["conjugateEnglishVerb"]);
          italian.push(responseJson["game_third"][i]["verb"]);
        }
      } else {
        setLangCount(Object.keys(responseJson["game_third"]).length);
        for (i = 0; i < Object.keys(responseJson["game_third"]).length; i++) {
          headings.push(responseJson["game_third"][i]["englishVerb"]);
          images.push(responseJson["game_third"][i]["urlImage"]);
          trans.push(responseJson["game_third"][i]["translatedVerb"]);
          features.push(
            checkPerson(responseJson["game_third"][i]["features"].split("+"))
          );
          conjugate.push(responseJson["game_third"][i]["conjugateEnglishVerb"]);
          italian.push(responseJson["game_third"][i]["verb"]);
        }
      }
      setHeadCards(headings);
      setTransCards(trans);
      setImagesCards(images);
      setFeaturesCards(features);
      setConjugateCards(conjugate);
      setItalianCards(italian);
    })
    .catch();
}

const checkPerson = (feature) => {
  let conStr = "";
  if (feature[0] === "NEG") {
    conStr += "Negative ";
    feature[0] = feature[1];
    feature[1] = feature[2];
  }
  if (feature[0] === "1s") {
    conStr += "First Person Singular";
  } else if (feature[0] === "1p") {
    conStr += "First Person Plural";
  } else if (feature[0] === "2s") {
    conStr += "Second Person Singular";
  } else if (feature[0] === "2p") {
    conStr += "Second Person Plural";
  } else if (feature[0] === "3s") {
    conStr += "Third Person Singular";
  } else if (feature[0] === "3p") {
    conStr += "Third Person Plural";
  }
  if (feature[1] === "PRES") {
    conStr += " (Present Tense)";
  } else if (feature[1] === "FUT") {
    conStr += " (Future Tense)";
  } else if (feature[1] === "PAST") {
    conStr += " (Past Tense)";
  } else if (feature[1] === "PERF") {
    conStr += " (Perfect Tense)";
  } else if (feature[1] === "IMP") {
    conStr += " (Imperative Tense)";
  }
  return conStr;
};

export function getGameG1(
  languageId,
  setLangCount,
  ques,
  optA,
  optB,
  optC,
  optD,
  ans,
  image,
  setQuestions,
  setOptionA,
  setOptionB,
  setOptionC,
  setOptionD,
  setAnswers,
  setImages
) {
  fetch(API_BASE_URL + getGame, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      languageId,
      moduleId: 2,
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      setLangCount(Object.keys(responseJson.game_first).length);
      for (var i = 0; i < Object.keys(responseJson.game_first).length; i++) {
        ques.push(responseJson.game_first[i]["question"]);
        optA.push(responseJson.game_first[i]["optionA"].toUpperCase());
        optB.push(responseJson.game_first[i]["optionB"].toUpperCase());
        optC.push(responseJson.game_first[i]["optionC"].toUpperCase());
        optD.push(responseJson.game_first[i]["optionD"].toUpperCase());
        ans.push(responseJson.game_first[i]["answer"]);
        image.push(responseJson.game_first[i]["urlImage"]);
      }
      setQuestions(ques);
      setOptionA(optA);
      setOptionB(optB);
      setOptionC(optC);
      setOptionD(optD);
      setAnswers(ans);
      setImages(image);
    })
    .catch();
}

export function getGameG2(
  languageId,
  setLangCount,
  langCount,
  trans,
  images,
  setTransCards,
  setImagesCards
) {
  const game = {
    languageId,
    moduleId: 4,
  };
  fetch(API_BASE_URL + getGame, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      setLangCount(Object.keys(responseJson["game_second"]).length);
      for (
        var i = 0;
        i < Object.keys(responseJson["game_second"]).length;
        i++
      ) {
        trans.push(responseJson["game_second"][i]["translatedVerb"]);
        images.push(responseJson["game_second"][i]["urlImage"]);
      }
      setTransCards(trans);
      setImagesCards(images);
    })
    .catch();
}

export function getGameG3(
  languageId,
  setLangCount,
  langCount,
  trans,
  engVerb,
  setTransCards,
  setEngVerbCards
) {
  const game = {
    languageId,
    moduleId: 6,
  };
  fetch(API_BASE_URL + getGame, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      setLangCount(Object.keys(responseJson["game_third"]).length);
      for (var i = 0; i < Object.keys(responseJson["game_third"]).length; i++) {
        trans.push(responseJson["game_third"][i]["translatedVerb"]);
        engVerb.push(responseJson["game_third"][i]["conjugateEnglishVerb"]);
      }
      setTransCards(trans);
      setEngVerbCards(engVerb);
    })
    .catch();
}
