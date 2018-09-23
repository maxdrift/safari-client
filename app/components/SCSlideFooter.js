// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    backgroundImage:
      'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5), rgba(0,0,0,0.8))',
    width: '100%',
    height: '40px',
    position: 'absolute',
    left: '0px',
    bottom: '0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const SCSlideFooter = ({ classes, children }) => (
  <div className={classes.root}>{children}</div>
);

SCSlideFooter.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default withStyles(styles, { withTheme: true })(SCSlideFooter);
