import { fromJS } from 'immutable';

const pageBoxData = (state = {'page':[]}, action) => {
    switch (action.type) {
        case 'page':
            return fromJS(state).merge(action.data).toJS();
            // Object.assign({},state,action.data);
        default:
            return state
    }
};

export default pageBoxData;