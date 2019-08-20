import { connect } from 'react-redux';
import {
  updateSlideIndex,
  toggleSlideSelected,
  toggleSlideState
} from '../actions/slides';
import { VisibilityFilters } from '../actions/visibilityFilter';
import { openSubjectsModal } from '../actions/subjectsModal';
import { getVisibleSlides } from '../selectors';
import SCSortableSlidesList from '../components/SCSortableSlidesList';

const mapStateToProps = state => ({
  slides: getVisibleSlides(state),
  // Disable drag&drop reordering if not in "View all" slides view.
  reorderingEnabled: state.visibilityFilter === VisibilityFilters.SHOW_ALL
});

const mapDispatchToProps = dispatch => ({
  toggleSlideSelected: id => dispatch(toggleSlideSelected(id)),
  toggleSlideState: id => dispatch(toggleSlideState(id)),
  openSubjectsModal: (ids, subjectid) =>
    dispatch(openSubjectsModal(ids, subjectid)),
  onSortEnd: ({ oldIndex, newIndex }) =>
    dispatch(updateSlideIndex(oldIndex, newIndex))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SCSortableSlidesList);
