import { FC } from 'react';
import type { SkeletonProps } from './types';
import styles from './styles.module.css';

const defaultLeftPadding = 16;
const defaultRightPadding = 32;

/**
 * Skeleton block
 */
export const Skeleton: FC<SkeletonProps> = ({ level = 0, isPaddingRight, width }) => (
    <div
        style={{
            marginLeft: level * defaultLeftPadding,
            marginRight: isPaddingRight ? defaultRightPadding : 0,
            width
        }}
        className={styles.root}
    />
);