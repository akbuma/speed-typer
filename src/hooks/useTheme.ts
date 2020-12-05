import { useEffect, useState } from "react";

export default (): [string, () => void] => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return [theme, toggleTheme];
};
