import data from '../data.json';
import type { TableData } from '../types';

const endponints = {
    toc: '/toc'
};

export const fetchDataMock = async (): Promise<TableData> => {
    return new Promise((resolve) => setTimeout(() => resolve(data), 1000));
};

export const fetchData = async (query?: string): Promise<TableData> => {
    const urlParams = query ? `?${(new URLSearchParams({ query }))}` : '';

    const response = await fetch(endponints.toc + urlParams);

    return response.json();
};