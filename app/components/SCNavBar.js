// @flow
import React from 'react';
import { remote } from 'electron';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { showSaveDialog } from '../dialogs';
import SCStateMenu from './SCStateMenu';

const { dialog } = remote;

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
  count === 1 ? '1 slide selezionata' : `${count} slide selezionate`;

const handleDeleteButtonClick = callback => {
  dialog.showMessageBox(
    {
      type: 'question',
      message: 'Sei sicuro di voler eliminare le slide selezionate?',
      buttons: ['Annulla', 'Elimina']
    },
    buttonId => buttonId === 1 && callback()
  );
};

const SelectionControls = ({
  selectAllSlides,
  setStateToSelectedSlides,
  openSubjectsModal,
  removeSelectedSlides
}) => (
  <div>
    <Button size="large" color="inherit" onClick={selectAllSlides}>
      Seleziona tutto
    </Button>
    <SCStateMenu onClick={value => setStateToSelectedSlides(value)} />
    <IconButton
      color="inherit"
      title="Seleziona una specie"
      aria-label="Assign subject"
      onClick={openSubjectsModal}
    >
      <LocalOfferIcon />
    </IconButton>
    <IconButton
      color="inherit"
      title="Rimuovi selezionate"
      aria-label="Remove selected"
      onClick={() => handleDeleteButtonClick(removeSelectedSlides)}
    >
      <DeleteIcon />
    </IconButton>
  </div>
);

SelectionControls.propTypes = {
  selectAllSlides: PropTypes.func.isRequired,
  setStateToSelectedSlides: PropTypes.func.isRequired,
  openSubjectsModal: PropTypes.func.isRequired,
  removeSelectedSlides: PropTypes.func.isRequired
};

const SCNavBar = props => {
  const {
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
  } = props;
  const showExportButton = !hasSlides || selectedSlidesCount === 0;
  const showSelectionInfo = selectedSlidesCount > 0;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {showSelectionInfo && (
            <IconButton
              color="inherit"
              className={classes.button}
              aria-label="Deselect all"
              title="Annulla selezione"
              onClick={() => deselectAllSlides(currentFilterState)}
            >
              <CloseIcon />
            </IconButton>
          )}
          <Typography variant="title" color="inherit" className={classes.flex}>
            {showSelectionInfo
              ? selectedSlidesCountLabel(selectedSlidesCount)
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
              setStateToSelectedSlides={setStateToSelectedSlides}
              openSubjectsModal={() =>
                openSubjectsModal(selectedSlideIds, null)
              }
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
