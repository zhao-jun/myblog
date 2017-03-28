import { fromJS } from 'immutable';
import marked from 'marked';

const blogArticleBoxData = (state = {article:{},comments:[]}, action) => {
    switch (action.type) {
        case 'blogArticle':
            return fromJS(state).merge(action.data).setIn(['article','contentMarked'],marked(action.data.article.content)).toJS();
        // Object.assign({},state,action.data);
        default:
            return state
    }
};

export default blogArticleBoxData;