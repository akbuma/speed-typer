import React, { useEffect, useState } from "react";
import { History, LocationState } from "history";
import { useScore } from "../contexts/ScoreContext";
import { StyledLink } from "../styled/Navbar";
import {
  StyledCharacterGameOver,
  StyledDisplay,
  StyledOptions,
} from "../styled/Game";
import { StyledTitle, GameMessage } from "../styled/Random";
import { useAuth0 } from "@auth0/auth0-react";

interface GameOverProps {
  history: History<LocationState>;
}

export default function GameOver({ history }: GameOverProps) {
  const { score } = useScore();
  const [scoreMessage, setScoreMessage] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  if (score === -1) {
    history.push("/");
  }

  useEffect(() => {
    const saveHighScore = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: "https://speedtyperapi/",
        });

        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: JSON.stringify({ name: "Buma", Score: score }),
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
    if (isAuthenticated) {
      saveHighScore();
    }
  }, [score]);

  return (
    <StyledDisplay>
      <StyledTitle>Game Over</StyledTitle>
      <h2>{scoreMessage}</h2>
      {!isAuthenticated && (
        <GameMessage>Please Log In to Save High Scores</GameMessage>
      )}
      <StyledCharacterGameOver>{score}</StyledCharacterGameOver>
      <StyledOptions>
        <StyledLink to="/">Go Home</StyledLink>
      </StyledOptions>
      <StyledOptions>
        <StyledLink to="/game">Play Again</StyledLink>
      </StyledOptions>
    </StyledDisplay>
  );
}
