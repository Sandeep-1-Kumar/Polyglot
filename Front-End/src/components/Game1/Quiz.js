import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Quiz.css";
import { Card, Button, ProgressBar, Badge } from "react-bootstrap";
import BgLearning from "../Bg-Learning.svg";
import { BsXCircleFill } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { email } from "../Functions/CommonScripts.js";
import { updateScore } from "../Functions/APIFunctions.js";

function Quiz(props) {
  let [score, setScore] = useState(0);
  const [searchparams] = useSearchParams();
  const language = searchparams.get("lang");
  const languageId = searchparams.get("languageId");
  const navigate = useNavigate();
  const images = props.images;
  const cardNo = props.cardNo;
  const questions = props.questions;
  const optionA = props.optionA;
  const optionB = props.optionB;
  const optionC = props.optionC;
  const optionD = props.optionD;
  const answers = props.answers;
  const [count, setCount] = useState(0);

  const checkAnswer = (e, selectedAnswer) => {
    e.preventDefault();
    if (selectedAnswer === answers[count]) {
      setScore(score + 100 / cardNo);
      if (count + 1 === cardNo) {
        score = score + 100 / cardNo;
      }
    }
    if (count + 1 === cardNo) {
      direct(e);
    }
    setCount(count + 1);
  };

  const myStyle = {
    backgroundImage: `url(${BgLearning})`,
    height: "800px",
  };

  const direct = (e) => {
    updateScore(email, languageId, "1", score, language, navigate);
  };

  return (
    <div className="padding-main">
      <div className="row">
        <div className="col-1">
          <BsXCircleFill
            className="btn-color"
            onClick={(e) => {
              direct(e);
            }}
          />
        </div>
        <div className="col-11">
          <ProgressBar
            now={parseInt((count + 1) * (100 / cardNo))}
            label={`${parseInt((count + 1) * (100 / cardNo))}%`}
            className="prg-bar"
          />
        </div>
      </div>
      <div style={myStyle} className="card-game1">
        <Card className="text-center card-width card-width-game2">
          <Card.Body>
            <div>
              <h4 className="count">
                <center>
                  {count + 1}/{cardNo}
                </center>
                <Badge className="h4-score">Score {Math.ceil(score)}</Badge>
              </h4>
            </div>
            <div className="quiz-options">
              <br></br>
              <br></br>
              <div className="row">
                <div className="col-12">
                  <p className="p-main-game2 top-p top-p-game3">
                    {questions[count]}
                  </p>
                </div>
              </div>
              <Card.Img
                variant="top"
                src={images[count]}
                className="img-card"
              />
              <br></br>
              <div className="imag-gap"></div>
              <div className="row">
                <div className="col-lg-6">
                  <Button
                    key={1}
                    className="btn-game1"
                    onClick={(e) => checkAnswer(e, "A")}
                  >
                    {optionA[count]}
                  </Button>
                </div>
                <div className="col-lg-6">
                  <Button
                    key={2}
                    className="btn-game1 btn-game1-blue "
                    onClick={(e) => checkAnswer(e, "B")}
                  >
                    {optionB[count]}
                  </Button>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <Button
                    key={3}
                    className="btn-game1 btn-game1-blue "
                    onClick={(e) => checkAnswer(e, "C")}
                  >
                    {optionC[count]}
                  </Button>
                </div>
                <div className="col-lg-6">
                  <Button
                    key={4}
                    className="btn-game1"
                    onClick={(e) => checkAnswer(e, "D")}
                  >
                    {optionD[count]}
                  </Button>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Quiz;
