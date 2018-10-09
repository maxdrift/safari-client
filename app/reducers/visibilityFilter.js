import { remote } from 'electron';
import { VisibilityFilters } from '../actions/visibilityFilter';

const ga = remote.getGlobal('ga');

const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER': {
      ga.screenview(`${action.filter}`, 'Safari Client').send();
      return action.filter;
    }
    default:
      return state;
  }
};

export default visibilityFilter;
