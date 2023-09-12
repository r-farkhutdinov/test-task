import { FC, memo } from 'react';
import classNames from 'classnames/bind';
import { getPageById } from '../../utils/getPageById';
import type { Page } from '../../types';
import data from '../../data.json';
import { Node } from '../Node';
import styles from './styles.module.css';

const cx = classNames.bind(styles);

export interface TreeProps {
    pages?: string[];
    isActive?: boolean;
    isActiveLevelTwo?: boolean;
}

/**
 * Core tree components
 */
export const Tree: FC<TreeProps> = memo(({ pages, isActive, isActiveLevelTwo }) => {
    const { entities } = data;

    const treeClassNames = cx(
        styles.root, {
        [styles.active]: isActive,
        [styles.activeLevelTwo]: isActiveLevelTwo,
    });

    return (
        <div className={treeClassNames}>
            {pages?.map(page => (
                <Node key={page} {...getPageById(entities, page) as Page} />
            ))}
        </div>
    );
});