import type { Breadcrumb } from '../../components/Breadcrumbs/types';
import { getPagesPath } from '../getPagesPath';

const entities = {
    pages: {
        page1: {
            id: 'page1',
            title: 'Page 1',
            level: 0,
            parentId: '0'
        },
        page2: {
            id: 'page2',
            title: 'Page 2',
            level: 1,
            parentId: 'page1'
        }
    }
};

describe('getPagesPath', () => {
    it('should return an empty array if the page is undefined', () => {
        const result = getPagesPath(entities);
        expect(result).toEqual([]);
    });

    it('should return a single breadcrumb for a level 0 page', () => {
        const page = entities.pages.page1;
        const { id, title } = page;

        const expectedResult: Breadcrumb[] = [
            { id, title }
        ];

        const result = getPagesPath(entities, page);
        expect(result).toEqual(expectedResult);
    });

    it('should return the full breadcrumb path for a nested page', () => {
        jest.mock('../getPageById', () => ({
            getPageById: jest.fn(() => pages.page1)
        }));

        const { pages } = entities;

        const expectedResult: Breadcrumb[] = [
            { id: pages.page1.id, title: pages.page1.title },
            { id: pages.page2.id, title: pages.page2.title }
        ];

        const result = getPagesPath(entities, pages.page2);
        expect(result).toEqual(expectedResult);
    });
});
