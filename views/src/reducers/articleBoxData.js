import { fromJS } from 'immutable';
import marked from 'marked';

const articleBoxData = (state = {article:{author:{}},comments:[]}, action) => {
    switch (action.type) {
        case 'article':
            return fromJS(state).merge(action.data).setIn(['article','contentMarked'],marked(action.data.article.content)).toJS();
            // Object.assign({},state,action.data);
        default:
            return state
    }
};

export default articleBoxData;