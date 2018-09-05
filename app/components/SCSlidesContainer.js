// @flow
import React from 'react';
import PropTypes from 'prop-types';
import SCResponsiveGrid from '../components/SCResponsiveGrid';
import SCEmptySlidesView from '../components/SCEmptySlidesView';

const SCSlidesContainer = ({
  hasSlides,
  selectedSlideCount,
  onFilesSelected
}) => (
  <div>
    {hasSlides ? (
      <SCResponsiveGrid
        selectedSlideCount={selectedSlideCount}
        onFilesSelected={onFilesSelected}
      />
    ) : (
      <SCEmptySlidesView onFilesSelected={onFilesSelected} />
    )}
  </div>
);

SCSlidesContainer.propTypes = {
  hasSlides: PropTypes.bool.isRequired,
  selectedSlideCount: PropTypes.number.isRequired,
  onFilesSelected: PropTypes.func.isRequired
};

export default SCSlidesContainer;
