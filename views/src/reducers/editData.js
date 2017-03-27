import { fromJS } from 'immutable';
import marked from 'marked';

const editData=(state={},action)=>{
    switch(action.type){
        case "editPreview":
            return fromJS(state).setIn(["content"],marked(action.data)).setIn(["origin"],action.data).toJS();
        case "editTitle":
            return fromJS(state).setIn(["title"],action.data).toJS();
        case "edit":
            return fromJS(state).setIn(["title"],action.data.title).setIn(["content"],marked(action.data.content)).setIn(["origin"],action.data.content).toJS();
        default :
            return state
    }
};

export default editData;