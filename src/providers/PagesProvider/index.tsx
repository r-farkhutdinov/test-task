import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { fetchData } from '../../api';
import type { TableData } from '../../types';
import type { PagesContextValue, Props } from './types';

export const PagesContext = createContext<PagesContextValue>({});

const errorMessage = 'Error fetching data. It is likely that the server is not running. Please start the server from its directory.';

/**
 * Context provider with the core logic of TOC: managing state, fetching data
 */
export const PagesProvider = ({ children }: Props) => {
    const [activePage, setActivePage] = useState<string>();
    const [data, setData] = useState<TableData>();
    const [query, setQuery] = useState('');
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);

    const load = async (q?: string) => {
        setActivePage(undefined);
        try {
            setLoading(true);
            const result = await fetchData(q);
            setData(result);
        } catch {
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // this effect will fire twice in strict mode https://react.dev/reference/react/useEffect 
    useEffect(() => {
        load();
    }, []);

    const changeActivePage = useCallback((page: string) => {
        if (activePage !== page) {
            setActivePage(page);
        }
    }, [activePage]);

    const value = useMemo(() => ({
        activePage,
        data,
        query,
        loading,
        error,
        load,
        setQuery,
        changeActivePage
    }), [activePage, changeActivePage, data, error, loading, query]);

    return (
        <PagesContext.Provider value={value}>{children}</PagesContext.Provider>
    );
};