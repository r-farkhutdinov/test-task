import { render, screen } from '@testing-library/react';
import { PagesContext } from '../../providers/PagesProvider';
import type { PagesContextValue } from '../../providers/PagesProvider/types';
import type { TreeProps } from './types';
import { rootTreeTestId } from './constants';
import { Tree } from '.';

const mockData = {
    topLevelIds: ['Page'],
    entities: {
        pages: {}
    }
};

const defaultContextValue: PagesContextValue = { data: mockData, loading: false };

const renderTreeWithContext = (context: PagesContextValue, props?: TreeProps) => render(
    <PagesContext.Provider value={context}>
        <Tree {...props} />
    </PagesContext.Provider>
);

describe('Tree component', () => {
    it('matches snapshot without pages', () => {
        const { asFragment } = renderTreeWithContext(defaultContextValue);
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot with pages and isActive', () => {
        const { asFragment } = renderTreeWithContext(defaultContextValue, { pages: ['Page 1', 'Page 2'], isActive: true });
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot with pages, isActive, and isActiveLevelTwo', () => {
        const { asFragment } = renderTreeWithContext(defaultContextValue, { pages: ['Page 1', 'Page 2'], isActive: true, isActiveLevelTwo: true });

        expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with pages', () => {
        renderTreeWithContext(defaultContextValue, { pages: ['Page 1', 'Page 2'], isActive: true });

        const tree = screen.getByTestId(rootTreeTestId);
        expect(tree).toBeInTheDocument();
    });
});
