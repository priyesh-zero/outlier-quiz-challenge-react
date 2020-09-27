import React, { FC } from "react";
import { UserProvider } from "./contexts/UserContext";

export const Providers: FC<{}> = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};
