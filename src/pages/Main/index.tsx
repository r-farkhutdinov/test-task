
import { useContext } from 'react';
import { ThemeContext } from '../../providers/ThemeProvider';
import { PagesContext } from '../../providers/PagesProvider';
import { getPagesPath } from '../../utils/getBreadcrumbsPath';
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
    // Pages context here is only used to display breadcrumbs, 
    // sidebar component itself uses accesses context so it can be used outside this page
    const { data, activePage } = useContext(PagesContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div data-theme={theme} className={styles.root}>
            <header>
                <div className={styles.headerLeft}>
                    <HomeIcon />
                    <p>Table of contents – Theme {theme}</p>
                </div>
                <button className={styles.switch} onClick={toggleTheme}>Switch theme</button>
            </header>
            <Sidebar />
            <main>
                <h1>Solution description</h1>
                <Breadcrumbs items={getPagesPath(data?.entities, getPageById(data?.entities, activePage))} />
                <Content />
            </main>
            <footer>Ruslan Farkhutdinov</footer>
        </div>
    );
};
