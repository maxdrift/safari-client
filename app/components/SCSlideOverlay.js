// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { slideStates } from '../actions/slides';
import SCCorner from './SCCorner';
import SCSlideHeader from './SCSlideHeader';
import SCSlideFooter from './SCSlideFooter';
import { subjects } from '../reducers/subjects';

const styles = {};

const SCSlideOverlay = ({ photo, toggleSlideState, openSubjectsModal }) => (
  <div className="slide-overlay">
    <SCSlideHeader>{photo.alt}</SCSlideHeader>
    <SCCorner
      color={slideStates[photo.state].color}
      altText={slideStates[photo.state].label}
      onClick={() => toggleSlideState(photo.id)}
    />
    <SCSlideFooter
      onLabelClick={() => openSubjectsModal([photo.id], photo.subjectid)}
    >
      {photo.subjectid > 0
        ? subjects[photo.subjectid].name
        : 'Seleziona una specie'}
    </SCSlideFooter>
    <style>{'.slide-overlay{display:none}'}</style>
  </div>
);

SCSlideOverlay.propTypes = {
  photo: PropTypes.shape({
    src: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  }).isRequired,
  toggleSlideState: PropTypes.func.isRequired,
  openSubjectsModal: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(SCSlideOverlay);
