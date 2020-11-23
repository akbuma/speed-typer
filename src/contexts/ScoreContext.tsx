import React, { useContext, useState } from "react";

interface ScoreProps {
  children: React.ReactNode;
}

type ScoreContextType = {
  score: number;
  setScore: (score: number) => void;
};

// default values returned to consumers when no theme provider
const ScoreContext = React.createContext<ScoreContextType>({
  score: -1,
  setScore: (score) => console.warn("no score provider"),
});

const useScore = () => useContext(ScoreContext);

const ScoreProvider = ({ children }: ScoreProps) => {
  const [score, setScore] = useState(-1);

  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

export { ScoreProvider, useScore };
