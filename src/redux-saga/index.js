function createSagaMiddle() {

  function createChannel() {
    let observer = {};
    function subscribe(actionType, callback) {
      observer[actionType] = observer[actionType] || [];
      observer[actionType].push(callback)
    }
    function publish(action) {
      if (observer[action.type]) {
        // 要先删再绑定, 不能先绑定再删
        // 这里一定要先取出来, 再删除, 再绑定
        // 如果直接执行, 再删除, 会导致无法执行后续内容
        let nexts = observer[action.type]
        delete observer[action.type];
        nexts.forEach(next => next(action))
        // next(action)
      }
    }
    return {
      subscribe,
      publish,
    };
  }
  let channel = createChannel()

  function sagaMiddle({ dispatch, getState }) {
    function run(generator) {
      let it = generator();
      function next(action) {
        // value = {type: 'TAKE', actionType: actionTypes.ASYNC_INCREMENT}
        // value = {type: 'PUT', action: actionTypes.INCREMENT}
        let { value: effect, done } = it.next(action);
        if (!done) {
          switch (effect.type) {
            case 'TAKE': // TAKE, 监听saga, 监听某个动作, 当动作发生的时候执行下一步
              // 对TAKE的actionType进行订阅, 订阅的事件是下一个next
              channel.subscribe(effect.actionType, next)
              break;
            case 'PUT': // PUT, work saga, 执行某个动作
              dispatch(effect.action);
              // 这里是个递归, PUT是一个同步操作
              next();
              break;
            default:
              break;
          }
        }
      }
      next();
    }

    sagaMiddle.run = run;

    return function (next) {
      return function (action) {
        // 通过管道派发一个动作
        channel.publish(action)
        next(action);
      };
    };
  }
  return sagaMiddle;
}

export default createSagaMiddle;
