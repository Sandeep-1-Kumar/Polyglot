import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Game3.css";
import Omr from "./Omr.js";
import { useSearchParams } from "react-router-dom";
import { getGameG3 } from "../Functions/APIFunctions.js";

function Game3() {
  const [searchparams] = useSearchParams();
  let score = useState(searchparams.get("score"));
  const language = searchparams.get("lang");
  const languageId = searchparams.get("languageId");
  const [transCards, setTransCards] = useState([]);
  const [engVerbCards, setEngVerbCards] = useState([]);
  const [feature, setFeature] = useState([]);
  const [langCount, setLangCount] = useState(0);
  const trans = [];
  const engVerb = [];

  const getGame = () => {
    getGameG3(
      languageId,
      setLangCount,
      langCount,
      trans,
      engVerb,
      feature,
      setTransCards,
      setEngVerbCards,
      setFeature
    );
  };

  useEffect(() => {
    getGame();
  }, [langCount]);

  return (
    <div>
      <div className="color-div">
        <h1 className="head-h1">ACTIVITY III</h1>
        <Omr
          trans={transCards}
          engVerb={engVerbCards}
          language={language}
          languageId={languageId}
          score={parseInt(score)}
          cardNo={10}
          cardAll={langCount}
          feature={feature}
        />
      </div>
    </div>
  );
}

export default Game3;
