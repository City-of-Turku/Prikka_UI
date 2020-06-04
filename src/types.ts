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
    photographer: string;
    whenIsPhotoTaken: string;
    whereIsPhotoTaken: string;
    Reports: {
        id: number;
    }
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

export type MemoryReport = {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    updateAt: string;
    userId: number;
    adminUserId: number;
    invalid: boolean;
};

export type Background = {
    id: number;
    title: string;
    credit: string;
};

export type User = {
    id: number;
    displayName: string;
    email: string;
    admin: boolean;
    createdAt: string;
    updateAt: string;
};

export type Users = {
    count: number;
    rows: User[];
};
