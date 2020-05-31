/**
 * Create an axios object named 'apis'
 * It allows us to centralize all APIs in one variable for easier calls
 *
 * Naming convention : https://restfulapi.net/resource-naming/
 */
import axios, { AxiosResponse } from 'axios';
import https from 'https';
import { ApiError } from 'next/dist/next-server/server/api-utils';

const agent = new https.Agent({
    rejectUnauthorized: false,
});

const api = axios.create({
    baseURL: `${process.env.FRONT_URL}/api`,
    httpsAgent: agent,
});

export const setCookies = (cookie) => {
    api.defaults.headers.common.Cookie = cookie;
};

//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

/* --- MEMORIES MANAGEMENT ---
 *  api : /memory-management
 */

const basePathMemories = '/memory-management';

/**
 * POST : add one memory to database
 * @param {*} payload
 */
const createMemory = (payload: any): Promise<AxiosResponse> => {
    return api.post(`${basePathMemories}/memories`, payload, { headers: { 'Content-Type': 'multipart/form-data' }});
};

/**
 * GET : retrieve one memory from database
 */
const getMemoryById = (id: any) =>
    api.get(`${basePathMemories}/memories/${id}`);

/**
 * PUT : update one memory in database
 */
const updateMemoryById = (id: any, payload: any) =>
    api.put(`${basePathMemories}/memories/${id}`, payload);

/**
 * DELETE : remove one memory from database
 */
const deleteMemoryById = (id: any) =>
    api.delete(`${basePathMemories}/memories/${id}`);

/**
 * GET : get all memories from database
 */
const getAllMemories = () => api.get(`${basePathMemories}/memories`);

/**
 * GET : get all memories from a specific category
 */
const getMemoriesByCategory = (categoryId: any) =>
    api.get(`${basePathMemories}/memories`, {
        params: { categoryId: categoryId },
    });

/**
 * GET : get all memories from one user
 */
const getUserMemories = () => api.get(`${basePathMemories}/mymemories`);

/**
 * POST : create a report for a memory
 * @param {*} payload
 */
const createMemoryReport = (payload: any) =>
    api.post(`${basePathMemories}/reports`, payload);

/**
 * GET : get all reported memories
 */
const getAllReportedMemories = () => api.get(`${basePathMemories}/reportedMemories`);

/**
 * GET : get all reports associated to one memory
 */
const getMemoryReportsById = (id: any) =>
    api.get(`${basePathMemories}/reports/${id}`);

/**
 *  PUT : update memory report
 */
const adminUpdateMemoryReportsById = (id: any, payload: any) =>
    api.put(`/admin/${basePathAuth}/reports/${id}`, payload)


/* --- AUTH MANAGEMENT ---
 *  api : /auth-management
 */

const basePathAuth = '/auth-management';

/**
 * POST : check login for a local user
 */
const localLogin = (payload: any) => api.post(`${basePathAuth}/login`, payload);

/**
 * POST : register a new local user
 */
const localRegister = (payload: any) =>
    api.post(`${basePathAuth}/register`, payload);

/**
 * POST : reset password for a user
 */
const localResetPassword = (payload: any) =>
    api.post(`${basePathAuth}/resetPassword`, payload);

/**
 * POST : check login for Google User
 */
const googleLogin = (payload: any) =>
    api.post(`${basePathAuth}/google`, payload);

/**
 * POST : callback after google login
 */
const googleRedirect = (payload: any) =>
    api.post(`${basePathAuth}/google/callback`, payload);

/**
 * POST : check login for Google User
 */
const facebookLogin = (payload: any) =>
    api.post(`${basePathAuth}/facebook`, payload);

/**
 * POST : callback after google login
 */
const facebookRedirect = (payload: any) =>
    api.post(`${basePathAuth}/redirect`, payload);

/**
 * GET : get if user is logged
 */
const isLogged = () => {
    return api.get(`${basePathAuth}/logged`);
};

/* --- CATEGORIES MANAGEMENT ---
 *  api : /category-management
 */
const basePathCategories = '/category-management';

/**
 * POST : create a category
 */
const createCategory = (payload: any) =>
    api.post(`${basePathCategories}/categories`, payload);

/**
 * GET : get all categories
 */
const getAllCategories = () => api.get(`${basePathCategories}/categories`);


/**
 * --- ADMIN INTERFACE ---
 */

/**
 * POST : create category
 */
const adminCreateCategory = (payload: any) =>
    api.post(`/admin/${basePathCategories}/categories`, payload)

/**
 *  PUT : update category
 */ 
const adminUpdateCategory = (id: any, payload: any) => 
    api.put(`/admin/${basePathCategories}/categories/${id}`, payload)

/**
 *  DELETE : admin delete category by id
 */
const adminDeleteCategoryById = (id: any) =>
    api.delete(`/admin/${basePathCategories}/categories/${id}`)

/**
 *  UPDATE : admin update memory by id
 */
const adminUpdateMemoryById = (id: any, payload: any) =>
    api.put(`/admin/${basePathMemories}/memories/${id}`, payload)

/**
 *  DELETE : admin delete memory by id
 */
const adminDeleteMemoryById = (id: any) =>
    api.delete(`/admin/${basePathMemories}/memories/${id}`)

/**
 * GET : admin get all users
 */
const adminGetAllUsers = () =>
    api.get(`/admin/${basePathAuth}/user`)

/**
 * UPDATE : admin update admin-right for user by id
 */
const adminUpdateUserById = (id: any, payload: any) =>
    api.put(`/admin/${basePathAuth}/user/${id}`, payload)

/**
 * DELETE : admin delete user by id
 */
const adminDeleteUserById = (id: any) =>
    api.delete(`/admin/${basePathAuth}/user/${id}`)



/**
 * Axios object to export, contening all the APIs to call
 */
export const apis = {
    memories: {
        createMemory,
        getMemoryById,
        getMemoriesByCategory,
        updateMemoryById,
        deleteMemoryById,
        getAllMemories,
        getUserMemories,
        createMemoryReport,
        getAllReportedMemories,
        getMemoryReportsById,
    },
    auth: {
        localLogin,
        localRegister,
        localResetPassword,
        googleLogin,
        googleRedirect,
        facebookLogin,
        facebookRedirect,
        isLogged,
    },
    categories: {
        createCategory,
        getAllCategories,
    },
    admin: {
        adminCreateCategory,
        adminUpdateCategory,
        adminDeleteCategoryById,
        adminUpdateMemoryById,
        adminDeleteMemoryById,
        adminGetAllUsers,
        adminUpdateUserById,
        adminDeleteUserById,
        adminUpdateMemoryReportsById,
    }
};
