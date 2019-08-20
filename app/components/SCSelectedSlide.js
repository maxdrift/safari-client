// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Checkmark from './SCCheckmark';

const imgStyle = {
  transition: 'transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s'
};
const selectedImgStyle = {
  transform: 'translateZ(0px) scale3d(0.9, 0.9, 1)',
  transition: 'transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s'
};
const cont = {
  backgroundColor: '#eee',
  cursor: 'pointer',
  overflow: 'hidden',
  float: 'left',
  position: 'relative'
};

const SCSelectedSlide = ({
  toggleSlideSelected,
  openLightbox,
  index,
  photo,
  margin,
  children
}) => {
  // calculate x,y scale
  const sx = (100 - (30 / photo.width) * 100) / 100;
  const sy = (100 - (30 / photo.height) * 100) / 100;
  selectedImgStyle.transform = `translateZ(0px) scale3d(${sx}, ${sy}, 1)`;

  return (
    <div
      style={{ margin, height: photo.height, width: photo.width, ...cont }}
      className={!photo.selected ? 'not-selected' : 'selected'}
    >
      <Checkmark
        selected={!!photo.selected}
        onClick={() => toggleSlideSelected(photo.id)}
      />
      <a
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        onClick={e => openLightbox(e, { ...photo, index })}
      >
        <img
          style={
            photo.selected
              ? { ...imgStyle, ...selectedImgStyle }
              : { ...imgStyle }
          }
          {...photo}
          alt={photo.alt}
        />
      </a>
      {children}
      <style>{'.not-selected:hover{outline:2px solid #06befa}'}</style>
      <style>{'.not-selected:hover .slide-overlay{display:block}'}</style>
      <style>{'.not-selected:hover .checkmark{display:block}'}</style>
      <style>{'.selected .checkmark{display:block}'}</style>
    </div>
  );
};

SCSelectedSlide.propTypes = {
  toggleSlideSelected: PropTypes.func.isRequired,
  openLightbox: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  photo: PropTypes.shape().isRequired,
  margin: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};

export default SCSelectedSlide;
