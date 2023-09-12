export type Page = {
    id: string;
    title: string;
    level: number;
    parentId: string;
    url?: string;
    pages?: string[];
};

export type Entity = {
    pages: Record<string, Page>;
};

export type TableData = {
    entities: Entity;
    topLevelIds: string[]
};