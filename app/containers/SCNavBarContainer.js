import { connect } from 'react-redux';
import SCNavBar from '../components/SCNavBar';
import {
  selectAllSlides,
  deselectAllSlides,
  setStateToSelectedSlides,
  removeSelectedSlides
} from '../actions/slides';
import { openSubjectsModal } from '../actions/subjectsModal';
import { filterToState } from '../actions/visibilityFilter';
import exportToCSV from '../export/csv';

const mapStateToProps = state => {
  const selectedSlideIds = state.slides.reduce(
    (selected, slide) => (slide.selected ? [...selected, slide.id] : selected),
    []
  );
  return {
    currentFilterState: filterToState(state.visibilityFilter),
    hasSlides: state.slides.length > 0,
    selectedSlideIds,
    selectedSlidesCount: selectedSlideIds.length,
    exportToCSV: callback => exportToCSV(state.slides, callback)
  };
};

const mapDispatchToProps = dispatch => ({
  selectAllSlides: currentFilter => dispatch(selectAllSlides(currentFilter)),
  deselectAllSlides: currentFilter =>
    dispatch(deselectAllSlides(currentFilter)),
  setStateToSelectedSlides: state => dispatch(setStateToSelectedSlides(state)),
  removeSelectedSlides: () => dispatch(removeSelectedSlides()),
  openSubjectsModal: (ids, subjectid) =>
    dispatch(openSubjectsModal(ids, subjectid))
});

export default connect(mapStateToProps, mapDispatchToProps)(SCNavBar);
