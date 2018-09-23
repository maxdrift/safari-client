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
  photo,
  toggleSlideState,
  openSubjectsModal
}) => (
  <div className="slide-overlay">
    <SCSlideHeader>
      <Typography
        variant="subheading"
        color="inherit"
        align="center"
        className={classes.title}
      >
        {photo.alt}
      </Typography>
    </SCSlideHeader>
    <SCCorner
      color={slideStates[photo.state].color}
      altText={slideStates[photo.state].label}
      onClick={() => toggleSlideState(photo.id)}
    />
    <SCSlideFooter>
      <Button
        className={classes.label}
        onClick={() => openSubjectsModal([photo.id], photo.subjectid)}
      >
        {photo.subjectid > 0
          ? subjects[photo.subjectid].name
          : 'Seleziona una specie'}
      </Button>
    </SCSlideFooter>
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
  openSubjectsModal: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(SCSlideOverlay);
