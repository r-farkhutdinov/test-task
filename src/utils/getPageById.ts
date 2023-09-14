import type { Entity } from '../types';

/**
 * Gets the page object by its ID
 * @param entity list of pages (object)
 * @param pageId page id
 * @returns the page object
 */
export const getPageById = (entity?: Entity, pageId?: string) => {
    if (!entity) {
        return undefined;
    }

    return Object.values(entity.pages).find(p => p.id === pageId);
};