import {LOGIN_SHOW,REG_SHOW,MODBOX_CLOSE,LOGIN_SUBMIT,REG_SUBMIT} from '../constants/actionTypes';
import { fromJS } from 'immutable';

/*登录注册框显示隐藏*/
const modBoxData = (state = {isShow:false,data:{},type:REG_SHOW}, action) => {
    switch (action.type) {
        case LOGIN_SHOW:
            return fromJS(state).merge(action).toJS();
            // Object.assign({},state,{isShow:action.isShow,type:action.type});
        case REG_SHOW:
            return fromJS(state).merge(action).toJS();
            // Object.assign({},state,{isShow:action.isShow,type:action.type});
        case LOGIN_SUBMIT:
            return fromJS(state).setIn([data],action.data).toJS();
            // Object.assign({},state,{data:action.data});
        case REG_SUBMIT:
            return fromJS(state).setIn([data],action.data).toJS();
            // Object.assign({},state,{data:action.data});
        case MODBOX_CLOSE:
            return fromJS(state).setIn(['isShow'],false).toJS();
            // Object.assign({},state,{isShow:false});
        default:
            return state
    }
};

export default modBoxData;