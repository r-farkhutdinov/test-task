import { useContext } from 'react';
import { PagesContext } from '../../providers/PagesProvider';
import { Tree } from '../Tree';
import { TreeSkeleton } from '../TreeSkeleton';
import styles from './styles.module.css';

export const noDataText = 'No data, please reset the filter';

/**
 * Core component to be exported, has all the TOC logic
 */
export const Sidebar = () => {
    const { data, loading, error } = useContext(PagesContext);

    let content;

    if (loading) {
        content = <TreeSkeleton count={20} />;
    } else if (error) {
        content = <p className={styles.error}>{error}</p>;
    } else if (data?.topLevelIds.length === 0) {
        content = <p className={styles.error}>{noDataText}</p>;
    } else {
        content = <Tree pages={data?.topLevelIds} />;
    }

    return (
        <aside className={styles.root}>
            {content}
        </aside>
    );
};