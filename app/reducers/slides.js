// @flow
/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
import path from 'path';
import sizeOf from 'image-size';
import { arrayMove } from 'react-sortable-hoc';
import { ExcludedState } from '../actions/slides';
import { removeThumbs } from '../thumbnails';

const initialState = [];

const slides = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SLIDES': {
      const newSlides = action.paths.map(pathSet => {
        const { src, srcSet, sizes } = pathSet;
        const filename = path.basename(src);
        const { width, height } = sizeOf(src);
        return {
          id: filename,
          src,
          srcSet,
          sizes,
          selected: false,
          width,
          height,
          alt: filename,
          state: ExcludedState,
          subjectid: 0
        };
      });
      const newState = state.concat(newSlides);
      const uniqueSlides = newState.reduce(
        (acc, slide) => ({ ...acc, [slide.id]: slide }),
        {}
      );

      return Object.keys(uniqueSlides).map(key => uniqueSlides[key]);
    }
    case 'REMOVE_SELECTED_SLIDES':
      return state.filter(slide => {
        slide.selected && removeThumbs(slide.srcSet);
        return !slide.selected;
      });
    case 'UPDATE_SLIDE_INDEX':
      return arrayMove(state, action.oldIndex, action.newIndex);
    case 'TOGGLE_SLIDE_SELECTED':
      return state.map(slide =>
        slide.id === action.id ? { ...slide, selected: !slide.selected } : slide
      );
    case 'SELECT_ALL_SLIDES':
      return state.map(slide =>
        slide.state === action.filter || action.filter === -1
          ? { ...slide, selected: true }
          : slide
      );
    case 'DESELECT_ALL_SLIDES':
      return state.map(slide =>
        slide.state === action.filter || action.filter === -1
          ? { ...slide, selected: false }
          : slide
      );
    case 'TOGGLE_SLIDE_STATE':
      return state.map(slide =>
        slide.id === action.id
          ? { ...slide, state: (slide.state + 1) % 3 }
          : slide
      );
    case 'SET_STATE_TO_SELECTED_SLIDES':
      return state.map(slide =>
        slide.selected
          ? { ...slide, state: action.state, selected: false }
          : slide
      );
    case 'SET_SLIDES_SUBJECT':
      return state.map(slide =>
        action.ids.includes(slide.id)
          ? { ...slide, subjectid: action.subjectid, selected: false }
          : slide
      );
    default:
      return state;
  }
};

export default slides;
