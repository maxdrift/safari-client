// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { showSaveDialog } from '../dialogs';

const appTitle = 'Safari Client';

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

const selectedSlidesCountLabel = count =>
  count === 1 ? '1 slide selected' : `${count} slides selected`;

const SelectionControls = ({
  selectAllSlides,
  deselectAllSlides,
  removeSelectedSlides
}) => (
  <div>
    <Button size="large" color="inherit" onClick={selectAllSlides}>
      Seleziona tutto
    </Button>
    <Button size="large" color="inherit" onClick={deselectAllSlides}>
      Deseleziona tutto
    </Button>
    <Button size="large" color="inherit" onClick={removeSelectedSlides}>
      Elimina selezionate
    </Button>
  </div>
);

SelectionControls.propTypes = {
  selectAllSlides: PropTypes.func.isRequired,
  deselectAllSlides: PropTypes.func.isRequired,
  removeSelectedSlides: PropTypes.func.isRequired
};

const SCNavBar = props => {
  const {
    classes,
    children,
    currentFilterState,
    hasSlides,
    selectedSlideCount,
    selectAllSlides,
    deselectAllSlides,
    removeSelectedSlides,
    exportToCSV
  } = props;
  const showExportButton = !hasSlides || selectedSlideCount === 0;
  const showSelectionInfo = selectedSlideCount > 0;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="headline"
            color="inherit"
            className={classes.flex}
          >
            {showSelectionInfo
              ? selectedSlidesCountLabel(selectedSlideCount)
              : appTitle}
          </Typography>
          {showExportButton ? (
            <Button
              size="large"
              color="inherit"
              onClick={() =>
                exportToCSV((_err, output) => showSaveDialog(output))
              }
              className={classes.button}
            >
              <SaveIcon size="small" className={classes.extendedIcon} />
              Esporta CSV
            </Button>
          ) : (
            <SelectionControls
              selectAllSlides={() => selectAllSlides(currentFilterState)}
              deselectAllSlides={() => deselectAllSlides(currentFilterState)}
              removeSelectedSlides={removeSelectedSlides}
            />
          )}
        </Toolbar>
        {children}
      </AppBar>
    </div>
  );
};

SCNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  currentFilterState: PropTypes.number.isRequired,
  hasSlides: PropTypes.bool.isRequired,
  selectedSlideCount: PropTypes.number.isRequired,
  selectAllSlides: PropTypes.func.isRequired,
  deselectAllSlides: PropTypes.func.isRequired,
  removeSelectedSlides: PropTypes.func.isRequired,
  exportToCSV: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(SCNavBar);
