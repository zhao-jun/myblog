import { fromJS } from 'immutable';

function saveLoginIn(state,name) {
    state = fromJS(state).set('isLogin',true).set('name',name).toJS();
    localStorage.setItem('saveState',JSON.stringify(state));
    return state;
}

function saveLoginOut(state) {
    state = fromJS(state).set('isLogin',false).remove('name').toJS();
    localStorage.setItem('saveState',JSON.stringify(state));
    return state;
}

const loginBoxData = (state= JSON.parse(localStorage.getItem('saveState')) || {isLogin:false},action)=>{
    switch(action.type){
        case "loginIn":
            return saveLoginIn(state,action.data.name);
            // Object.assign({},state,{isLogin:true,name:action.data.name});
        case "loginOut":
            return saveLoginOut(state);
            // Object.assign({},state,{isLogin:false});
        default :
            return state
    }
};

export default loginBoxData;