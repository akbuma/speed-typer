import React, { useState, useEffect } from "react";
import { ScoresList, ScoreLI } from "../styled/HighScores";
import { StyledDisplay } from "../styled/Game";
import { StyledTitle } from "../styled/Random";

interface ScoreObject {
  fields: {
    Score: number;
    name: string;
  };
  id: string;
}

export default function HighScores() {
  const [highScores, setHighScores] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadHighScores = async () => {
      try {
        const res = await fetch("/.netlify/functions/getHighScores");
        const scores = await res.json();
        setHighScores(scores);
        setLoaded(true);
      } catch (err) {}
    };
    loadHighScores();
  }, []);

  return (
    <StyledDisplay>
      {isLoaded ? (
        <StyledTitle>High Scores</StyledTitle>
      ) : (
        <StyledTitle>Loading...</StyledTitle>
      )}

      <ScoresList>
        {highScores.map((score: ScoreObject, idx) => (
          <ScoreLI key={idx}>
            {idx + 1}. {score.fields.name} - {score.fields.Score}
          </ScoreLI>
        ))}
      </ScoresList>
    </StyledDisplay>
  );
}
