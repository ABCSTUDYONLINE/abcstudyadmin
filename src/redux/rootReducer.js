import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';

import userReducer from './user/userReducer';
import userType from './user/userType';

import categoryReducer from './category/categoryReducer';
import categoryType from './category/categoryType';

import layoutReducer from './layout/layoutReducer';
import layoutType from './layout/layoutType';

const rootReducer = combineReducers({
  user: filterActions(userReducer, Object.values(userType)),
  category: filterActions(categoryReducer, Object.values(categoryType)),
  layout: filterActions(layoutReducer, Object.values(layoutType)),
});

export default rootReducer;
