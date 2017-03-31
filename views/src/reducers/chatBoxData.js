import { fromJS } from 'immutable';

const chatBoxData=(state=[],action)=>{
    switch(action.type){
        case "sendMessage":
            return fromJS(state).push(action.data).toJS();
        case "chatClear":
            return [];
        default :
            return state
    }
};

export default chatBoxData;