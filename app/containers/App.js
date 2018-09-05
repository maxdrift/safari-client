// @flow
import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

type Props = {
  children: React.Node
};

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red
  }
});

export default class App extends React.Component<Props> {
  props: Props;

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
