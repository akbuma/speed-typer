import React, { useState, useEffect } from "react";
import { History, LocationState } from "history";

import {
  StyledGame,
  StyledScore,
  StyledTimer,
  StyledCharacter,
} from "../styled/Game";
import { Strong } from "../styled/Random";

interface GameProps {
  history: History<LocationState>;
}

export default function Game({ history }: GameProps) {
  const MAX_SECONDS = 5;
  const [score, setScore] = useState(0);
  const [ms, setMs] = useState("0");
  const [seconds, setSeconds] = useState(MAX_SECONDS.toString());

  useEffect(() => {
    const currentTime = new Date();
    const interval = setInterval(() => updateTime(currentTime), 1);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (parseInt(seconds) <= -1) {
      history.push("/gameOver");
    }
  }, [seconds, ms, history]);

  const updateTime = (startTime: Date) => {
    const endTime = new Date();
    const msPassedStr: number = endTime.getTime() - startTime.getTime();
    const formattedMSString = ("0000" + msPassedStr).slice(-5);
    const updatedSeconds =
      MAX_SECONDS - parseInt(formattedMSString.substring(0, 2)) - 1;
    const updatedMs = (
      1000 - parseInt(formattedMSString.substring(formattedMSString.length - 3))
    )
      .toString()
      .slice(0, 2);

    console.log(updatedMs);
    setSeconds(updatedSeconds.toString().padStart(2, "0"));
    setMs(updatedMs.toString().padStart(2, "0"));
  };

  return (
    <StyledGame>
      <StyledScore>
        Score: <Strong>{score}</Strong>
      </StyledScore>
      <StyledCharacter>A</StyledCharacter>
      <StyledTimer>
        Time:{" "}
        <Strong>
          {seconds}:{ms}
        </Strong>
      </StyledTimer>
    </StyledGame>
  );
}
