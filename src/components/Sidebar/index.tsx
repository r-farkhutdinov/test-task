import { useContext } from 'react';
import { PagesContext } from '../../providers/PagesProvider';
import { Tree } from '../Tree';
import { TreeSkeleton } from '../TreeSkeleton';
import styles from './styles.module.css';

/**
 * Core component to be exported, has all the TOC logic
 */
export const Sidebar = () => {
    const { data, loading, error } = useContext(PagesContext);

    return (
        <aside className={styles.root}>
            {loading && <TreeSkeleton count={20} />}
            {data && <Tree pages={data?.topLevelIds} />}
            {error && <p className={styles.error}>{error}</p>}
        </aside>
    );
};