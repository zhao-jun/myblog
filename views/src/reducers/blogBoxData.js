import { fromJS } from 'immutable';

const blogBoxData = (state = {'blog':[]}, action) => {
    switch (action.type) {
        case 'blog':
            return fromJS(state).merge(action.data).toJS();
        default:
            return state
    }
};

export default blogBoxData;