import { fromJS } from 'immutable';
import marked from 'marked';

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