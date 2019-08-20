// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { slideStates } from '../actions/slides';
import SCCorner from './SCCorner';
import SCSlideHeader from './SCSlideHeader';
import SCSlideFooter from './SCSlideFooter';
import { subjects } from '../reducers/subjects';

const styles = theme => ({
  title: {
    color: theme.palette.common.white
  },
  label: {
    color: theme.palette.common.white
  }
});

const SCSlideOverlay = ({
  classes,
  photoId,
  photoAlt,
  photoState,
  photoSubjectId,
  toggleSlideState,
  openSubjectsModal
}) => (
  <div className="slide-overlay">
    <SCSlideHeader>
      <Typography
        variant="subtitle1"
        color="inherit"
        align="center"
        className={classes.title}
      >
        {photoAlt}
      </Typography>
    </SCSlideHeader>
    <SCCorner
      color={slideStates[photoState].color}
      altText={slideStates[photoState].label}
      onClick={() => toggleSlideState(photoId)}
    />
    <SCSlideFooter>
      <Button
        className={classes.label}
        onClick={() => openSubjectsModal([photoId], photoSubjectId)}
      >
        {photoSubjectId > 0
          ? subjects[photoSubjectId].name
          : 'Seleziona una specie'}
      </Button>
    </SCSlideFooter>
    <style>{'.slide-overlay{display:none}'}</style>
  </div>
);

SCSlideOverlay.propTypes = {
  classes: PropTypes.object.isRequired,
  photoId: PropTypes.string.isRequired,
  photoAlt: PropTypes.string.isRequired,
  photoState: PropTypes.number.isRequired,
  photoSubjectId: PropTypes.number.isRequired,
  toggleSlideState: PropTypes.func.isRequired,
  openSubjectsModal: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(SCSlideOverlay);
