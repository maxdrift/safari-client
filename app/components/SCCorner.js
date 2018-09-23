// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    background: 'none',
    border: 'none',
    padding: '0px',
    width: '30px',
    height: '30px',
    position: 'absolute',
    right: '0px',
    top: '0px'
  }
});

const SCCorner = ({ classes, color, altText, onClick }) => (
  <button
    className={classes.root}
    onClick={onClick}
    onKeyDown={() => {}}
    tabIndex={0}
    title={altText}
  >
    <svg
      height="30"
      width="30"
      style={{ fill: color, filter: 'url(#dropshadow)' }}
    >
      <filter id="dropshadow" height="130%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset dx="0" dy="0" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.7" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <polygon points="30,0 30,30 0,0" />
      {altText}
    </svg>
  </button>
);

SCCorner.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(SCCorner);
