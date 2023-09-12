import { FC } from 'react';
import { Skeleton } from '../Skeleton';
import type { TreeSkeletonProps } from './types';

/**
 * Specific skeleton for the nav tree
 */
export const TreeSkeleton: FC<TreeSkeletonProps> = ({ count }) => {
    const renderSkeletons = () => {
        const skeletons = [];

        if (count) {
            for (let i = 0; i < count; i++) {
                skeletons.push(<Skeleton key={i} level={i % 3} isPaddingRight={Boolean(i % 2)} />);
            }
        }

        return skeletons;
    };

    // default skeleton according to PDF
    if (!count) {
        return (
            <>
                <Skeleton />
                <Skeleton level={1} isPaddingRight />
                <Skeleton level={1} />
                <Skeleton level={1} isPaddingRight />
                <Skeleton level={2} />
                <Skeleton level={2} isPaddingRight />
                <Skeleton level={2} />
                <Skeleton level={2} isPaddingRight />
                <Skeleton />
                <Skeleton />
            </>
        );
    }

    return (
        <>
            {renderSkeletons()}
        </>
    );
};