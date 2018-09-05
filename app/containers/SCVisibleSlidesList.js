import { connect } from 'react-redux';
import {
  updateSlideIndex,
  toggleSlideSelected,
  toggleSlideState,
  setSlideSubject,
  ExcludedState,
  FixedState,
  JuryState
} from '../actions/slides';
import { VisibilityFilters } from '../actions/visibilityFilter';
import SCSortableSlidesList from '../components/SCSortableSlidesList';

const getVisibleSlides = (slides, filter) => {
  switch (filter) {
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
};

const mapStateToProps = state => ({
  slides: getVisibleSlides(state.slides, state.visibilityFilter),
  // Disable drag&drop reordering if not in "View all" slides view.
  reorderingEnabled: state.visibilityFilter === VisibilityFilters.SHOW_ALL
});

const mapDispatchToProps = dispatch => ({
  toggleSlideSelected: id => dispatch(toggleSlideSelected(id)),
  toggleSlideState: id => dispatch(toggleSlideState(id)),
  setSlideSubject: (id, subjectid) => dispatch(setSlideSubject(id, subjectid)),
  onSortEnd: ({ oldIndex, newIndex }) =>
    dispatch(updateSlideIndex(oldIndex, newIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  SCSortableSlidesList
);
