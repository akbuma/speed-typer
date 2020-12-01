import React, { useEffect, useState } from "react";
import { History, LocationState } from "history";
import { useScore } from "../contexts/ScoreContext";
import { StyledLink } from "../styled/Navbar";
import { StyledCharacter } from "../styled/Game";

interface GameOverProps {
  history: History<LocationState>;
}

export default function GameOver({ history }: GameOverProps) {
  const { score } = useScore();
  const [scoreMessage, setScoreMessage] = useState("");

  if (score === -1) {
    history.push("/");
  }

  useEffect(() => {
    const saveHighScore = async () => {
      try {
        const options = {
          method: "POST",
          body: JSON.stringify({ name: "James", Score: score }),
        };
        const res = await fetch("/.netlify/functions/saveHighScores", options);
        const data = await res.json();
        if (data.id) {
          setScoreMessage("High Score Set!");
        } else {
          setScoreMessage("Keep Trying!");
        }
      } catch (err) {
        console.log(err);
      }
    };
    saveHighScore();
  }, []);

  return (
    <div>
      <h1>Game Over</h1>
      <StyledCharacter>{score}</StyledCharacter>
      <p>{scoreMessage}</p>
      <StyledLink to="/">Go Home</StyledLink>
      <StyledLink to="/game">Play Again</StyledLink>
    </div>
  );
}
