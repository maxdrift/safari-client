// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-photo-gallery';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Lightbox from 'react-images';
import SCSelectedSlide from './SCSelectedSlide';
import SCSlideOverlay from './SCSlideOverlay';

const SCSortablePhoto = SortableElement(props => (
  <SCSelectedSlide {...props} index={props.i}>
    <SCSlideOverlay {...props} />
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
      setSlideSubject,
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
              setSlideSubject={setSlideSubject}
              openLightbox={this.openLightbox}
            />
          )}
        />
        <Lightbox
          images={slides}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
        />
      </div>
    );
  }
}

SCGallery.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleSlideSelected: PropTypes.func.isRequired,
  toggleSlideState: PropTypes.func.isRequired,
  setSlideSubject: PropTypes.func.isRequired,
  columns: PropTypes.number.isRequired
};

const SCSortableContainer = SortableContainer(props => (
  <SCGallery {...props} />
));

// const ShouldCancelStart = (e) => {
//   console.log('Target:', e.target.tagName.toLowerCase())
//   // Cancel sorting if the event target is an `input`, `textarea`, `select`, `option` or `path`
//   const disabledElements = ['input', 'textarea', 'select', 'option', 'button', 'path', 'circle', 'polygon', 'p', 'svg']
//
//   if (disabledElements.indexOf(e.target.tagName.toLowerCase()) !== -1) {
//     return true // Return true to cancel sorting
//   }
// }

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
  setSlideSubject: PropTypes.func.isRequired,
  columns: PropTypes.number.isRequired
};

export default SCSortableSlidesList;