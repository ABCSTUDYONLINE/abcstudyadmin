import API from './api';

const postCourses = (params) => {
    return API.post('/courses', params).then(res => res.data);
};

const putCourses = (params) => {
    return API.put('/courses', params).then(res => res.data);
};

const getCourses = (params) => {
    const { owner, page, limit } = params;
    return API.get(`/courses?owner=${owner}&page=${page}&limit=${limit}`).then(res => res.data);
};

const deleteCourses = (courseID) => {
    return API.delete(`/courses?courseId=${courseID}`).then(res => res.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    postCourses,
    putCourses,
    getCourses,
    deleteCourses
}