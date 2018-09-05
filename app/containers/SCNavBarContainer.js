import { connect } from 'react-redux';
import SCNavBar from '../components/SCNavBar';
import {
  selectAllSlides,
  deselectAllSlides,
  removeSelectedSlides
} from '../actions/slides';
import { filterToState } from '../actions/visibilityFilter';
import exportToCSV from '../export/csv';

const mapStateToProps = state => ({
  currentFilterState: filterToState(state.visibilityFilter),
  hasSlides: state.slides.length > 0,
  selectedSlideCount: state.slides.filter(slide => slide.selected).length,
  exportToCSV: callback => exportToCSV(state.slides, callback)
});

const mapDispatchToProps = dispatch => ({
  selectAllSlides: currentFilter => dispatch(selectAllSlides(currentFilter)),
  deselectAllSlides: currentFilter =>
    dispatch(deselectAllSlides(currentFilter)),
  removeSelectedSlides: () => dispatch(removeSelectedSlides())
});

export default connect(mapStateToProps, mapDispatchToProps)(SCNavBar);
