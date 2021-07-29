import coursesType from './coursesType';

export function postCourses(payload) {
  return {
    type: coursesType.POST_COURSES,
    payload: payload,
  };
}

export function putCourses(payload) {
  return {
    type: coursesType.PUT_COURSES,
    payload: payload,
  };
}

export function putImageCourses(payload) {
  return {
    type: coursesType.PUT_IMAGE_COURSES,
    payload: payload,
  };
}

export function getCourses(owner, page, limit) {
  return {
    type: coursesType.GET_COURSES,
    owner: owner,
    page: page,
    limit: limit
  };
}

export function deleteCourses(coursesID) {
  return {
    type: coursesType.DELETE_COURSES,
    coursesID: coursesID,
  };
}


