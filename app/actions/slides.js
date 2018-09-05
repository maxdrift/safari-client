// @flow

export const addSlides = paths => ({
  type: 'ADD_SLIDES',
  paths
});

export const removeSelectedSlides = () => ({
  type: 'REMOVE_SELECTED_SLIDES'
});

export const updateSlideIndex = (oldIndex, newIndex) => ({
  type: 'UPDATE_SLIDE_INDEX',
  oldIndex,
  newIndex
});

export const toggleSlideSelected = id => ({
  type: 'TOGGLE_SLIDE_SELECTED',
  id
});

export const selectAllSlides = filter => ({
  type: 'SELECT_ALL_SLIDES',
  filter
});

export const deselectAllSlides = filter => ({
  type: 'DESELECT_ALL_SLIDES',
  filter
});

export const toggleSlideState = id => ({
  type: 'TOGGLE_SLIDE_STATE',
  id
});

export const setSlideSubject = (id, subjectid) => ({
  type: 'SET_SLIDE_SUBJECT',
  id,
  subjectid
});

export const slideStates = {
  0: {
    value: 0,
    label: 'Scartata',
    pluralLabel: 'Scartate',
    color: 'lightgray'
  },
  1: {
    value: 1,
    label: 'Punt. fisso',
    pluralLabel: 'Punt. fisso',
    color: 'red'
  },
  2: {
    value: 2,
    label: 'In giuria',
    pluralLabel: 'In giuria',
    color: 'lime'
  }
};

export const ExcludedState = 0;
export const FixedState = 1;
export const JuryState = 2;
