// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SCResponsiveGrid from '../components/SCResponsiveGrid';
import SCEmptySlidesView from '../components/SCEmptySlidesView';

const styles = () => ({});

const SCSlidesContainer = ({
  hasSlides,
  selectedSlidesCount,
  onFilesSelected
}) => (
  <div>
    {hasSlides ? (
      <SCResponsiveGrid
        selectedSlidesCount={selectedSlidesCount}
        onFilesSelected={onFilesSelected}
      />
    ) : (
      <SCEmptySlidesView onFilesSelected={onFilesSelected} />
    )}
  </div>
);

SCSlidesContainer.propTypes = {
  hasSlides: PropTypes.bool.isRequired,
  selectedSlidesCount: PropTypes.number.isRequired,
  onFilesSelected: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(SCSlidesContainer);
