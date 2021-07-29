import API from './api';

const postCourses = (params) => {
    localStorage.setItem('contentType', 'multipart/form-data');
    return API.post('/courses', params).then(res => res.data);
};

const putCourses = (params) => {
    localStorage.setItem('contentType', 'application/json');
    return API.put('/courses', params).then(res => res.data);
};

const putImageCourses = (params) => {
    localStorage.setItem('contentType', 'multipart/form-data');
    return API.put('/courses/background', params).then(res => res.data);
};

const getCourses = (params) => {
    localStorage.setItem('contentType', 'application/json');
    const { owner, page, limit } = params;
    return API.get(`/courses?owner=${owner}&page=${page}&limit=${limit}`).then(res => res.data);
};

const deleteCourses = (courseID) => {
    localStorage.setItem('contentType', 'application/json');
    return API.delete(`/courses?courseId=${courseID}`).then(res => res.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    postCourses,
    putCourses,
    putImageCourses,
    getCourses,
    deleteCourses
}