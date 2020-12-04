import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./pages/Game";
import GameOver from "./pages/GameOver";
import HighScores from "./pages/HighScores";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

import { Container } from "./styled/Container";
import { Main } from "./styled/Main";
import Global from "./styled/Global";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <React.Fragment>
        <Global />
        <Main>
          <p>Loading...</p>
        </Main>
      </React.Fragment>
    );
  }

  return (
    <Router>
      <Global />
      <Main>
        <Container>
          <Navbar />
          <Switch>
            <Route path="/game" component={Game} />
            <Route path="/highScores" component={HighScores} />
            <Route path="/gameOver" component={GameOver} />
            <Route path="/" component={Home} />
          </Switch>
        </Container>
        `
      </Main>
    </Router>
  );
}

export default App;
