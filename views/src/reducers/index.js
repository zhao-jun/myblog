import { combineReducers } from 'redux';
import modBoxData from './modBoxData';
import tipsBoxData from './tipsBoxData';
import loginBoxData from './loginBoxData';
import pageBoxData from './pageBoxData';
import articleBoxData from './articleBoxData';
import previewData from './previewData';
import editData from './editData';
import blogBoxData from './blogBoxData';
import blogArticleBoxData from './blogArticleBoxData';
import blogEditData from './blogEditData';
import blogPreviewData from './blogPreviewData';
import chatBoxData from './chatBoxData';
import chatListData from './chatListData';


const rootReducer = combineReducers({
    modBoxData,
    tipsBoxData,
    loginBoxData,
    pageBoxData,
    articleBoxData,
    previewData,
    editData,
    blogBoxData,
    blogArticleBoxData,
    blogEditData,
    blogPreviewData,
    chatBoxData,
    chatListData
});

export default rootReducer;