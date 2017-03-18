import { combineReducers } from 'redux';
import modBoxData from './modBoxData';
import tipsBoxData from './tipsBoxData';

const rootReducer = combineReducers({
    modBoxData,
    tipsBoxData
});

export default rootReducer;