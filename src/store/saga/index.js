import { all } from 'redux-saga/effects';

import counterSaga from './counterSaga';

function* rootSaga() {
  yield all([counterSaga()]);
}

export default rootSaga;
