import { connect } from 'react-redux';
import { batchActions } from 'redux-batched-actions';
import SCSubjectsModal from '../components/SCSubjectsModal';
import { setSlidesSubject } from '../actions/slides';
import { closeSubjectsModal } from '../actions/subjectsModal';

const mapStateToProps = state => ({
  open: state.subjectsModal.open,
  selectedSlides: state.subjectsModal.selectedSlides,
  selectedSubject: state.subjectsModal.selectedSubject
});

const mapDispatchToProps = dispatch => ({
  onConfirmedSubject: (slidesIds, subjectId) =>
    dispatch(
      batchActions([
        setSlidesSubject(slidesIds, subjectId),
        closeSubjectsModal()
      ])
    ),
  onAbortedSubject: () => dispatch(closeSubjectsModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(SCSubjectsModal);
