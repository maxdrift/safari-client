// @flow
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer } from 'redux-persist';
import createElectronStorage from 'redux-persist-electron-storage';
import { enableBatching } from 'redux-batched-actions';
import createRootReducer from '../reducers';

export const history = createBrowserHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);

const persistConfig = {
  key: 'root',
  storage: createElectronStorage(),
  blacklist: ['visibilityFilter', 'subjectsModal']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(initialState) {
  const reducer = enableBatching(persistedReducer);

  const store = createStore(
    reducer, // root reducer with router state
    initialState,
    compose(
      applyMiddleware(
        thunk,
        router // for dispatching history actions
        // ... other middlewares ...
      )
    )
  );

  const persistor = persistStore(store);
  // persistor.purge();

  return { store, persistor };
}
