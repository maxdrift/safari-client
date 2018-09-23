// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import SCToolbar from './SCToolbar';
import SCSelectedToolbar from './SCSelectedToolbar';

const styles = theme => ({
  root: {},
  flex: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

const SCNavBar = ({
  classes,
  children,
  currentFilterState,
  hasSlides,
  selectedSlideIds,
  selectedSlidesCount,
  selectAllSlides,
  openSubjectsModal,
  deselectAllSlides,
  setStateToSelectedSlides,
  removeSelectedSlides,
  exportToCSV
}) => (
  <div className={classes.root}>
    <AppBar position="fixed">
      {selectedSlidesCount > 0 ? (
        <SCSelectedToolbar
          currentFilterState={currentFilterState}
          selectedSlideIds={selectedSlideIds}
          selectedSlidesCount={selectedSlidesCount}
          selectAllSlides={selectAllSlides}
          deselectAllSlides={deselectAllSlides}
          setStateToSelectedSlides={setStateToSelectedSlides}
          removeSelectedSlides={removeSelectedSlides}
          openSubjectsModal={openSubjectsModal}
        />
      ) : (
        <SCToolbar canExport={hasSlides} exportToCSV={exportToCSV} />
      )}
      {children}
    </AppBar>
  </div>
);

SCNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  currentFilterState: PropTypes.number.isRequired,
  hasSlides: PropTypes.bool.isRequired,
  selectedSlideIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedSlidesCount: PropTypes.number.isRequired,
  selectAllSlides: PropTypes.func.isRequired,
  deselectAllSlides: PropTypes.func.isRequired,
  setStateToSelectedSlides: PropTypes.func.isRequired,
  removeSelectedSlides: PropTypes.func.isRequired,
  exportToCSV: PropTypes.func.isRequired,
  openSubjectsModal: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(SCNavBar);
