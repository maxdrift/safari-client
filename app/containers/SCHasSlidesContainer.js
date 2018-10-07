import { connect } from 'react-redux';
import SCSlidesContainer from '../components/SCSlidesContainer';
import { addSlidesAsync } from '../actions/slides';

const mapStateToProps = state => ({
  hasSlides: state.slides.length > 0,
  selectedSlidesCount: state.slides.filter(slide => slide.selected).length
});

const mapDispatchToProps = dispatch => ({
  onFilesSelected: paths => dispatch(addSlidesAsync(paths))
});

export default connect(mapStateToProps, mapDispatchToProps)(SCSlidesContainer);
