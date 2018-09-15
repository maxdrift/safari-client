// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LensIcon from '@material-ui/icons/Lens';
import { slideStatesList } from '../actions/slides';

const styles = () => ({
  root: {
    display: 'inline-block'
  },
  primary: {}
});

class SCStateMenu extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSelection = stateValue => {
    this.handleClose();
    return this.props.onClick(stateValue);
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Button
          size="large"
          color="inherit"
          aria-owns={anchorEl ? 'slide-state-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Giudica
        </Button>
        <Menu
          id="slide-state-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {slideStatesList.map(state => (
            <MenuItem
              key={state.value}
              onClick={() => this.handleSelection(state.value)}
            >
              <ListItemIcon style={{ color: state.color }}>
                <LensIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary={state.pluralLabel}
              />
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

SCStateMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(SCStateMenu);
