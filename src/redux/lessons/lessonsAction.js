import lessonsType from './lessonsType'

export function postLesson (payload) {
  return {
    type: lessonsType.POST_LESSON,
    payload: payload
  }
}

export function putLesson (payload) {
  return {
    type: lessonsType.PUT_LESSON,
    payload: payload
  }
}

export function getLessons (topicId, page, limit) {
  return {
    type: lessonsType.GET_LESSONS,
    topicId: topicId,
    page: page,
    limit: limit
  }
}

export function deleteLesson (lessonId) {
  return {
    type: lessonsType.DELETE_LESSON,
    lessonId: lessonId
  }
}
