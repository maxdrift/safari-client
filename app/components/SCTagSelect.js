import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LocalOffer from '@material-ui/icons/LocalOffer';
import ListItemText from '@material-ui/core/ListItemText';
import { subjectsList } from '../reducers/subjects';

const styles = () => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.7)'
  }
});

const ITEM_HEIGHT = 100;

class SCTagSelect extends Component {
  state = {
    anchorEl: null,
    activeSubjects: []
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
      activeSubjects: subjectsList
    });
  };

  handleSelect = subjectid => {
    this.handleClose();
    return this.props.onClick(subjectid);
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      activeSubjects: []
    });
  };

  render() {
    const { anchorEl, activeSubjects } = this.state;
    const { classes, selected } = this.props;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          className={classes.icon}
          aria-label="Add tag"
          aria-owns={open ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <LocalOffer />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 250
            }
          }}
        >
          {activeSubjects.map(subject => (
            <MenuItem
              key={subject.id}
              selected={subject.id === selected}
              onClick={() => this.handleSelect(subject.id)}
            >
              <ListItemText
                primary={subject.name}
                secondary={
                  <span>
                    Coeff: {subject.coeff} – <i>{subject.sci_name}</i>
                  </span>
                }
              />
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

SCTagSelect.defaultProps = {
  selected: -1
};

SCTagSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.number,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(SCTagSelect);
