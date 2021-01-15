import React from "react";
import { Albums } from "./Albums";
import { Info } from "./Info";
import { Settings } from './Settings'
import { Container, Header, Nav, SettingsLink } from "../styles/App";
import { Switch, Route } from "react-router-dom";

export function App() {
  return (
    <Container>
        <Nav>
          <h1>
            <Header to="/">Music</Header>
          </h1>
          <SettingsLink to="/settings">Settings</SettingsLink>
        </Nav>
      <Switch>
        <Route exact path={["/", "/albums"]} component={Albums} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/albums/:id" component={Info} />
      </Switch>
    </Container>
  );
}
