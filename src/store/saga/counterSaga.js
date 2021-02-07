// import { put, take } from 'redux-saga/effects';
// import { put, take } from './../../redux-saga/effect';
import { takeEvery, call } from 'redux-saga/effects';
import { put, take } from './../../redux-saga/effect';
import * as actionTypes from './../actionTypes';

const delay = (ms) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });

function* increment(params) {
  // 支持call和promise, 2种使用方式
  // let result = call(delay, 1000);
  let result = delay(1000);
  console.log('result=', result);
  yield put({
    type: actionTypes.INCREMENT,
  });
}

function* counterSaga() {
  for (let i = 0; i < 3; i++) {
    // 接受async increment的动作
    const action = yield take(actionTypes.ASYNC_INCREMENT);
    console.log('action', action);
    // yield put({ type: actionTypes.INCREMENT });
    yield increment();
  }
  alert('最多执行3次');
}

function* takeEveryCounterSaga(params) {
  yield takeEvery(actionTypes.ASYNC_INCREMENT, increment);
}

export default takeEveryCounterSaga;
