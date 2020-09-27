import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { HomeRoute } from "./HomeRoute";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route excat path="/" component={HomeRoute} />
      </Switch>
    </BrowserRouter>
  );
};
