import { fromJS } from 'immutable';
import marked from 'marked';
import hljs from 'highlight.js';

marked.setOptions({
    renderer : new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: true,
    sanitize: true,
    smartLists: true,
    smartypants: true,
    langPrefix: 'hljs ',
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});

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