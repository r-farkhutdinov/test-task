import { render, screen } from '@testing-library/react';
import { defaultLeftPadding, defaultRightPadding, skeletonRootTestId } from './constants';
import { Skeleton } from '.';

describe('Skeleton component', () => {
    it('matches snapshot with no props', () => {
        const { asFragment } = render(<Skeleton />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot with level = 2', () => {
        const { asFragment } = render(<Skeleton level={2} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot with isPaddingRight', () => {
        const { asFragment } = render(<Skeleton isPaddingRight />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot with width', () => {
        const { asFragment } = render(<Skeleton width={100} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should apply the correct marginLeft based on level prop', () => {
        const level = 2;
        render(<Skeleton level={level} />);
        expect(screen.getByTestId(skeletonRootTestId)).toHaveStyle(`margin-left: ${level * defaultLeftPadding}px`);
    });

    it('should apply the default marginRight when isPaddingRight=true', () => {
        render(<Skeleton isPaddingRight />);
        expect(screen.getByTestId(skeletonRootTestId)).toHaveStyle(`margin-right: ${defaultRightPadding}px`);
    });

    it('should set the correct width provided', () => {
        const width = 100;
        render(<Skeleton width={width} />);
        expect(screen.getByTestId(skeletonRootTestId)).toHaveStyle(`width: ${width}px`);
    });
});
