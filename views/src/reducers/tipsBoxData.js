import { fromJS } from 'immutable';

const tipsBoxData=(state={message:""},action)=>{
    switch(action.type){
        case "showTips":
            return fromJS(state).setIn(['message'],action.message).toJS();
            // Object.assign({},state,{message:action.message});
        case "hideTips":
            return fromJS(state).setIn(['message'],action.message).toJS();
            // Object.assign({},state,{message:action.message});
        default :
            return state
    }
};

export default tipsBoxData;
