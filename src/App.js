import React from "react";

import { Route, Switch } from "react-router-dom";
import ToolbarLay from "./layout/toolbar";
import HomePage from "./home-page";
import Administrator from "./Administrator/Administrator";

import "./App.css";
import Company from "./Company";
import Reports from "./Reports/Reports";

function App() {
  return (
    <div>
      <ToolbarLay />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/administrator" component={Administrator} />
        <Route exact path="/company" component={Company} />
        <Route exact path="/reports" component={Reports} />
      </Switch>
    </div>
  );
}

export default App;

//       <Route path="/:id" component={UserPage} />
