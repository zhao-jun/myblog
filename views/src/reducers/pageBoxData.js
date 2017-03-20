const PageBoxData = (state = {'page':[]}, action) => {
    switch (action.type) {
        case 'page':
            return Object.assign({},state,action.data);
        default:
            return state
    }
};

export default PageBoxData;