const tipsBoxData=(state={message:""},action)=>{
    switch(action.type){
        case "showTips":
            return Object.assign({},state,{message:action.message});
        case "hideTips":
            return Object.assign({},state,{message:action.message});
        default :
            return state
    }
};

export default tipsBoxData;
