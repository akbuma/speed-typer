import React, { useState, useEffect } from "react";
import { ScoresList, ScoreLI } from "../styled/HighScores";

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
      <h1>HighScores</h1>
      <ScoresList>
        {highScores.map((score: ScoreObject, idx) => (
          <ScoreLI key={idx}>
            {score.fields.name} - {score.fields.Score}
          </ScoreLI>
        ))}
      </ScoresList>
    </div>
  );
}
