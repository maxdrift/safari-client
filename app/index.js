import { remote } from 'electron';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import unhandled from 'electron-unhandled';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

const ga = remote.getGlobal('ga');

unhandled({
  logger: err => {
    ga.exception(err.toString(), true).send();
    console.error('Unhandled error:', err);
  }
});

const { store, persistor } = configureStore();

render(
  <AppContainer>
    <Root store={store} persistor={persistor} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} persistor={persistor} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
