import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { Lang, Dashcard } from "./Dashcard.js";
import Navbar from "./NavBar.js";
import Nav from "react-bootstrap/Nav";
import BgLearning from "./Bg-Learning_1.svg";
import Cookies from "universal-cookie";

function Dashboard() {
  const italianCode = "2001";
  const frenchCode = "2002";
  const spanishCode = "2003";
  const cookieslog = new Cookies();
  const email = cookieslog.get("user");
  const [lang, setLang] = useState("Italian");
  const [languageId, setLanguageId] = useState("2001");
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);
  const [score4, setScore4] = useState(0);
  const [score5, setScore5] = useState(0);
  const [score6, setScore6] = useState(0);
  const scores = { email, languageId };

  const getScores = () => {
    fetch("http://localhost:8080/polyglot/player/getLanguageScores", {
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
      });
  };

  getScores();

  const myStyle = {
    backgroundImage: `url(${BgLearning})`,
    maxheight: "100vh",
    overflow: "auto",
  };

  const language = (e, langCode) => {
    e.preventDefault();
    if (langCode === "2001") {
      setLang("Italian");
      setLanguageId("2001");
    } else if (langCode === "2002") {
      setLang("French");
      setLanguageId("2002");
    } else if (langCode === "2003") {
      setLang("Spanish");
      setLanguageId("2003");
    }
    getScores();
  };
  return (
    <div>
      <div className="top-div"></div>
      <Navbar />
      <div className="row">
        <div className="col-lg-2 bg-color">
          <Nav className="flex-column nav-sty" defaultActiveKey="ITALIAN">
            <Lang
              language="ITALIAN"
              onClick={(e) => language(e, italianCode)}
            />
            <Lang language="FRENCH" onClick={(e) => language(e, frenchCode)} />
            <Lang
              language="SPANISH"
              onClick={(e) => language(e, spanishCode)}
            />
          </Nav>
        </div>
        <div className="col-lg-10">
          <div className="row">
            <h1 className="card-head">{lang} Dashboard</h1>
          </div>
          <div className="row">
            <div className="col-lg-6 img-div" style={myStyle}>
              <h1 className="card-h1">LEARNING</h1>
              <Dashcard
                heading="Learning I"
                game="learn"
                lang={lang}
                languageId={languageId}
                level="learn1"
                score={score1}
                desc="Here will be the Description."
              />
              <Dashcard
                heading="Learning II"
                game="learn"
                lang={lang}
                languageId={languageId}
                level="learn2"
                score={score2}
                desc="Here will be the Description."
              />
              <Dashcard
                heading="Learning III"
                game="learn"
                lang={lang}
                languageId={languageId}
                level="learn3"
                score={score3}
                desc="Here will be the Description."
              />
            </div>
            <div className="col-lg-6 img-div" style={myStyle}>
              <h1 className="card-h1">ACTIVITIES</h1>
              <Dashcard
                heading="Activity I"
                game="game"
                lang={lang}
                languageId={languageId}
                level="game1"
                score={score4}
                desc="Here will be the Description."
              />
              <Dashcard
                heading="Activity II"
                game="game"
                lang={lang}
                languageId={languageId}
                level="game2"
                score={score5}
                desc="Here will be the Description."
              />
              <Dashcard
                heading="Activity III"
                game="game"
                lang={lang}
                languageId={languageId}
                level="game3"
                score={score6}
                desc="Here will be the Description."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
