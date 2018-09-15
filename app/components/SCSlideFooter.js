// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
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
  },
  label: {
    color: theme.palette.common.white
  }
});

const SCSlideFooter = ({ classes, onLabelClick, children }) => (
  <div className={classes.root}>
    <Button className={classes.label} onClick={onLabelClick}>
      {children}
    </Button>
  </div>
);

SCSlideFooter.propTypes = {
  classes: PropTypes.object.isRequired,
  onLabelClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default withStyles(styles, { withTheme: true })(SCSlideFooter);
