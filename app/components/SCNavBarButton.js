// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit / 2
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

const SCNavBarButton = ({
  classes,
  disabled,
  text,
  iconComponent,
  iconOnly,
  onClick
}) =>
  iconOnly ? (
    <IconButton
      disabled={disabled}
      size="medium"
      color="inherit"
      title={text}
      aria-label={text}
      className={classes.button}
      onClick={onClick}
    >
      {iconComponent}
    </IconButton>
  ) : (
    <Button
      disabled={disabled}
      size="medium"
      color="inherit"
      className={classes.button}
      onClick={onClick}
    >
      {iconComponent &&
        React.cloneElement(iconComponent, {
          size: 'small',
          className: classes.extendedIcon
        })}
      {text}
    </Button>
  );

SCNavBarButton.defaultProps = {
  disabled: false,
  text: null,
  iconComponent: null,
  iconOnly: false
};

SCNavBarButton.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  iconComponent: PropTypes.node,
  iconOnly: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(SCNavBarButton);
