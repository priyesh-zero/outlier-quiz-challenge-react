import React from "react";
import "./App.css";
import { Routes } from "./routes";
import { Providers } from "./providers";

function App() {
  return (
    <div className="App">
      <Providers>
        <Routes />
      </Providers>
    </div>
  );
}

export default App;
