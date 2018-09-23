// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    background: 'none',
    border: 'none',
    padding: '0px',
    left: '4px',
    top: '4px',
    position: 'absolute',
    zIndex: '1'
  }
});

const Checkmark = ({ classes, selected, onClick }) => (
  <div className="checkmark">
    <button
      className={classes.root}
      onClick={onClick}
      tabIndex={0}
      onKeyDown={() => {}}
    >
      <svg
        style={
          selected
            ? {
                fill: 'white',
                position: 'absolute',
                filter: 'url(#checkmark-dropshadow)'
              }
            : {
                fill: 'gray',
                position: 'absolute',
                filter: 'url(#checkmark-dropshadow)'
              }
        }
        width="24px"
        height="24px"
      >
        <filter id="checkmark-dropshadow" height="130%">
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
        <circle cx="12.5" cy="12.2" r="8.292" />
      </svg>
      <svg
        style={
          selected
            ? { fill: '#06befa', position: 'absolute' }
            : { fill: '#c1c1c1', position: 'absolute' }
        }
        width="24px"
        height="24px"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    </button>
    <style>{'.checkmark{display:none}'}</style>
  </div>
);

Checkmark.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(Checkmark);
