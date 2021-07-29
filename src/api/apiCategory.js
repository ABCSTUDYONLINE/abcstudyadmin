import API from './api';

const postCategories = (params) => {
    localStorage.setItem('contentType', 'application/json');
    return API.post('/categories', params).then(res => res.data);
};

const putCategories = (params) => {
    localStorage.setItem('contentType', 'application/json');
    return API.put('/categories', params).then(res => res.data);
};

const getCategories = (params) => {
    localStorage.setItem('contentType', 'application/json');
    const { page, limit } = params;
    return API.get(`/categories?page=${page}&limit=${limit}`).then(res => res.data);
};

const deleteCategories = (categoryID) => {
    localStorage.setItem('contentType', 'application/json');
    return API.delete(`/categories?categoryId=${categoryID}`).then(res => res.data);
};

const getCategoriesDetailCategory = (categoryID) => {
    localStorage.setItem('contentType', 'application/json');
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