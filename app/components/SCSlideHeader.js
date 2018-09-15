// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    backgroundImage:
      'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.4), rgba(0,0,0,0))',
    width: '100%',
    height: '40px',
    position: 'absolute',
    left: '0px',
    top: '0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: theme.palette.common.white
  }
});

const SCSlideHeader = ({ classes, children }) => (
  <div className={classes.root}>
    <Typography
      variant="subheading"
      color="inherit"
      align="center"
      className={classes.title}
    >
      {children}
    </Typography>
  </div>
);

SCSlideHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default withStyles(styles, { withTheme: true })(SCSlideHeader);
