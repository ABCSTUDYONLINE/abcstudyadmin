import topicsType from './topicsType'

export function postTopic (payload) {
  return {
    type: topicsType.POST_TOPIC,
    payload: payload
  }
}

export function putTopic (payload) {
  return {
    type: topicsType.PUT_TOPIC,
    payload: payload
  }
}

export function getTopics (courseId, page, limit) {
  return {
    type: topicsType.GET_TOPICS,
    courseId: courseId,
    page: page,
    limit: limit
  }
}

export function deleteTopic (topicId) {
  return {
    type: topicsType.DELETE_TOPIC,
    topicId: topicId
  }
}
