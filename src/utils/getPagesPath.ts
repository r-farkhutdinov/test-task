import type { Breadcrumb } from '../components/Breadcrumbs/types';
import type { Entity, Page } from '../types';
import { getPageById } from './getPageById';

/**
 * Gets the whole path from the page to the root in the form of breadcrumbs
 * @param entity list of pages (object)
 * @param page page itself
 * @param pages used to store the result between recursive calls
 * @returns the array of breadcrumbs
 */
export const getPagesPath = (entity?: Entity, page?: Page, pages: Breadcrumb[] = []): Breadcrumb[] => {
  if (!page) return [];

  const { id, title, level, parentId } = page;
  const breadcrumb = { id, title };

  if (level === 0) {
    return [...pages, breadcrumb].reverse();
  }

  const parentPage = getPageById(entity, parentId);

  return getPagesPath(entity, parentPage, [...pages, breadcrumb]);
}; 