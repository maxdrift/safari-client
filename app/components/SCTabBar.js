// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  badge: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2
  }
});

const SCTabBar = ({ classes, tabsData, currentFilter, onChange }) => (
  <div className={classes.root}>
    <Tabs value={currentFilter} onChange={onChange} centered>
      {tabsData.map(({ label, filter, counter }) => (
        <Tab
          key={filter}
          value={filter}
          disabled={counter === 0}
          label={
            <Badge
              className={classes.badge}
              color="secondary"
              badgeContent={counter}
            >
              {label}
            </Badge>
          }
        />
      ))}
    </Tabs>
  </div>
);

SCTabBar.propTypes = {
  classes: PropTypes.object.isRequired,
  tabsData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      filter: PropTypes.string,
      counter: PropTypes.number
    })
  ).isRequired,
  currentFilter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(SCTabBar);
