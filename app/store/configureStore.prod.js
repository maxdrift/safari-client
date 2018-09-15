// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist';
import createElectronStorage from 'redux-persist-electron-storage';
import { enableBatching } from 'redux-batched-actions';
import rootReducer from '../reducers';

const history = createHashHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

const persistConfig = {
  key: 'root',
  storage: createElectronStorage(),
  blacklist: ['visibilityFilter', 'subjectsModal']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function configureStore(initialState?: counterStateType) {
  const reducer = enableBatching(persistedReducer);
  const store = createStore(reducer, initialState, enhancer);
  const persistor = persistStore(store);

  return { store, persistor };
}

export default { configureStore, history };
