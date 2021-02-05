// import { put, take } from 'redux-saga/effects';
// import { put, take } from './../../redux-saga/effect';
import { put, take } from './../../redux-saga/effect';
import * as actionTypes from './../actionTypes';

function* counterSaga() {
  for (let i = 0; i < 3; i++) {
    // 接受async increment的动作
    const action = yield take(actionTypes.ASYNC_INCREMENT);
    console.log('action', action);
    yield put({ type: actionTypes.INCREMENT });
  }
  alert('最多执行3次');
}

export default counterSaga;
