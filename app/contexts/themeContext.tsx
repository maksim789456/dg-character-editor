import { useState, useEffect, createContext } from "react";

const useThemeStorage = (
  key: string = "color-theme",
  initialValue: string = "light"
) => {
  const [theme, setTheme] = useState(() => {
    const persistedValue = localStorage.getItem(key);
    const userMedia = window.matchMedia("(prefers-color-scheme: dark)").matches;

    return persistedValue !== null
      ? persistedValue
      : userMedia
      ? "dark"
      : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, theme);
  }, [key, theme]);

  return [theme, setTheme];
};

export const ThemeContext = createContext(undefined as any);

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useThemeStorage();

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme as string);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
