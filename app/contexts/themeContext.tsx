import { useState, useEffect, createContext } from "react";

const useThemeStorage = (
  key: string = "color-theme",
  initialValue: string = "dark"
) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined"){
      return initialValue;
    }

    const persistedValue = localStorage.getItem(key);
    const userMedia = window.matchMedia("(prefers-color-scheme: light)").matches;

    return persistedValue !== null
      ? persistedValue
      : userMedia
      ? "light"
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
