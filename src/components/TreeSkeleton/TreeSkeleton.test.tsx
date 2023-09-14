import { render } from '@testing-library/react';
import { TreeSkeleton } from '.';

describe('TreeSkeleton component', () => {
    it('matches snapshot without count prop', () => {
        const { asFragment } = render(<TreeSkeleton />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot with count prop', () => {
        const { asFragment } = render(<TreeSkeleton count={5} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
