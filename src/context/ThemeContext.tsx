import React, { createContext, useContext, useState } from 'react';

interface Theme {
  id: string;
  name: string;
  color: string;
}

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const defaultTheme: Theme = {
  id: 'green',
  name: 'Emerald',
  color: '#22c55e'
};

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: defaultTheme,
  setTheme: () => {}
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    document.documentElement.style.setProperty('--theme-color', theme.color);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);