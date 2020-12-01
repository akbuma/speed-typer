import React, { useState, useEffect } from "react";
import { ScoresList, ScoreLI } from "../styled/HighScores";
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

  useEffect(() => {
    const loadHighScores = async () => {
      try {
        const res = await fetch("/.netlify/functions/getHighScores");
        const scores = await res.json();
        setHighScores(scores);
      } catch (err) {}
    };
    loadHighScores();
  }, []);

  return (
    <div>
      <StyledTitle>HighScores</StyledTitle>
      <ScoresList>
        {highScores.map((score: ScoreObject, idx) => (
          <ScoreLI key={idx}>
            {idx + 1}. {score.fields.name} - {score.fields.Score}
          </ScoreLI>
        ))}
      </ScoresList>
    </div>
  );
}
