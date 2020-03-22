/**
 * Custom types for Typescript check
 * Prevent mistakes
 */

export type Memory = {
    id: number;
    title: string;
    description: string;
    position: {
        coordinates: number[];
    };
    createdAt: string;
    updateAt: string;
    userId: number;
    categoryId: number;
};

export type Memories = {
    count: number;
    rows: Memory[];
};
