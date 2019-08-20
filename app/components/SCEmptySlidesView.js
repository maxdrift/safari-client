// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SCLoadSlidesButton from './SCLoadSlidesButton';

const styles = theme => ({
  root: {},
  scroll: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: theme.spacing(15),
    bottom: theme.spacing(10)
  },
  message: {}
});

const SCEmptySlidesView = ({ classes, onFilesSelected }) => (
  <div className={classes.root}>
    <Grid
      className={classes.scroll}
      container
      alignItems="center"
      justify="center"
    >
      <div>
        <Typography variant="h4" color="inherit" className={classes.message}>
          Carica delle immagini per iniziare...
        </Typography>
      </div>
    </Grid>
    <SCLoadSlidesButton text="Carica immagini" onClick={onFilesSelected} />
  </div>
);

SCEmptySlidesView.propTypes = {
  classes: PropTypes.object.isRequired,
  onFilesSelected: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(SCEmptySlidesView);
