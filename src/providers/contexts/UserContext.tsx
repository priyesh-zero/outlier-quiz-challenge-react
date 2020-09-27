import React, { createContext, FC, useState } from "react";

export const UserContext = createContext({
  name: "generic user",
  setUser: (_: string) => {},
});

export const UserProvider: FC<{}> = ({ children }) => {
  const [userName, setUserName] = useState("");
  const changeName = (name: string) => setUserName(name);
  return (
    <UserContext.Provider value={{ name: userName, setUser: changeName }}>
      {children}
    </UserContext.Provider>
  );
};
