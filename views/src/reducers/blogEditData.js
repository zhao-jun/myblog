import { fromJS } from 'immutable';
import marked from 'marked';

const blogEditData=(state={},action)=>{
    switch(action.type){
        case "blogEditPreview":
            return fromJS(state).setIn(["content"],marked(action.data)).setIn(["origin"],action.data).toJS();
        case "blogEditTitle":
            return fromJS(state).setIn(["title"],action.data).toJS();
        case "blogEditSubtitle":
            return fromJS(state).setIn(["subtitle"],action.data).toJS();
        case "blogEditCategory":
            return fromJS(state).setIn(["category"],action.data).toJS();
        case "blogEdit":
            return fromJS(state).merge(action.data).setIn(["content"],marked(action.data.content)).setIn(["origin"],action.data.content).toJS();
        default :
            return state
    }
};

export default blogEditData;