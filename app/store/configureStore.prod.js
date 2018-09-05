// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist';
import createElectronStorage from 'redux-persist-electron-storage';
import rootReducer from '../reducers';

const history = createHashHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

const persistConfig = {
  key: 'root',
  storage: createElectronStorage(),
  blacklist: ['visibilityFilter']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function configureStore(initialState?: counterStateType) {
  const store = createStore(persistedReducer, initialState, enhancer);
  const persistor = persistStore(store);

  return { store, persistor };
}

export default { configureStore, history };
