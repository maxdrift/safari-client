import { createSelector } from 'reselect';
import { ExcludedState, FixedState, JuryState } from '../actions/slides';
import { VisibilityFilters } from '../actions/visibilityFilter';

const getVisibilityFilter = state => state.visibilityFilter;
const getSlides = state => state.slides;

export const getVisibleSlides = createSelector(
  [getVisibilityFilter, getSlides],
  (visibilityFilter, slides) => {
    switch (visibilityFilter) {
      case VisibilityFilters.SHOW_ALL:
        return slides;
      case VisibilityFilters.SHOW_EXCLUDED:
        return slides.filter(slide => slide.state === ExcludedState);
      case VisibilityFilters.SHOW_FIXED:
        return slides.filter(slide => slide.state === FixedState);
      case VisibilityFilters.SHOW_JURY:
        return slides.filter(slide => slide.state === JuryState);
      default:
        return slides;
    }
  }
);

export const selectedSlideIds = createSelector(
  [getSlides],
  slides =>
    slides.reduce(
      (selected, slide) =>
        slide.selected ? [...selected, slide.id] : selected,
      []
    )
);
