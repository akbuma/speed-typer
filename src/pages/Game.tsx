import React, { useState, useEffect, useCallback } from "react";
import { History, LocationState } from "history";

import {
  StyledGame,
  StyledScore,
  StyledTimer,
  StyledCharacterGame,
  StyledDisplay,
} from "../styled/Game";
import { Strong } from "../styled/Random";
import { useScore } from "../contexts/ScoreContext";

interface GameProps {
  history: History<LocationState>;
}

export default function Game({ history }: GameProps) {
  const { score, setScore } = useScore();

  const MAX_SECONDS = 20;
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

  const [currentCharacter, setCurrentCharacter] = useState("");
  const [ms, setMs] = useState("0");
  const [seconds, setSeconds] = useState(MAX_SECONDS.toString());

  useEffect(() => {
    setRandomCharacter();
    setScore(0);
    const currentTime = new Date();
    const interval = setInterval(() => updateTime(currentTime), 1);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (parseInt(seconds) <= -1) {
      history.push("/gameOver");
    }
  }, [seconds, ms, history]);

  // updates whenever currentCharacter is updated, otherwise currentCharacter will always equal the initial state in the function
  const keyUpHandler = useCallback(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    (e: KeyboardEvent) => {
      if (e.key === currentCharacter) {
        setScore(score + 1);
      } else {
        if (score > 0) {
          setScore(score - 1);
        }
      }
      setRandomCharacter();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCharacter]
  );

  const setRandomCharacter = () => {
    const randomInt: number = Math.floor(Math.random() * 36);
    setCurrentCharacter(characters[randomInt]);
  };

  useEffect(() => {
    document.addEventListener("keyup", keyUpHandler);
    // remove the event listener when the component re-renders
    return () => {
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, [keyUpHandler]);

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
    setSeconds(updatedSeconds.toString().padStart(2, "0"));
    setMs(updatedMs.toString().padStart(2, "0"));
  };

  return (
    <StyledGame>
      <StyledScore>
        Score: <Strong>{score}</Strong>
      </StyledScore>
      <StyledCharacterGame>
        {currentCharacter.toUpperCase()}
      </StyledCharacterGame>
      <StyledTimer>
        Time:{" "}
        <Strong>
          {seconds}:{ms}
        </Strong>
      </StyledTimer>
    </StyledGame>
  );
}
