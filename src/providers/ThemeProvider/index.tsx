import { createContext, useCallback, useMemo, useState } from 'react';
import { storage } from '../../utils/storage';
import { type ThemeContextValue, type Props, Theme } from './types';

export const themeStorageKey = 'theme';

/**
 * Context provider with theme logic
 */
export const ThemeContext = createContext<ThemeContextValue>({
    theme: Theme.Light,
});

export const ThemeProvider = ({ children }: Props) => {
    const storedTheme = storage.get(themeStorageKey) as Theme;

    const [theme, setTheme] = useState(storedTheme ?? Theme.Light);

    const toggleTheme = useCallback(() => {
        const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;
        setTheme(newTheme);
        storage.set(themeStorageKey, newTheme);
    }, [theme]);

    const value = useMemo(() => ({
        theme,
        toggleTheme
    }), [theme, toggleTheme]);

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};