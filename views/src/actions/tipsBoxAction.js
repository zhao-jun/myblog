/*提示
 @type 判断类型
 */
const tipsBox = (message, type) => {
    switch (type) {
        case "showTips":
            return {
                type: "showTips",
                message
            }
        case "hideTips":
            return {
                type: "hideTips",
                message: ""
            }
        default:
            return {
                type: "showTips",
                message
            }
    }
};
/*component里面执行的提示弹出框
 @messgage 提示文字
 */
export const _alert = (message) => {
    return (dispatch, getState) => {
        dispatch(tipsBox(message, "showTips"));
        setTimeout(function() {
            dispatch(tipsBox(message, "hideTips"))
        }, 1000)
    }
};