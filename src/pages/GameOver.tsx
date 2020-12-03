import React, { useEffect, useState } from "react";
import { History, LocationState } from "history";
import { useScore } from "../contexts/ScoreContext";
import { StyledLink } from "../styled/Navbar";
import { StyledCharacter } from "../styled/Game";
import { StyledTitle } from "../styled/Random";
import { useAuth0 } from "@auth0/auth0-react";

interface GameOverProps {
  history: History<LocationState>;
}

export default function GameOver({ history }: GameOverProps) {
  const { score } = useScore();
  const [scoreMessage, setScoreMessage] = useState("");
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
    if (isAuthenticated) {
      saveHighScore();
    }
  }, [score]);

  return (
    <div>
      <StyledTitle>Game Over</StyledTitle>
      <h2>{scoreMessage}</h2>
      {!isAuthenticated && <h2>Please Log In to Save High Scores</h2>}
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
