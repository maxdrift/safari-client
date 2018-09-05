// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddToPhotos from '@material-ui/icons/AddToPhotos';
import { showOpenDialog } from '../dialogs';

const styles = theme => ({
  root: {},
  scroll: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: theme.spacing.unit * 15,
    bottom: theme.spacing.unit * 10
  },
  message: {},
  button: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

const handleSlidesSelection = callback => showOpenDialog(callback);

const SCEmptySlidesView = ({ classes, onFilesSelected }) => (
  <div className={classes.root}>
    <Grid
      className={classes.scroll}
      container
      alignItems="center"
      justify="center"
    >
      <div>
        <Typography
          variant="display1"
          color="inherit"
          className={classes.message}
        >
          Carica delle immagini per iniziare...
        </Typography>
      </div>
    </Grid>
    <Button
      variant="extendedFab"
      className={classes.button}
      color="secondary"
      aria-label="Load slides"
      onClick={() => handleSlidesSelection(onFilesSelected)}
    >
      <AddToPhotos className={classes.extendedIcon} />
      Carica immagini
    </Button>
  </div>
);

SCEmptySlidesView.propTypes = {
  classes: PropTypes.object.isRequired,
  onFilesSelected: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(SCEmptySlidesView);
