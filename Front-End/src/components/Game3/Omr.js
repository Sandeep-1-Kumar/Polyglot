import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Game3.css";
import { Card, ProgressBar, Badge } from "react-bootstrap";
import BgLearning from "../Bg-Learning.svg";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { BsXCircleFill } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { email, genRand2, shuffleArray } from "../Functions/CommonScripts.js";
import { updateScore } from "../Functions/APIFunctions.js";
import GroupButton from "./GroupButton.js";

function Omr(props) {
  const [searchparams] = useSearchParams();
  const language = searchparams.get("lang");
  const languageId = searchparams.get("languageId");
  const navigate = useNavigate();
  const trans = props.trans;
  const cardNo = props.cardNo;
  const cardAll = props.cardAll;
  const engVerb = props.engVerb;
  const feature = props.feature;
  const [count, setCount] = useState(0);
  let [score, setScore] = useState(0);
  const numbers = [0, 1, 2];
  let nums_set = new Set();
  let [nums, setNums] = useState([]);
  const op = ["A", "B", "C"];

  const [shuffledCards, setShuffledCards] = useState(shuffleArray(numbers));

  const initialCheck = (nums_set) => {
    if (score === 0) {
      setNums(genRand2(nums_set));
    }
  };

  useEffect(() => {
    initialCheck(nums_set);
  }, [cardAll]);

  const myStyle = {
    backgroundImage: `url(${BgLearning})`,
    height: "800px",
  };

  const [target1, setTarget1] = useState(null);
  const [target2, setTarget2] = useState(null);
  const [target3, setTarget3] = useState(null);
  const [color1A, setColor1A] = useState("");
  const [color1B, setColor1B] = useState("");
  const [color1C, setColor1C] = useState("");
  const [color2A, setColor2A] = useState("");
  const [color2B, setColor2B] = useState("");
  const [color2C, setColor2C] = useState("");
  const [color3A, setColor3A] = useState("");
  const [color3B, setColor3B] = useState("");
  const [color3C, setColor3C] = useState("");

  const check = (e) => {
    if (
      target1 === op[shuffledCards[0]] &&
      target2 === op[shuffledCards[1]] &&
      target3 === op[shuffledCards[2]]
    ) {
      setScore(score + 100 / cardNo);
      if (count + 1 === cardNo) {
        score = score + 100 / cardNo;
      }
    }
    reset();
  };

  const reset = () => {
    setTarget1(null);
    setTarget2(null);
    setTarget3(null);
    setColor1A("");
    setColor1B("");
    setColor1C("");
    setColor2A("");
    setColor2B("");
    setColor2C("");
    setColor3A("");
    setColor3B("");
    setColor3C("");
  };

  const addCount = (e) => {
    check(e);
    e.preventDefault();
    if (count === cardNo - 1) {
      direct(e);
    } else {
      setCount(count + 1);
    }
    setShuffledCards(shuffleArray(numbers));
  };

  const direct = (e) => {
    updateScore(email, languageId, "5", score, language, navigate);
  };

  return (
    <div>
      <div className="padding-main">
        {" "}
        <div className="row">
          <div className="col-1">
            <BsXCircleFill
              className="btn-color"
              onClick={(e) => {
                check(e);
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
        <div style={myStyle} className="card-game3">
          <Card className="text-center card-width card-width-game3">
            <Card.Body>
              <div>
                <h4 className="count">
                  <center>
                    {count + 1}/{cardNo}
                  </center>
                  <Badge className="h4-score">Score {Math.ceil(score)}</Badge>
                </h4>
              </div>
              <br></br>
              <p className="p-main-game2 top-p top-p-game3">
                ... Select the options to match the correct tenses ...
              </p>
              <div className="row main-game3">
                <div className="col-md-4 col-sm-6 col-6">
                  <Card.Title className="quiz-head">Questions</Card.Title>
                  <Card.Body className="question-text">
                    <div className="game-head">
                      <p className="game3-p">
                        1. {trans[shuffledCards[0] + nums[count]]}
                      </p>
                    </div>
                    <div className="game-head">
                      <p className="game3-p">
                        2. {trans[shuffledCards[1] + nums[count]]}
                      </p>
                    </div>
                    <div className="game-head">
                      <p className="game3-p">
                        3. {trans[shuffledCards[2] + nums[count]]}
                      </p>
                    </div>
                  </Card.Body>
                </div>
                <div className="col-md-4 col-sm-6 col-6">
                  <Card.Title className="quiz-head">Answers</Card.Title>
                  <Card.Body className="question-text">
                    <div className="game-head">
                      <p
                        class="game3-p"
                        data-toggle="tooltip"
                        data-placement="top"
                        title={feature[nums[count] + 0]}
                      >
                        A. {engVerb[nums[count] + 0]}
                      </p>
                    </div>
                    <div className="game-head">
                      <p
                        class="game3-p"
                        data-toggle="tooltip"
                        data-placement="top"
                        title={feature[nums[count] + 1]}
                      >
                        B. {engVerb[nums[count] + 1]}
                      </p>
                    </div>
                    <div className="game-head">
                      <p
                        class="game3-p"
                        data-toggle="tooltip"
                        data-placement="top"
                        title={feature[nums[count] + 2]}
                      >
                        C. {engVerb[nums[count] + 2]}
                      </p>
                    </div>
                  </Card.Body>
                </div>
                <div className="col-md-4 col-sm-12 col-12">
                  <Card.Title className="quiz-head">Options</Card.Title>
                  <div className="opt-div">
                    <Card.Body className="question-text">
                      <GroupButton
                        setTarget1={setTarget1}
                        setQues="1"
                        setColor1A={[setColor1A, color1A]}
                        setColor1B={[setColor1B, color1B]}
                        setColor1C={[setColor1C, color1C]}
                        setColor2A={[setColor2A, color2A]}
                        setColor2B={[setColor2B, color2B]}
                        setColor2C={[setColor2C, color2C]}
                        setColor3A={[setColor3A, color3A]}
                        setColor3B={[setColor3B, color3B]}
                        setColor3C={[setColor3C, color3C]}
                      />
                      <GroupButton
                        setTarget2={setTarget2}
                        setQues="2"
                        setColor1A={[setColor1A, color1A]}
                        setColor1B={[setColor1B, color1B]}
                        setColor1C={[setColor1C, color1C]}
                        setColor2A={[setColor2A, color2A]}
                        setColor2B={[setColor2B, color2B]}
                        setColor2C={[setColor2C, color2C]}
                        setColor3A={[setColor3A, color3A]}
                        setColor3B={[setColor3B, color3B]}
                        setColor3C={[setColor3C, color3C]}
                      />
                      <GroupButton
                        setTarget3={setTarget3}
                        setQues="3"
                        setColor1A={[setColor1A, color1A]}
                        setColor1B={[setColor1B, color1B]}
                        setColor1C={[setColor1C, color1C]}
                        setColor2A={[setColor2A, color2A]}
                        setColor2B={[setColor2B, color2B]}
                        setColor2C={[setColor2C, color2C]}
                        setColor3A={[setColor3A, color3A]}
                        setColor3B={[setColor3B, color3B]}
                        setColor3C={[setColor3C, color3C]}
                      />
                    </Card.Body>
                  </div>
                </div>
              </div>
              <div className="button-contianer">
                <FaChevronCircleLeft className="btn-left no-left-btn" />
                <FaChevronCircleRight
                  className="btn-right"
                  onClick={(e) => {
                    addCount(e);
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Omr;
