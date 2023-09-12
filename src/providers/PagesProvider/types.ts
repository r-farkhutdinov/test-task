import { ReactNode } from 'react';
import { TableData } from '../../types';

export type PagesContextValue = {
    data?: TableData;
    loading?: boolean;
    activePage?: string;
    error?: string;
    changeActivePage?: (activePage: string) => void;
};

export type Props = {
    children: ReactNode;
}