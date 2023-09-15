import { FC, Fragment, memo } from 'react';
import classNames from 'classnames/bind';
import { breadcrumbsRootTestId, type BreadcrumbsProps } from './types';
import styles from './styles.module.css';

const cx = classNames.bind(styles);

/**
 * Breadcrumbs to display the current path in navigation
 */
export const Breadcrumbs: FC<BreadcrumbsProps> = memo(({ items }) => (
    <div className={styles.root} data-testid={breadcrumbsRootTestId}>
        {items && items?.length > 1 ? (
            items.map(({ title, id }, index) => (
                <Fragment key={id}>
                    <p
                        className={cx({ [styles.active]: index === items.length - 1 })}
                        data-testid={`${breadcrumbsRootTestId}/item-${id}`}
                    >
                        {title}
                    </p>
                    {index < items.length - 1 && <p data-testid={`${breadcrumbsRootTestId}/separator`}>/</p>}
                </Fragment>
            ))
        ) : (
            <p data-testid={`${breadcrumbsRootTestId}/empty`}>Select two levels or more to see the breadcrumbs</p>
        )}
    </div>
));
