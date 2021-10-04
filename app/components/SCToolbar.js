// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import { showSaveDialog } from '../dialogs';
import SCNavBarButton from './SCNavBarButton';

const styles = () => ({
  root: {},
  title: {
    flexGrow: 1
  }
});

const SCToolbar = ({ classes, canExport, exportToCSV }) => (
  <Toolbar className={classes.root}>
    <Typography variant="title" color="inherit" className={classes.title}>
      Safari Client
    </Typography>
    <SCNavBarButton
      text="Esporta CSV"
      onClick={() => exportToCSV((_err, output) => showSaveDialog(output))}
      disabled={!canExport}
      iconComponent={<SaveIcon />}
    />
  </Toolbar>
);

SCToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  canExport: PropTypes.bool.isRequired,
  exportToCSV: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(SCToolbar);
