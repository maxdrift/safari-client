// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddToPhotos from '@material-ui/icons/AddToPhotos';
import { showOpenDialog } from '../dialogs';

const styles = theme => ({
  button: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

const SCLoadSlidesButton = ({ classes, text, onClick }) => (
  <Button
    variant="extendedFab"
    className={classes.button}
    color="secondary"
    aria-label={text}
    onClick={() => showOpenDialog(onClick)}
  >
    <AddToPhotos className={classes.extendedIcon} />
    {text}
  </Button>
);

SCLoadSlidesButton.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(SCLoadSlidesButton);
