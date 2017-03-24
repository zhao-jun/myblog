const articleBoxData = (state = {article:{author:{}},comments:[]}, action) => {
    switch (action.type) {
        case 'article':
            return Object.assign({},state,action.data);
        default:
            return state
    }
};

export default articleBoxData;