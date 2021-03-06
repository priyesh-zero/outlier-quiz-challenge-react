import React from "react";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";

import { HomeRoute } from "./HomeRoute";
import { QuizRoute } from "./QuizRoute";
import { AnimatePresence } from "framer-motion";
import { Providers } from "../providers";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Providers>
        <SwitchRoutes />
      </Providers>
    </BrowserRouter>
  );
};

const SwitchRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.key}>
        <Route path="/quiz" component={QuizRoute} />
        <Route exact path="/" component={HomeRoute} />
      </Switch>
    </AnimatePresence>
  );
};
