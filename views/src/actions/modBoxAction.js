import {LOGIN_SHOW,REG_SHOW,MODBOX_CLOSE,LOGIN_SUBMIT,REG_SUBMIT} from '../constants/actionTypes';


/*登录注册框
 @type 判断类型
 */
export const modBoxAction = (type, data) => {
    switch (type) {
        case "loginShow":
            return {
                type: LOGIN_SHOW,
                isShow: true
            }
        case "regShow":
            return {
                type: REG_SHOW,
                isShow: true
            }
        case "modBoxClose":
            return {
                type: MODBOX_CLOSE,
                isShow: false
            }
        case "loginSubmit":
            return {
                type: LOGIN_SUBMIT,
                data
            }
        case "regSubmit":
            return {
                type: REG_SUBMIT,
                data
            }
    }
};