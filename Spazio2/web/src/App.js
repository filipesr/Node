import React from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";
//import Header from "./components/Header";



function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
