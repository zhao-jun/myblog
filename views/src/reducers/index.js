import { combineReducers } from 'redux';
import modBoxData from './modBoxData';
import tipsBoxData from './tipsBoxData';
import loginBoxData from './loginBoxData';
import pageBoxData from './pageBoxData';
import articleBoxData from './articleBoxData';
import previewData from './previewData';
import editData from './editData';

const rootReducer = combineReducers({
    modBoxData,
    tipsBoxData,
    loginBoxData,
    pageBoxData,
    articleBoxData,
    previewData,
    editData
});

export default rootReducer;