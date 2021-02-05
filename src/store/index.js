// import { createStore } from 'redux';
// import { createStore } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
// import createSagaMiddleware from 'redux-saga';
import createSagaMiddleware from '../redux-saga';
import reducers from './reducers';
// import rootSaga from './saga';
import rootSaga from './saga/counterSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

window.store = store;

export default store;
