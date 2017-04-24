import { fromJS } from 'immutable';
import marked from 'marked';

/*marked.setOptions({
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
});*/
let str= "## markdown演示demo\n### 副标题\n\nBullet list:\n\n* apples\n* oranges\n* pears\n\nNumbered list:\n\n1. apples\n2. oranges\n3. pears\n\nHorizontal rule:\n\n---\n\n```js\nfunction fibonacci(n) {\n    if(n==0 || n == 1)\n        return n;\n    return fibonacci(n-1) + fibonacci(n-2);\n}\n```\n\nText attributes _italic_, *italic*, __bold__, **bold**, `monospace`.\n\n[link](http://www.zandooy.com)";

const previewData=(state={"origin":str,"content":marked(str)},action)=>{
    switch(action.type){
        case "preview":
            return fromJS(state).setIn(["content"],marked(action.data)).setIn(["origin"],action.data).toJS();
        case "title":
            return fromJS(state).setIn(["title"],action.data).toJS();
        case "clear":
            return fromJS(state).clear().toJS();
        default :
            return state;
    }
};

export default previewData;