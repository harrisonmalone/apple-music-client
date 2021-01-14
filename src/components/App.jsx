import React from "react";
import { Albums } from "./Albums";
import { Info } from "./Info";
import { Database } from "./Database";
import { Container, Header } from "../styles/App";
import { Switch, Route } from "react-router-dom";

export function App() {
  return (
    <Container>
      <h1>
        <Header href="/">Music</Header>
      </h1>
      <Switch>
        <Route exact path={["/", "/albums"]} component={Albums} />
        <Route exact path="/db" component={Database} />
        <Route exact path="/albums/:id" component={Info} />
      </Switch>
    </Container>
  );
}
