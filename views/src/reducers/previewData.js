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

const previewData=(state={},action)=>{
    switch(action.type){
        case "preview":
            return fromJS(state).setIn(["content"],marked(action.data)).setIn(["origin"],action.data).toJS();
        case "title":
            return fromJS(state).setIn(["title"],action.data).toJS();
        case "clear":
            return fromJS(state).clear().toJS();
        default :
            return state
    }
};

export default previewData;