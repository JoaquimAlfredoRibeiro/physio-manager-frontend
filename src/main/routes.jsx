import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "../components/main/header/Header.component";

export default props => (
  <BrowserRouter>
    <div>
      <Header />
      <h1>Heya</h1>
    </div>
  </BrowserRouter>
);
