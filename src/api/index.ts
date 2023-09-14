import data from '../data.json';
import type { Page, TableData } from '../types';

const endpoints = {
    tocList: '/toc',
    tocById: (id: string) => `/toc/${id}`
};

export const fetchDataMock = async (): Promise<TableData> => {
    return new Promise((resolve) => setTimeout(() => resolve(data), 1000));
};

export const fetchData = async (query?: string): Promise<TableData> => {
    const urlParams = query ? `?${(new URLSearchParams({ query }))}` : '';

    const response = await fetch(endpoints.tocList + urlParams);

    return response.json();
};

export const fetchDataById = async (id: string): Promise<Page> => {
    const response = await fetch(endpoints.tocById(id));

    return response.json();
};