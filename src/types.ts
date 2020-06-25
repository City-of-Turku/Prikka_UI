/**
 * Custom types for Typescript check
 * Prevent mistakes
 */

export type Background = {
    id: number;
    title: string;
    credit: string;
};

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
    activeReports: number;
    Reports: {
        id: number;
    },
    User:{
        displayName: string,
        userName: string,
    }
};

export type Memories = {
    count: number;
    rows: Memory[];
};

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

export type Campaign = {
    id: number;
    titleFI: string;
    descriptionFI: string;
    titleSV: string;
    descriptionSV: string;
    titleEN: string;
    descriptionEN: string;
    createdAt: string;
    displayName: string;
    categoryId: number;
    isPublic: boolean;
};

export type Campaigns = {
    count: number;
    rows: Campaign[];
};

export type Category = {
    id: number;
    name: string;
    description: string;
    createdAt: string;
};

export type Categories = Category[];

export type User = {
    id: number;
    userName: string;
    displayName: string;
    email: string;
    yearOfBirth: string;
    admin: boolean;
    createdAt: string;
    updateAt: string;
};

export type Users = {
    count: number;
    rows: User[];
};
