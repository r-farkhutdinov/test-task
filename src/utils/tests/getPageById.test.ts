import { getPageById } from '../getPageById';

const entities = {
    pages: {
        page1: {
            id: 'page1',
            title: 'Page 1',
            level: 0,
            parentId: '0'
        },
    }
};

describe('getPageById', () => {
    it('should return undefined if id is undefined', () => {
        const result = getPageById(entities);
        expect(result).toEqual(undefined);
    });

    it('should return the actual page if id is present', () => {
        const page = entities.pages.page1;
        const result = getPageById(entities, page.id);
        expect(result).toEqual(page);
    });
});
