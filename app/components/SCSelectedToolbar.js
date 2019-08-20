// @flow
import React from 'react';
import { remote } from 'electron';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import SCNavBarButton from './SCNavBarButton';
import SCStateMenu from './SCStateMenu';

const { dialog } = remote;

const styles = () => ({
  root: {},
  title: {
    flexGrow: 1
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

const SCSelectedToolbar = props => (
  <Toolbar className={props.classes.root} disableGutters>
    <SCNavBarButton
      text="Annulla selezione"
      onClick={() => props.deselectAllSlides(props.currentFilterState)}
      iconComponent={<CloseIcon />}
      iconOnly
    />
    <Typography variant="h6" color="inherit" className={props.classes.title}>
      {selectedSlidesCountLabel(props.selectedSlidesCount)}
    </Typography>

    <SCNavBarButton
      text="Seleziona tutto"
      onClick={() => props.selectAllSlides(props.currentFilterState)}
    />
    <SCStateMenu onClick={value => props.setStateToSelectedSlides(value)} />
    <SCNavBarButton
      text="Seleziona una specie"
      onClick={() => props.openSubjectsModal(props.selectedSlideIds, null)}
      iconComponent={<LocalOfferIcon />}
      iconOnly
    />
    <SCNavBarButton
      text="Rimuovi selezionate"
      onClick={() => handleDeleteButtonClick(props.removeSelectedSlides)}
      iconComponent={<DeleteIcon />}
      iconOnly
    />
    {/* <SelectionControls
      selectAllSlides={() => props.selectAllSlides(props.currentFilterState)}
      setStateToSelectedSlides={props.setStateToSelectedSlides}
      openSubjectsModal={() => openSubjectsModal(props.selectedSlideIds, null)}
      removeSelectedSlides={props.removeSelectedSlides}
    /> */}
  </Toolbar>
);

SCSelectedToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  currentFilterState: PropTypes.number.isRequired,
  selectedSlideIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedSlidesCount: PropTypes.number.isRequired,
  selectAllSlides: PropTypes.func.isRequired,
  deselectAllSlides: PropTypes.func.isRequired,
  setStateToSelectedSlides: PropTypes.func.isRequired,
  removeSelectedSlides: PropTypes.func.isRequired,
  openSubjectsModal: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(SCSelectedToolbar);
