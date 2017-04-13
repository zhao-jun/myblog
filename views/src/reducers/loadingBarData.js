import { fromJS } from 'immutable';

const loadingBarData = (state = {"display":true}, action) => {
    switch (action.type) {
        case 'loadingBar':
            return fromJS(state).setIn(["display"],action.data).toJS();
        default:
            return state
    }
};

export default loadingBarData;