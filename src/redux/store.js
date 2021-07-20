import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { createLogger } from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

let middleware = null;
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    collapsed: true,
  });

  middleware = applyMiddleware(sagaMiddleware, logger);
  // middleware = applyMiddleware(sagaMiddleware);
} else {
  middleware = applyMiddleware(sagaMiddleware);
}

// create store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(middleware));

sagaMiddleware.run(rootSaga);

export default store;
