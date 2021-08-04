import { combineReducers } from 'redux'
import { filterActions } from 'redux-ignore'

import userReducer from './user/userReducer'
import userType from './user/userType'

import categoryReducer from './category/categoryReducer'
import categoryType from './category/categoryType'

import coursesReducer from './courses/coursesReducer'
import coursesType from './courses/coursesType'

import topicsReducer from './topics/topicsReducer'
import topicsType from './topics/topicsType'

import lessonsReducer from './lessons/lessonsReducer'
import lessonsType from './lessons/lessonsType'

import promotionsReducer from './promotions/promotionsReducer'
import promotionsType from './promotions/promotionsType'

import layoutReducer from './layout/layoutReducer'
import layoutType from './layout/layoutType'

const rootReducer = combineReducers({
  user: filterActions(userReducer, Object.values(userType)),
  category: filterActions(categoryReducer, Object.values(categoryType)),
  courses: filterActions(coursesReducer, Object.values(coursesType)),
  topics: filterActions(topicsReducer, Object.values(topicsType)),
  lessons: filterActions(lessonsReducer, Object.values(lessonsType)),
  promotions: filterActions(promotionsReducer, Object.values(promotionsType)),
  layout: filterActions(layoutReducer, Object.values(layoutType))
})

export default rootReducer
