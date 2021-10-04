// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import slides from './slides';
import visibilityFilter from './visibilityFilter';
import subjectsModal from './subjectsModal';

const rootReducer = combineReducers({
  slides,
  visibilityFilter,
  subjectsModal,
  router
});

export default rootReducer;
