// @flow
import { remote } from 'electron';
import { ExcludedState, FixedState, JuryState } from './slides';
import { appName } from '../constants';

const ga = remote.getGlobal('ga');

export const setVisibilityFilter = filter => {
  ga.screenview(filter, appName).send();
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
};

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_JURY: 'SHOW_JURY',
  SHOW_FIXED: 'SHOW_FIXED',
  SHOW_EXCLUDED: 'SHOW_EXCLUDED'
};

export const filterToState = filter => {
  switch (filter) {
    case 'SHOW_EXCLUDED':
      return ExcludedState;
    case 'SHOW_FIXED':
      return FixedState;
    case 'SHOW_JURY':
      return JuryState;
    default:
      return -1;
  }
};

export const AllLabel = 'Tutte';
export const ExcludedLabel = 'Scartate';
export const FixedLabel = 'Punt. fisso';
export const JuryLabel = 'In giuria';
