// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import AddToPhotos from '@material-ui/icons/AddToPhotos';
import { showOpenDialog } from '../dialogs';

const styles = theme => ({
  button: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
});

const SCLoadSlidesButton = ({ classes, text, onClick }) => (
  <Fab
    variant="extended"
    className={classes.button}
    color="secondary"
    aria-label={text}
    onClick={() => showOpenDialog(onClick)}
  >
    <AddToPhotos className={classes.extendedIcon} />
    {text}
  </Fab>
);

SCLoadSlidesButton.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(SCLoadSlidesButton);
