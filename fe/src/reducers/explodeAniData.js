import { fromJS } from 'immutable';

const explodeAniData=(state={'xs':[],'ys':[],'zs':[],"show":false,"reset":true},action)=>{
    switch(action.type){
        case "explodeAni":
            return fromJS(state).merge(action.data).toJS();
        case "explodeShow":
            return fromJS(state).setIn(["show"],action.data).toJS();
        case "explodeReset":
            return fromJS(state).setIn(["show"],false).setIn(["reset"],action.data).toJS();
        default :
            return state
    }
};

export default explodeAniData;