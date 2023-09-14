import { ReactNode } from 'react';
import { TableData } from '../../types';

export type PagesContextValue = {
    data?: TableData;
    activePage?: string;
    query?: string;
    loading?: boolean;
    error?: string;
    changeActivePage?: (activePage: string) => void;
    setQuery?: (query: string) => void;
    load?: (q?: string) => void;
};

export type Props = {
    children: ReactNode;
}