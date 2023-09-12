import type { Breadcrumb } from '../components/Breadcrumbs/types';
import type { Entity, Page } from '../types';
import { getPageById } from './getPageById';

export const getPagesPath = (entity?: Entity, page?: Page, pages?: Breadcrumb[]): Breadcrumb[] => {
    if (!page) {
        return [];
    }

    const breadcrumb = {
        id: page.id,
        title: page.title
    };

    if (page?.level === 0) {
        return [...(pages ?? []), breadcrumb].reverse();
    }

    const parentPage = getPageById(entity, page.parentId);

    return getPagesPath(entity, parentPage, [...(pages ?? []), breadcrumb]);
}; 