// @flow
import { remote } from 'electron';
import tempy from 'tempy';
import path from 'path';
import { generateThumbs } from '../thumbnails';
import { appTmpFolder } from '../constants';

const ga = remote.getGlobal('ga');

export const addSlidesAsync = paths => dispatch => {
  ga.event('Slides', 'add async', `${paths.length}`).send();
  let tmpDir = '';
  if (process.env.NODE_ENV === 'production') {
    tmpDir = path.join(tempy.root, appTmpFolder);
  } else {
    tmpDir = path.join(tempy.root, `${appTmpFolder}.dev`);
  }
  console.log('Temp directory:', tmpDir);
  paths.forEach(filePath =>
    generateThumbs(filePath, tmpDir).then(srcSet =>
      dispatch(
        addSlides([
          {
            src: filePath,
            srcSet,
            sizes: [
              '(min-width: 30em) 50vw',
              '(min-width: 64em) 33.3vw',
              '(min-width: 114em) 25vw',
              '100vw'
            ]
          }
        ])
      )
    )
  );
};

export const addSlides = paths => ({
  type: 'ADD_SLIDES',
  paths
});

export const removeSelectedSlides = () => {
  ga.event('Slides', 'remove selected').send();
  return {
    type: 'REMOVE_SELECTED_SLIDES'
  };
};

export const updateSlideIndex = (oldIndex, newIndex) => {
  ga.event('Slides', 'update index').send();
  return {
    type: 'UPDATE_SLIDE_INDEX',
    oldIndex,
    newIndex
  };
};

export const toggleSlideSelected = id => {
  ga.event('Slides', 'toggle selected').send();
  return {
    type: 'TOGGLE_SLIDE_SELECTED',
    id
  };
};

export const selectAllSlides = filter => {
  ga.event('Slides', 'select all').send();
  return {
    type: 'SELECT_ALL_SLIDES',
    filter
  };
};

export const deselectAllSlides = filter => {
  ga.event('Slides', 'deselect all').send();
  return {
    type: 'DESELECT_ALL_SLIDES',
    filter
  };
};

export const toggleSlideState = id => {
  ga.event('Slides', 'toggle state').send();
  return {
    type: 'TOGGLE_SLIDE_STATE',
    id
  };
};

export const setSlidesSubject = (ids, subjectid) => {
  ga.event('Slides', 'set subject', '', subjectid).send();
  return {
    type: 'SET_SLIDES_SUBJECT',
    ids,
    subjectid
  };
};

export const setStateToSelectedSlides = state => {
  ga.event('Slides', 'set state to selected', '', state).send();
  return {
    type: 'SET_STATE_TO_SELECTED_SLIDES',
    state
  };
};

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

export const slideStatesList = Object.keys(slideStates).map(
  key => slideStates[key]
);

export const ExcludedState = 0;
export const FixedState = 1;
export const JuryState = 2;
