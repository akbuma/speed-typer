import React, { useEffect, useState } from "react";
import { History, LocationState } from "history";
import { useScore } from "../contexts/ScoreContext";
import { StyledLink } from "../styled/Navbar";
import { StyledCharacter } from "../styled/Game";
import { StyledTitle } from "../styled/Random";

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
        console.log(data);
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
      <StyledTitle>Game Over</StyledTitle>
      <h2>{scoreMessage}</h2>
      <StyledCharacter>{score}</StyledCharacter>
      <div>
        <StyledLink to="/">Go Home</StyledLink>
      </div>
      <div>
        <StyledLink to="/game">Play Again</StyledLink>
      </div>
    </div>
  );
}
