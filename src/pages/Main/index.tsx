
import { ChangeEvent, useCallback, useContext, useMemo, useState } from 'react';
import { ThemeContext } from '../../providers/ThemeProvider';
import { PagesContext } from '../../providers/PagesProvider';
import { getPagesPath } from '../../utils/getPagesPath';
import { getPageById } from '../../utils/getPageById';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Content } from '../../components/Content';
import { Sidebar } from '../../components/Sidebar';
import { ReactComponent as HomeIcon } from '../../assets/home.svg';
import styles from './styles.module.css';

/**
 * Page to show the example of how sidebar works
 */
export const Main = () => {
    const [query, setQuery] = useState('');
    // Pages context here is only used to display breadcrumbs, 
    // sidebar component itself accesses context so it can be used outside this page
    const { data, activePage, load } = useContext(PagesContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const breadcrumbItems = useMemo(
        () => getPagesPath(data?.entities, getPageById(data?.entities, activePage)
        ), [activePage, data?.entities]);

    const onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery?.(e.target.value ?? '');
    };

    const onFilterApply = () => {
        load?.(query);
    };

    const onFilterClear = () => {
        setQuery?.('');
        load?.();
    };

    return (
        <div data-theme={theme} className={styles.root}>
            <header>
                <div className={styles.headerLeft}>
                    <HomeIcon />
                    <p>Table of contents – Theme {theme}</p>
                    <input className={styles.filter} placeholder='Filter here' value={query} onChange={onFilterChange} />
                    <button className={styles.button} onClick={onFilterApply}>Apply</button>
                    <button className={styles.button} onClick={onFilterClear}>Reset</button>
                </div>
                <button className={styles.button} onClick={toggleTheme}>Switch theme</button>
            </header>
            <Sidebar />
            <main>
                <h1>Solution description</h1>
                <Breadcrumbs items={breadcrumbItems} />
                <Content />
            </main>
            <footer>Ruslan Farkhutdinov</footer>
        </div>
    );
};
