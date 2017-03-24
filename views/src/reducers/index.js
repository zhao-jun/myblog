import { combineReducers } from 'redux';
import modBoxData from './modBoxData';
import tipsBoxData from './tipsBoxData';
import loginBoxData from './loginBoxData';
import pageBoxData from './pageBoxData';
import articleBoxData from './articleBoxData';

const rootReducer = combineReducers({
    modBoxData,
    tipsBoxData,
    loginBoxData,
    pageBoxData,
    articleBoxData
});

export default rootReducer;