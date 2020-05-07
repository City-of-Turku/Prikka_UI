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
    photo: any;
};

export type Memories = {
    count: number;
    rows: Memory[];
};

export type Category = {
    id: number;
    name: string;
    description: string;
    createdAt: string;
};

export type Categories = Category[];

export type Background = {
    id: number;
    title: string;
    credit: string;
};
