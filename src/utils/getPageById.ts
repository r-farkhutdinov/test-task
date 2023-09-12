import type { Entity } from '../types';

export const getPageById = (entity?: Entity, page?: string) => {
    if (!entity) {
        return undefined;
    }

    return Object.values(entity.pages).find(p => p.id === page);
};