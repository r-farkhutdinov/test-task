import { render, screen } from '@testing-library/react';
import { PagesContext } from '../../providers/PagesProvider';
import type { PagesContextValue } from '../../providers/PagesProvider/types';
import { rootTreeTestId } from '../Tree/constants';
import { Sidebar, noDataText } from '.';

const mockData = {
    topLevelIds: ['Page'],
    entities: {
        pages: {}
    }
};

const defaultContextValue: PagesContextValue = { data: mockData, loading: false };

const renderSidebarWithContext = (context: PagesContextValue) => render(
    <PagesContext.Provider value={context}>
        <Sidebar />
    </PagesContext.Provider>
);

describe('Sidebar component', () => {
    it('matches snapshot when loading', () => {
        const { asFragment } = renderSidebarWithContext({ ...defaultContextValue, loading: true });
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot when data is present', () => {
        const { asFragment } = renderSidebarWithContext(defaultContextValue);
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot with no data message when data is empty', () => {
        const { asFragment } = renderSidebarWithContext({ data: { ...mockData, topLevelIds: [] } });
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot when error', () => {
        const { asFragment } = renderSidebarWithContext({ ...defaultContextValue, error: 'Error' });
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render tree when data is present', () => {
        renderSidebarWithContext(defaultContextValue);
        expect(screen.getByTestId(rootTreeTestId)).toBeInTheDocument();
    });

    it('should render no data message when data is empty', () => {
        renderSidebarWithContext({ data: { ...mockData, topLevelIds: [] } });
        expect(screen.getByText(noDataText)).toBeInTheDocument();
    });

    it('should render error message on error', () => {
        renderSidebarWithContext({ ...defaultContextValue, error: 'Error' });
        expect(screen.getByText('Error')).toBeInTheDocument();
    });
});
