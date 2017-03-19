import { combineReducers } from 'redux';
import modBoxData from './modBoxData';
import tipsBoxData from './tipsBoxData';
import loginBoxData from './loginBoxData';

const rootReducer = combineReducers({
    modBoxData,
    tipsBoxData,
    loginBoxData
});

export default rootReducer;