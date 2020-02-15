import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import Visit from "./pages/Visit";
import Dash from "./pages/Dash";
import Incident from "./pages/Incident";
import Wait from "./pages/Wait";
import Past from "./pages/Past";
import Collaborator from "./pages/Collaborator";
import NewCollaborator from "./pages/NewCollaborator";
import Parent from "./pages/Parent";
import NewParent from "./pages/NewParent";
import Kid from "./pages/Kid";
import NewKid from "./pages/NewKid";
import Login from "./pages/Login";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/Login", state: { from: props.location } }} />
      )
    }
  />
);

function Routes() {
  return (
    <Switch>
      <Route path="/Login" exact component={Login} />
      <Route path="/dash" exact component={Dash} />
      <PrivateRoute path="/" exact component={Visit} />
      <PrivateRoute path="/kid" component={Kid} />
      <PrivateRoute path="/new-kid" component={NewKid} />
      <PrivateRoute path="/parent" component={Parent} />
      <PrivateRoute path="/new-parent" component={NewParent} />
      <PrivateRoute path="/collaborator" component={Collaborator} />
      <PrivateRoute path="/new-collaborator" component={NewCollaborator} />
      <PrivateRoute path="/incident" component={Incident} />
      <PrivateRoute path="/wait" component={Wait} />
      <PrivateRoute path="/past" component={Past} />
      
      <Route path="*" component={() => <h1>Página não encontrada!</h1>} />
    </Switch>
  );
}

export default Routes;