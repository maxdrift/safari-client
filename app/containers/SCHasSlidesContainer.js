import { connect } from 'react-redux';
import SCSlidesContainer from '../components/SCSlidesContainer';
import { addSlides } from '../actions/slides';

const mapStateToProps = state => ({
  hasSlides: state.slides.length > 0,
  selectedSlideCount: state.slides.filter(slide => slide.selected).length
});

const mapDispatchToProps = dispatch => ({
  onFilesSelected: paths => dispatch(addSlides(paths))
});

export default connect(mapStateToProps, mapDispatchToProps)(SCSlidesContainer);
