// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import slides from './slides';
import visibilityFilter from './visibilityFilter';
import subjectsModal from './subjectsModal';

export default history =>
  combineReducers({
    slides,
    visibilityFilter,
    subjectsModal,
    router: connectRouter(history)
  });
