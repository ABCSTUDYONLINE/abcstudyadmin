/* eslint-disable no-undef */
import coursesType from './coursesType'

export function gotoTopic (courseId) {
  return {
    type: coursesType.GO_TO_TOPIC,
    courseId: courseId
  }
}

export function gobackTopic (payload) {
  return {
    type: coursesType.GO_BACK_TOPIC,
    payload: payload
  }
}

export function gotoLesson (topicId) {
  return {
    type: coursesType.GO_TO_LESSON,
    topicId: topicId
  }
}

export function gobackCourse (payload) {
  return {
    type: coursesType.GO_BACK_COURSE,
    payload: payload
  }
}

export function postCourses (payload) {
  return {
    type: coursesType.POST_COURSES,
    payload: payload
  }
}

export function putCourses (payload) {
  return {
    type: coursesType.PUT_COURSES,
    payload: payload
  }
}

export function putImageCourses (payload) {
  return {
    type: coursesType.PUT_IMAGE_COURSES,
    payload: payload
  }
}

export function getCourses (owner, page, limit) {
  return {
    type: coursesType.GET_COURSES,
    owner: owner,
    page: page,
    limit: limit
  }
}

export function deleteCourses (courseId) {
  return {
    type: coursesType.DELETE_COURSES,
    courseId: courseId
  }
}

export function publicCourse (payload) {
  return {
    type: coursesType.TO_PUBLIC,
    payload: payload
  }
}
