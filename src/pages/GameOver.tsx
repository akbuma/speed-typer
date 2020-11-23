import React from "react";
import { History, LocationState } from "history";
import { useScore } from "../contexts/ScoreContext";
import { StyledLink } from "../styled/Navbar";

interface GameOverProps {
  history: History<LocationState>;
}

export default function GameOver({ history }: GameOverProps) {
  const { score } = useScore();

  if (score === -1) {
    history.push("/");
  }

  return (
    <div>
      <h1>Game Over</h1>
      <p>{score}</p>
      <StyledLink to='/'>Go Home</StyledLink>
      <StyledLink to='/game'>Play Again</StyledLink>
    </div>
  );
}
