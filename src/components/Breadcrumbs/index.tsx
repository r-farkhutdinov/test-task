import { FC, Fragment } from 'react';
import classNames from 'classnames/bind';
import type { BreadcrumbsProps } from './types';
import styles from './styles.module.css';

const cx = classNames.bind(styles);

/**
 * Breadcrumbs to display the current path in navigation
 */
export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => (
    <div className={styles.root}>
        {items && items?.length > 1 ? (
            items.map(({ title, id }, index) => (
                <Fragment key={id}>
                    <p className={cx({ [styles.active]: index === items.length - 1 })}>{title}</p>
                    {index < items.length - 1 && <p>/</p>}
                </Fragment>
            ))
        ) : (
            <p>Select two levels or more to see the breadcrumbs</p>
        )}
    </div>
);