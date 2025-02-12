import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { Card, ProgressBar, Badge, Button, Nav } from "react-bootstrap";
import { BsCardHeading } from "react-icons/bs";
import { FaLanguage } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import {
  MdIncompleteCircle,
  MdLocalActivity,
  MdNotStarted,
} from "react-icons/md";
import { createSearchParams, useNavigate } from "react-router-dom";

function Lang(props) {
  return (
    <>
      <div className="col-1"></div>
      <Button className="col-lg-12 col-4 btn-sty" onClick={props.onClick}>
        <Nav.Link eventKey={props.language} className="nav-link-sty">
          <FaLanguage className="icon-sty" />
          <p className="span-sty">{props.language}</p>
        </Nav.Link>
      </Button>
      <div className="col-1"></div>
    </>
  );
}

function Dashcard(props) {
  const navigate = useNavigate();

  const learn_game = (e, btnState) => {
    if (props.level === "learn1") {
      navigate({
        pathname: "/Learning1",
        search: createSearchParams({
          score: props.score,
          lang: props.lang,
          languageId: props.languageId,
          btnState: btnState,
        }).toString(),
      });
    } else if (props.level === "learn2") {
      navigate({
        pathname: "/Learning2",
        search: createSearchParams({
          score: props.score,
          lang: props.lang,
          languageId: props.languageId,
          btnState: btnState,
        }).toString(),
      });
    } else if (props.level === "learn3") {
      navigate({
        pathname: "/Learning3",
        search: createSearchParams({
          score: props.score,
          lang: props.lang,
          languageId: props.languageId,
          btnState: btnState,
        }).toString(),
      });
    } else if (props.level === "game1") {
      navigate({
        pathname: "/Activity1",
        search: createSearchParams({
          score: props.score,
          lang: props.lang,
          languageId: props.languageId,
          btnState: btnState,
        }).toString(),
      });
    } else if (props.level === "game2") {
      navigate({
        pathname: "/Activity2",
        search: createSearchParams({
          score: props.score,
          lang: props.lang,
          languageId: props.languageId,
          btnState: btnState,
        }).toString(),
      });
    } else if (props.level === "game3") {
      navigate({
        pathname: "/Activity3",
        search: createSearchParams({
          score: props.score,
          lang: props.lang,
          languageId: props.languageId,
          btnState: btnState,
        }).toString(),
      });
    }
  };
  return (
    <Card className="card-main">
      <Card.Body>
        <div className="row">
          <div className="col-0.5 sta-div"></div>
          <div className="col-2 icon-div-two">
            {props.game === "learn" && <BsCardHeading className="icon-card" />}
            {props.game === "game" && <MdLocalActivity className="icon-card" />}
          </div>
          <div className="col-10">
            <Card.Title>
              <div className="card-title-main">
                {props.heading}{" "}
                {Math.ceil(props.score) <= 100 &&
                  Math.ceil(props.score) >= 0 && (
                    <Badge className="badge-card-begin">Beginner</Badge>
                  )}
                {Math.ceil(props.score) <= 100 &&
                  Math.ceil(props.score) >= 34 && (
                    <Badge className="badge-card-inter">Intermediate</Badge>
                  )}
                {Math.ceil(props.score) <= 100 &&
                  Math.ceil(props.score) >= 67 && (
                    <Badge className="badge-card-adv">Advanced</Badge>
                  )}
              </div>
              <p className="p-desc p-desc-dash">{props.desc}</p>
              {Math.ceil(props.score) === 100 && (
                <span className="span-acc span-pass">
                  <BsCheckCircleFill className="icon-acc" /> Completed
                </span>
              )}
              {Math.ceil(props.score) < 100 && Math.ceil(props.score) > 0 && (
                <span className="span-acc span-fail">
                  <MdIncompleteCircle className="icon-acc" /> In Progress
                </span>
              )}
              {Math.ceil(props.score) === 0 && (
                <span className="span-acc span-sta">
                  <MdNotStarted className="icon-acc" /> Not Started
                </span>
              )}
              {Math.ceil(props.score) === 0 && props.game === "learn" && (
                <Button
                  className="btn-resume"
                  onClick={(e) => learn_game(e, "Start")}
                >
                  START
                </Button>
              )}
              {Math.ceil(props.score) === 0 && props.game === "game" && (
                <Button
                  className="btn-resume"
                  onClick={(e) => learn_game(e, "Start")}
                >
                  START
                </Button>
              )}
              {Math.ceil(props.score) < 100 &&
                Math.ceil(props.score) > 0 &&
                props.game === "learn" && (
                  <Button
                    className="btn-resume"
                    onClick={(e) => learn_game(e, "Resume")}
                  >
                    RESUME
                  </Button>
                )}
              {Math.ceil(props.score) === 100 && props.game === "learn" && (
                <Button
                  className="btn-resume"
                  onClick={(e) => learn_game(e, "Restart")}
                >
                  RESTART
                </Button>
              )}
              {Math.ceil(props.score) > 0 &&
                Math.ceil(props.score) <= 100 &&
                props.game === "game" && (
                  <Button
                    className="btn-resume"
                    onClick={(e) => learn_game(e, "Restart")}
                  >
                    RESTART
                  </Button>
                )}
            </Card.Title>
            <ProgressBar
              now={Math.ceil(props.score)}
              label={`${Math.ceil(props.score)}%`}
              className="prog-card"
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
export { Dashcard, Lang };
