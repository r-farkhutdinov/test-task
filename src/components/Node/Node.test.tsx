import { render, screen, fireEvent } from '@testing-library/react';
import { PagesContext } from '../../providers/PagesProvider';
import type { Page } from '../../types';
import { nodeRootTestId } from './constants';
import { Node } from '.';

const mockChangeActivePage = jest.fn();

const defaultProps = {
    id: '1',
    title: 'Node',
    parentId: '2',
    pages: [],
    level: 0,
};

const renderNode = (props: Page = defaultProps) => render(
    <PagesContext.Provider value={{ changeActivePage: mockChangeActivePage }}>
        <Node {...props} />
    </PagesContext.Provider>
);

describe('Node component', () => {
    it('matches snapshot – unexpandable', () => {
        const { asFragment } = renderNode();
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot – expandable', () => {
        const props = {
            ...defaultProps,
            pages: ['Page']
        };
        const { asFragment } = renderNode(props);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should display title correctly', () => {
        renderNode();
        const nodeDiv = screen.getByTestId(nodeRootTestId);
        expect(nodeDiv).toHaveTextContent('Node');
    });

    it('should expand and collapse on click if expandable', () => {
        const props = {
            ...defaultProps,
            pages: ['Page']
        };
        renderNode(props);
        const nodeDiv = screen.getByTestId(nodeRootTestId);
        fireEvent.click(nodeDiv);
        expect(mockChangeActivePage).toBeCalledWith('1');
    });

    it('should not expand or collapse on click if not expandable', () => {
        renderNode();
        const nodeDiv = screen.getByTestId(nodeRootTestId);
        fireEvent.click(nodeDiv);
        expect(mockChangeActivePage).not.toBeCalled();
    });
});