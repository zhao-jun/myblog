import { combineReducers } from 'redux';
import modBoxData from './modBoxData';
import tipsBoxData from './tipsBoxData';
import loginBoxData from './loginBoxData';
import PageBoxData from './pageBoxData';

const rootReducer = combineReducers({
    modBoxData,
    tipsBoxData,
    loginBoxData,
    PageBoxData
});

export default rootReducer;