import { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import { PagesContext } from '../../providers/PagesProvider';
import { getPageById } from '../../utils/getPageById';
import { Node } from '../Node';
import { rootTreeTestId } from './constants';
import type { TreeProps } from './types';
import styles from './styles.module.css';

const cx = classNames.bind(styles);

/**
 * Core tree components
 */
export const Tree: FC<TreeProps> = ({ pages, isActive, isActiveLevelTwo }) => {
    const { data } = useContext(PagesContext);

    const treeClassNames = cx(
        styles.root,
        {
            [styles.active]: isActive,
            [styles.activeLevelTwo]: isActiveLevelTwo,
        }
    );

    return (
        <div className={treeClassNames} data-testid={rootTreeTestId}>
            {pages?.map((page) => {
                const pageData = getPageById(data?.entities, page);
                return pageData ? <Node key={page} {...pageData} /> : null;
            })}
        </div>
    );
};
