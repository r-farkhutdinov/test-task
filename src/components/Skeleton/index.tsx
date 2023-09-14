import { FC } from 'react';
import type { SkeletonProps } from './types';
import { defaultLeftPadding, defaultRightPadding, skeletonRootTestId } from './constants';
import styles from './styles.module.css';

/**
 * Skeleton block
 */
export const Skeleton: FC<SkeletonProps> = ({ level = 0, isPaddingRight, width }) => (
    <div
        data-testid={skeletonRootTestId}
        style={{
            marginLeft: level * defaultLeftPadding,
            marginRight: isPaddingRight ? defaultRightPadding : 0,
            width
        }}
        className={styles.root}
    />
);