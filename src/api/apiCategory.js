import API from './api';

const postCategories = (params) => {
    return API.post('/categories', params).then(res => res.data);
};

const putCategories = (params) => {
    return API.put('/categories', params).then(res => res.data);
};

const getCategories = (params) => {
    const { page, limit } = params;
    return API.get(`/categories?page=${page}&limit=${limit}`).then(res => res.data);
};

const deleteCategories = (categoryID) => {
    return API.delete(`/categories?categoryId=${categoryID}`).then(res => res.data);
};

const getCategoriesDetailCategory = (categoryID) => {
    return API.get(`/categories/detailCategory?categoryId=${categoryID}`).then(res => res.data);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    postCategories,
    putCategories,
    getCategories,
    deleteCategories,
    getCategoriesDetailCategory
}