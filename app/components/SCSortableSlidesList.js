// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Gallery from 'react-photo-gallery';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Viewer from 'react-viewer';
import SCSelectedSlide from './SCSelectedSlide';
import SCSlideOverlay from './SCSlideOverlay';

const styles = () => ({});

const SCSortablePhoto = SortableElement(props => (
  <SCSelectedSlide {...props} index={props.i}>
    <SCSlideOverlay
      photoId={props.photo.id}
      photoAlt={props.photo.alt}
      photoState={props.photo.state}
      photoSubjectId={props.photo.subjectid}
      toggleSlideState={props.toggleSlideState}
      openSubjectsModal={props.openSubjectsModal}
    />
  </SCSelectedSlide>
));

class SCGallery extends Component {
  constructor() {
    super();
    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  }
  render() {
    const {
      slides,
      toggleSlideSelected,
      toggleSlideState,
      openSubjectsModal,
      columns
    } = this.props;
    return (
      <div>
        <Gallery
          photos={slides}
          columns={columns}
          ImageComponent={props => (
            <SCSortablePhoto
              {...props}
              i={props.index}
              toggleSlideSelected={toggleSlideSelected}
              toggleSlideState={toggleSlideState}
              openSubjectsModal={openSubjectsModal}
              openLightbox={this.openLightbox}
            />
          )}
        />
        <Viewer
          zIndex={10000}
          visible={this.state.lightboxIsOpen}
          onClose={this.closeLightbox}
          onMaskClick={this.closeLightbox}
          images={slides}
          activeIndex={this.state.currentImage}
          zoomSpeed="0.1"
          noNavbar
        />
      </div>
    );
  }
}

SCGallery.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleSlideSelected: PropTypes.func.isRequired,
  toggleSlideState: PropTypes.func.isRequired,
  openSubjectsModal: PropTypes.func.isRequired,
  columns: PropTypes.number.isRequired
};

const SCSortableContainer = SortableContainer(props => (
  <SCGallery {...props} />
));

const SCSortableSlidesList = props => (
  <SCSortableContainer
    axis="xy"
    {...props}
    pressDelay={200}
    onSortStart={() => console.log('sorting...')}
    shouldCancelStart={() => !props.reorderingEnabled}
  />
);

SCSortableSlidesList.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,
  reorderingEnabled: PropTypes.bool.isRequired,
  onSortEnd: PropTypes.func.isRequired,
  toggleSlideSelected: PropTypes.func.isRequired,
  toggleSlideState: PropTypes.func.isRequired,
  openSubjectsModal: PropTypes.func.isRequired,
  columns: PropTypes.number.isRequired
};

export default withStyles(styles, { withTheme: true })(SCSortableSlidesList);
