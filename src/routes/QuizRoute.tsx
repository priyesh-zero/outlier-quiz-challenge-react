import React, { useContext } from "react";
import { Switch, Route, useLocation } from "react-router";

import ProgressBar from "react-bootstrap/ProgressBar";

import { QuizHome } from "./quiz/QuizHome";
import { Questions } from "./quiz/Questions";
import { QuizContext } from "../providers/contexts/QuizContext";

export const QuizRoute = () => {
  const location = useLocation();
  const { questions, currentQuestion } = useContext(QuizContext);
  return (
    <>
      <ProgressBar
        variant="danger"
        style={{ height: 5 }}
        animated
        striped
        now={(currentQuestion / questions.length) * 100}
      />
      <Switch location={location} key={location.key}>
        <Route path="/quiz/:qno" component={Questions} />
        <Route exact path="/quiz" component={QuizHome} />
      </Switch>
    </>
  );
};
