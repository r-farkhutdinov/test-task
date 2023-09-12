import { ReactNode } from 'react';

export enum Theme {
    Dark = 'dark',
    Light = 'light'
}

export type ThemeContextValue = {
    theme: Theme;
    toggleTheme?: VoidFunction;
};

export type Props = {
    children: ReactNode;
}