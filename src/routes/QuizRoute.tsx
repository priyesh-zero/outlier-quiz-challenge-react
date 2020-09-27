import React from "react";
import { Switch, Route, useLocation } from "react-router";

import { QuizHome } from "./quiz/QuizHome";
import { Questions } from "./quiz/Questions";

export const QuizRoute = () => {
  const location = useLocation();
  return (
    <Switch location={location} key={location.key}>
      <Route path="/quiz/:qno" component={Questions} />
      <Route exact path="/quiz" component={QuizHome} />
    </Switch>
  );
};
