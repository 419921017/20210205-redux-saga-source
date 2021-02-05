import { combineReducers } from 'redux';
import counter from './counter';

let rootReducer = combineReducers({ counter });

export default rootReducer;
