export type Breadcrumb = {
    id: string;
    title: string;
}

export interface BreadcrumbsProps {
    items?: Breadcrumb[];
}

export const breadcrumbsRootTestId = 'breadcrumbs-container';