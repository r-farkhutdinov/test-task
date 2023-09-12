
import { render, screen } from '@testing-library/react';
import { Breadcrumb } from './types';
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

test('renders empty breadcrumbs', () => {
    render(<Breadcrumbs />);
    const placeholder = screen.getByText(/Select two levels or more to see the breadcrumbs/i);
    expect(placeholder).toBeInTheDocument();
});

test('renders breadcrumbs with 2 levels', () => {
    render(<Breadcrumbs items={items} />);
    const placeholder = screen.getByText(/Item 1/i);
    expect(placeholder).toBeInTheDocument();
});
