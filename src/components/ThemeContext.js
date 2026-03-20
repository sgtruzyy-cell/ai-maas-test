import React, { createContext, useContext, useState, useCallback } from 'react';
import { getVariableByName } from '../figma-variables-resolver';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const mode = isDark ? 'Dark' : 'Light';

  const getVar = useCallback((name) => {
    return getVariableByName(name, { '_Primitives': mode });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, isDark, setIsDark, getVar }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}