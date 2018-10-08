import { remote } from 'electron';
import { VisibilityFilters } from '../actions/visibilityFilter';

const trackScreenview = remote.getGlobal('trackScreenview');

const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER': {
      trackScreenview(`${action.filter}`, 'Safari Client');
      return action.filter;
    }
    default:
      return state;
  }
};

export default visibilityFilter;
