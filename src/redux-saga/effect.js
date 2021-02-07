export function take(actionType) {
  return {
    type: 'TAKE',
    actionType,
  };
}

export function put(action) {
  return {
    type: 'PUT',
    action,
  };
}

export function fork(task) {
  return {
    type: 'FORK',
    task,
  };
}

// takeEvery 相当于单独开了个新的子进程, 单独监听actionType, 当动作发生的时候, 去执行迭代器
export function* takeEvery(actionType, generator) {
  yield fork(function* () {
    while (true) {
      // 监听一次执行一次
      yield take(actionType);
      yield generator();
    }
  });
}

// 接受返回promise的函数
export function call(fn, ...args) {
  return {
    type: 'CALL',
    fn,
    args,
  };
}

const innerDelay = (...args) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(...args);
    }, ...args);
  });

export function delay(...args) {
  return call(innerDelay, ...args);
}

// 执行回调函数的
export function cps(fn, ...args) {
  return {
    type: 'CPS',
    fn,
    args,
  };
}
// 立刻启动所有个 iterator
export function all(fns) {
  return {
    type: 'ALL',
    fns,
  };
}

export function cancel (task) {
  return {
    type: 'CANCEL',
    task
  }
}