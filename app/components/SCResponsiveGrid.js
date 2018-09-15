// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddToPhotos from '@material-ui/icons/AddToPhotos';
import { showOpenDialog } from '../dialogs';
import SCVisibleSlidesList from '../containers/SCVisibleSlidesList';

const styles = theme => ({
  root: {
    marginBottom: 80
  },
  button: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

const handleSlidesSelection = callback => showOpenDialog(callback);

class SCResponsiveGrid extends Component {
  constructor(props) {
    super(props);
    this.state = { width: -1 };
  }

  render() {
    const { classes, onFilesSelected, selectedSlidesCount } = this.props;
    const { width } = this.state;
    return (
      <Measure
        bounds
        onResize={contentRect =>
          this.setState({ width: contentRect.bounds.width })
        }
      >
        {({ measureRef }) => {
          if (width < 1) {
            return <div ref={measureRef} />;
          }
          let columns = 1;
          if (width >= 480) {
            columns = 2;
          }
          if (width >= 1024) {
            columns = 3;
          }
          if (width >= 1824) {
            columns = 4;
          }
          return (
            <div ref={measureRef} className={classes.root}>
              <SCVisibleSlidesList columns={columns} />
              {selectedSlidesCount === 0 && (
                <Button
                  variant="extendedFab"
                  className={classes.button}
                  color="secondary"
                  aria-label="Load slides"
                  onClick={() => handleSlidesSelection(onFilesSelected)}
                >
                  <AddToPhotos className={classes.extendedIcon} />
                  Carica immagini
                </Button>
              )}
            </div>
          );
        }}
      </Measure>
    );
  }
}

SCResponsiveGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedSlidesCount: PropTypes.number.isRequired,
  onFilesSelected: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(SCResponsiveGrid);
