import { useEffect, useState } from "react";

const useTheme = (): [string, () => void] => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // store the default theme into local storage
    const localStorageTheme = window.localStorage.getItem("theme");
    setTheme(localStorageTheme || "light");
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      window.localStorage.setItem("theme", "light");
    }
  };

  return [theme, toggleTheme];
};

export default useTheme;
