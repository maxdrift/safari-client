// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
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
  }
});

const SCSlideHeader = ({ classes, children }) => (
  <div className={classes.root}>{children}</div>
);

SCSlideHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default withStyles(styles, { withTheme: true })(SCSlideHeader);
