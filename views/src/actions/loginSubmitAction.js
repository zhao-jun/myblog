/*
export const requestAPI = "http://localhost:3000/";

/!*登录注册
 @type 注册or登录or退出登录
 @data 注册数据or登录数据
 *!/
export const loginSubmit = (type, data) => {
    return (dispatch, getState) => {
        switch (type) {
            case "loginSubmit":
                return submitCallback(dispatch, "login", type, data);
            case "regSubmit":
                return submitCallback(dispatch, "reg", type, data);
            case "loginOut":
                return loginOutSubmit(dispatch);
            default:
                return
        }

    }
};

const submitCallback = (dispatch, params, type, data) => {
    fetch(requestAPI + params, {
        method: "POST",
        credentials: 'include',
        //不必设置，自动添加
/!*        headers: {
            'Content-Type':'multipart/form-data'
        },*!/
        body:data
    }).then(function(res) {
        console.log(res);
        return res.json();
    }).then(function(data) {
        console.log(data);
        return dispatch(modBoxAction(type, data))
    }).then(function(req) {
        let data = req.data;
        if (data.code === 1000) {
            /!*登录成功*!/
            dispatch(modBoxAction("mobBoxClose"));
            if (type == "loginSubmit") {
                return dispatch(loginTop("loginIn", data))
            }
            if (type == "regSubmit") {
                return _alertStore(dispatch, data.messgage)
            }
        } else {
            return _alertStore(dispatch, data.messgage)
        }
    })
    .catch(function(e) {
        console.error(e)
    });
};*/
