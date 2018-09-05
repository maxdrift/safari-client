// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { slideStates } from '../actions/slides';
import SCCorner from './SCCorner';
import SCTagSelect from './SCTagSelect';
import { subjects } from '../reducers/subjects';

const styles = {};

const SCSlideOverlay = ({
  classes,
  photo,
  toggleSlideState,
  setSlideSubject
}) => (
  <div className="slide-overlay">
    <SCCorner
      color={slideStates[photo.state].color}
      altText={slideStates[photo.state].label}
      onClick={() => toggleSlideState(photo.id)}
    />
    <GridListTileBar
      className={classes.gridListTileBar}
      title={photo.alt}
      subtitle={photo.subjectid ? subjects[photo.subjectid].name : 'n/d'}
      actionIcon={
        <SCTagSelect
          onClick={subjectid => setSlideSubject(photo.id, subjectid)}
          selected={photo.subjectid}
        />
      }
    />
    <style>{'.slide-overlay{display:none}'}</style>
  </div>
);

SCSlideOverlay.propTypes = {
  classes: PropTypes.object.isRequired,
  photo: PropTypes.shape({
    src: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  }).isRequired,
  toggleSlideState: PropTypes.func.isRequired,
  setSlideSubject: PropTypes.func.isRequired
};

export default withStyles(styles)(SCSlideOverlay);
