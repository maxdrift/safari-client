// @flow
import { remote } from 'electron';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fs from 'fs';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import { addSlidesAsync } from '../actions/slides';

const ga = remote.getGlobal('ga');

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: blue,
    secondary: red
  }
});

class App extends Component {
  props: Props;

  componentDidMount() {
    this.props.reloadSlides(this.props.slidesNeedingReload);
  }

  render() {
    return (
      <div>
        <CssBaseline>
          <MuiThemeProvider theme={theme}>
            {this.props.children}
          </MuiThemeProvider>
        </CssBaseline>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  reloadSlides: PropTypes.func.isRequired,
  slidesNeedingReload: PropTypes.arrayOf(PropTypes.string).isRequired
};

const hasMissingSrcFile = srcSet =>
  srcSet.some(src => !fs.existsSync(src.split(/( \d+w$)/)[0]));

const slidesNeedingReload = slides =>
  slides.reduce((acc, slide) => {
    if (fs.existsSync(slide.src) && hasMissingSrcFile(slide.srcSet)) {
      ga.event('Slides', 'missing thumbnail').send();
      console.log('Found broken slide:', slide.src);
      return [...acc, slide.src];
    }
    return acc;
  }, []);

const mapStateToProps = state => ({
  slidesNeedingReload: slidesNeedingReload(state.slides)
});

const mapDispatchToProps = dispatch => ({
  reloadSlides: paths => dispatch(addSlidesAsync(paths))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
