import React, { FC } from "react";
import { UserProvider } from "./contexts/UserContext";
import { QuizProvider } from "./contexts/QuizContext";

export const Providers: FC<{}> = ({ children }) => {
  return (
    <UserProvider>
      <QuizProvider>{children}</QuizProvider>
    </UserProvider>
  );
};
