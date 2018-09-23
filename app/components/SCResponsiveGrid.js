// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure';
import { withStyles } from '@material-ui/core/styles';
import SCLoadSlidesButton from './SCLoadSlidesButton';
import SCVisibleSlidesList from '../containers/SCVisibleSlidesList';

const styles = () => ({
  root: {
    marginTop: 114,
    marginBottom: 80
  }
});

class SCResponsiveGrid extends Component {
  state = {
    width: -1
  };

  handleResize = contentRect => {
    this.setState({ width: contentRect.bounds.width });
  };

  render() {
    const { classes, onFilesSelected, selectedSlidesCount } = this.props;
    const { width } = this.state;
    return (
      <Measure bounds onResize={this.handleResize}>
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
                <SCLoadSlidesButton
                  text="Carica immagini"
                  onClick={onFilesSelected}
                />
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
