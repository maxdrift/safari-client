// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import slides from './slides';
import visibilityFilter from './visibilityFilter';

const rootReducer = combineReducers({
  slides,
  visibilityFilter,
  router
});

export default rootReducer;
