import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware, routerActions } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import createElectronStorage from 'redux-persist-electron-storage';
import { enableBatching } from 'redux-batched-actions';
import createRootReducer from '../reducers';

export const history = createBrowserHistory();
const rootReducer = createRootReducer(history);

const persistConfig = {
  key: 'root',
  storage: createElectronStorage(),
  blacklist: ['visibilityFilter', 'subjectsModal']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function(initialState) {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    ...routerActions
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
        actionCreators
      })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const reducer = enableBatching(persistedReducer);

  const store = createStore(
    reducer, // root reducer with router state
    initialState,
    enhancer
  );

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      () => store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  const persistor = persistStore(store);
  // persistor.purge();

  return { store, persistor };
}
