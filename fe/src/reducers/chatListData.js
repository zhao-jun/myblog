import { fromJS } from 'immutable';

const chatListData=(state={onlineUsers:[]},action)=>{
    switch(action.type){
        case "chatList":
            return fromJS(state).merge(action.data).toJS();
        default :
            return state
    }
};

export default chatListData;