import { fromJS } from 'immutable';
import marked from 'marked';

const blogPreviewData=(state={},action)=>{
    switch(action.type){
        case "blogPreview":
            return fromJS(state).setIn(["content"],marked(action.data)).setIn(["origin"],action.data).toJS();
        case "blogTitle":
            return fromJS(state).setIn(["title"],action.data).toJS();
        case "blogSubtitle":
            return fromJS(state).setIn(["subtitle"],action.data).toJS();
        case "blogCategory":
            return fromJS(state).setIn(["category"],action.data).toJS();
        case "blogClear":
            return fromJS(state).clear().toJS();
        default :
            return state
    }
};

export default blogPreviewData;