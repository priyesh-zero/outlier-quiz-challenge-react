import React from "react";
import { useRouteMatch } from "react-router";

export const Questions = () => {
  const match = useRouteMatch<{ qno: string }>();
  return <h1>{match.params.qno}</h1>;
};
