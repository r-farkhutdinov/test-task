import { render, screen } from '@testing-library/react';
import { type Breadcrumb, breadcrumbsRootTestId } from './types';
import { Breadcrumbs } from '.';

const items: Breadcrumb[] = [
    {
        id: '1',
        title: 'Item 1'
    },
    {
        id: '2',
        title: 'Item 2'
    },
    {
        id: '3',
        title: 'Item 3'
    },
];

describe('Breadcrumbs component', () => {
    it('matches the snapshot with items', () => {
        const { asFragment } = render(<Breadcrumbs items={items} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches the snapshot without items', () => {
        const { asFragment } = render(<Breadcrumbs />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render breadcrumb items correctly', () => {
        render(<Breadcrumbs items={items.slice(0, 2)} />);

        expect(screen.getByTestId(`${breadcrumbsRootTestId}/item-1`)).toHaveTextContent(items[0].title);
        expect(screen.getByTestId(`${breadcrumbsRootTestId}/item-2`)).toHaveTextContent(items[1].title);
        expect(screen.getByTestId(breadcrumbsRootTestId)).toContainElement(screen.getByTestId(`${breadcrumbsRootTestId}/separator`));
    });

    it('should make the last breadcrumb active', () => {
        render(<Breadcrumbs items={items.slice(0, 2)} />);

        expect(screen.getByTestId(`${breadcrumbsRootTestId}/item-2`).classList.contains('active')).toBe(true);
    });

    it('should render empty message when no items present', () => {
        render(<Breadcrumbs />);
        expect(screen.getByTestId(`${breadcrumbsRootTestId}/empty`)).toHaveTextContent('Select two levels or more to see the breadcrumbs');
    });
});
