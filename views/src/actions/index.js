import {LOGIN_SHOW,REG_SHOW,MODBOX_CLOSE,LOGIN_SUBMIT,REG_SUBMIT} from '../constants/actionTypes';
export const requestAPI = "http://www.zandooy.com/api/";
import { browserHistory } from 'react-router';



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

/*提示
 @type 判断类型
 */
export const tipsBox = (message, type) => {
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
            dispatch(tipsBox(message, "hideTips"));
        }, 1000)
    }
};

/*Store里面执行的提示弹出框
 @dispatch 默认
 @messgage 提示文字
 @fn 提示框消失的回调
 */
export const _alertStore = (dispatch, message, callback) => {
    dispatch(tipsBox(message, "showTips"));
    setTimeout(function() {
        dispatch(tipsBox(message, "hideTips"));
        callback && callback()
    }, 1000)
};


/*左上角登录状态切换
 @type 登录or退出登录
 */
export const loginBox = (type, data) => {
    switch (type) {
        case "loginIn":
            return {
                type: "loginIn",
                data
            }
        case "loginOut":
            return {
                type: "loginOut"
            }
    }
};



/*登录注册
 @type 注册or登录or退出登录
 @data 注册数据or登录数据
 */
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
        /*        headers: {
         'Content-Type':'multipart/form-data'
         },*/
        body:data
    }).then(function(res) {
        return res.json();
    }).then(function(data) {
        if (data.code === 1000) {
            /*登录成功/注册成功*/
            dispatch(modBoxAction("modBoxClose"));
            if (type == "loginSubmit") {
                _alertStore(dispatch,data.message);
                return dispatch(loginBox("loginIn", data));
            }
            if (type == "regSubmit") {
                console.log(data);
                //dispatch要传入
                return _alertStore(dispatch,data.message);
            }
        } else {
            return _alertStore(dispatch,data.message)
        }
    })
    .catch(function(e) {
        console.error(e)
    });
};
const loginOutSubmit = (dispatch) => {
    fetch(requestAPI + "loginOut", {
        credentials: 'include'
    }).then(function(res) {
        return res.json()
    }).then(function(data) {
        console.log(data);
        dispatch(loginBox("loginOut"));
        _alertStore(dispatch, "退出成功");
        browserHistory.push('/');
    }).catch(function(e) {
        console.error(e)
    })
};

/*获取用户登录信息*/
export const getUserInfo = () => {
    return (dispatch) => {
        fetch(requestAPI + "getUserInfo", {
            credentials: 'include'
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.code === 1000) { //已登录
                return dispatch(loginBox("loginIn", data))
            }
            if (data.code === 1001) {
                return dispatch(loginBox("loginOut", data))
            }
        })
        .catch(function(e) {
            console.error(e);
        });
    }
};

/*发布作品请求
 @data 发布作品的数据
 */
export const publishSubmit = (data) => {
    return (dispatch) => {
        fetch(requestAPI+"publish",{
            method: "POST",
            credentials: 'include',//可以带cookie
            body:data
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            if(data.code===1000){
                _alertStore(dispatch,data.message);
                browserHistory.push('/page');
                //清空
                dispatch(preview('clear'));
            }else{
                _alertStore(dispatch,data.message)
            }
        })
        .catch(function(e) {
            console.log("请求失败");
        });
    }
};


/*文章区
 */
export const PageBox = (type, data) => {
    switch (type) {
        case "page":
            return {
                type: "page",
                data
            };
    }
};


/*文章列表请求
 @params 如果有代表文章页码切换
 */
export const getPageData = (params) => {
    console.log(params);
    if(!params){params=''}
    return (dispatch) => {
        fetch(requestAPI + "page"+ params, {
            credentials: 'include'
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return dispatch(PageBox("page", data))
        })
        .catch(function(e) {
            console.error(e);
        });
    }
};


/*文章区
 */
export const articleBox = (type, data) => {
    switch (type) {
        case "article":
            return {
                type: "article",
                data
            };
    }
};
/*文章详情Article
 @params /a/:id 文章id
 */
export const article = function (params) {
    return (dispatch)=>{
        fetch(requestAPI + params,{
            credentials: 'include'
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            return dispatch(articleBox("article", data))
        })
        .catch(function(e) {
            console.error(e);
        });
    }
};

/*增加留言
 @data FormData
 */
export const commentSubmit = function (data) {
    return (dispatch)=>{
        fetch(requestAPI + location.pathname.slice(1) +'/comment',{
            method: "POST",
            credentials: 'include',
            body:data
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if(data.code===1000) {
                _alertStore(dispatch, data.message);
                dispatch(article(location.pathname.slice(1)));
            }
            if(data.code===1009) {
                _alertStore(dispatch, data.message);
            }
        })
        .catch(function(e) {
            console.error(e);
        });
    }
};

/*删除留言
 @param commentId
 */
export const commentDelete = function (param) {
    return (dispatch)=>{
        fetch(requestAPI + location.pathname.slice(1) +'/comment/'+param,{
            method: "DELETE",
            credentials: 'include'
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if(data.code===1000) {
                    _alertStore(dispatch, data.message);
                    dispatch(article(location.pathname.slice(1)));
                }
                if(data.code===1009) {
                    _alertStore(dispatch, data.message);
                }
            })
            .catch(function(e) {
                console.error(e);
            });
    }
};

/*发布文章预览
 @param
 */
export const preview= (type, data) => {
    switch (type) {
        case "preview":
            return {
                type: "preview",
                data
            }
        case "title":
            return {
                type: "title",
                data
            }
        case "clear":
            return {
                type: "clear"
            }
    }
};

/*文章修改
 @param
 */
export const edit= (type, data) => {
    switch (type) {
        case "editPreview":
            return {
                type: "editPreview",
                data
            }
        case "editTitle":
            return {
                type: "editTitle",
                data
            }
        case "edit":
            return {
                type: "edit",
                data
            }
    }
};

/*更新作品请求
 @data 更新作品的数据
 */
export const editSubmit = (data) => {
    return (dispatch) => {
        fetch(requestAPI+location.pathname.slice(1),{
            method: "POST",
            credentials: 'include',//可以带cookie
            body:data
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                if(data.code===1000){
                    _alertStore(dispatch,data.message);
                    browserHistory.push(location.pathname.slice(0,-5));
                }else{
                    _alertStore(dispatch,data.message)
                }
            })
            .catch(function(e) {
                console.log("请求失败");
            });
    }
};

/*删除文章
 @param commentId
 */
export const articleDelete = function () {
    return (dispatch)=>{
        fetch(requestAPI + location.pathname.slice(1),{
            method: "DELETE",
            credentials: 'include'
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if(data.code===1000) {
                    _alertStore(dispatch, data.message);
                    browserHistory.push('/page');
                }
                if(data.code===1009) {
                    _alertStore(dispatch, data.message);
                }
            })
            .catch(function(e) {
                console.error(e);
            });
    }
};









/*发布博客
 @data 
 */
export const createSubmit = (data) => {
    return (dispatch) => {
        fetch(requestAPI+"create",{
            method: "POST",
            credentials: 'include',//可以带cookie
            body:data
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                if(data.code===1000){
                    _alertStore(dispatch,data.message);
                    browserHistory.push('/blog');
                    //清空
                    dispatch(preview('clear'));
                }else{
                    _alertStore(dispatch,data.message)
                }
            })
            .catch(function(e) {
                console.log("请求失败");
            });
    }
};


/*博客区
 */
export const BlogBox = (type, data) => {
    switch (type) {
        case "blog":
            return {
                type: "blog",
                data
            };
    }
};


/*博客列表请求
 @params 如果有代表文章页码切换
 */
export const getBlogData = (params) => {
    console.log(params);
    if(!params){params=''}
    return (dispatch) => {
        fetch(requestAPI + "blog"+ params, {
            credentials: 'include'
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return dispatch(BlogBox("blog", data))
        })
        .catch(function(e) {
            console.error(e);
        });
    }
};


/*文章区
 */
export const blogArticleBox = (type, data) => {
    switch (type) {
        case "blogArticle":
            return {
                type: "blogArticle",
                data
            };
    }
};
/*博客详情Article
 @params /blog/:id 文章id
 */
export const blogArticle = function (params) {
    return (dispatch)=>{
        fetch(requestAPI + params,{
            credentials: 'include'
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                // console.log(data);
                return dispatch(blogArticleBox("blogArticle", data))
            })
            .catch(function(e) {
                console.error(e);
            });
    }
};

/*博客增加留言
 @data FormData
 */
export const blogCommentSubmit = function (data) {
    return (dispatch)=>{
        fetch(requestAPI + location.pathname.slice(1) +'/comment',{
            method: "POST",
            credentials: 'include',
            body:data
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if(data.code===1000) {
                    _alertStore(dispatch, data.message);
                    dispatch(blogArticle(location.pathname.slice(1)));
                }
                if(data.code===1009) {
                    _alertStore(dispatch, data.message);
                }
            })
            .catch(function(e) {
                console.error(e);
            });
    }
};

/*博客删除留言
 @param commentId
 */
export const blogCommentDelete = function (param) {
    return (dispatch)=>{
        fetch(requestAPI + location.pathname.slice(1) +'/comment/'+param,{
            method: "DELETE",
            credentials: 'include'
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if(data.code===1000) {
                    _alertStore(dispatch, data.message);
                    dispatch(blogArticle(location.pathname.slice(1)));
                }
                if(data.code===1009) {
                    _alertStore(dispatch, data.message);
                }
            })
            .catch(function(e) {
                console.error(e);
            });
    }
};

/*博客修改
 @param
 */
export const blogEdit= (type, data) => {
    switch (type) {
        case "blogEditPreview":
            return {
                type: "blogEditPreview",
                data
            }
        case "blogEditTitle":
            return {
                type: "blogEditTitle",
                data
            }
        case "blogEditSubtitle":
            return {
                type: "blogSubtitle",
                data
            }
        case "blogEditCategory":
            return {
                type: "blogEditCategory",
                data
            }
        case "blogEdit":
            return {
                type: "blogEdit",
                data
            }
    }
};

/*更新博客请求
 @data 更新作品的数据
 */
export const blogEditSubmit = (data) => {
    return (dispatch) => {
        fetch(requestAPI+location.pathname.slice(1),{
            method: "POST",
            credentials: 'include',//可以带cookie
            body:data
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                if(data.code===1000){
                    _alertStore(dispatch,data.message);
                    browserHistory.push(location.pathname.slice(0,-5));
                }else{
                    _alertStore(dispatch,data.message)
                }
            })
            .catch(function(e) {
                console.log("请求失败");
            });
    }
};

/*发布博客预览
 @param
 */
export const blogPreview= (type, data) => {
    switch (type) {
        case "blogPreview":
            return {
                type: "blogPreview",
                data
            }
        case "blogTitle":
            return {
                type: "blogTitle",
                data
            }
        case "blogSubtitle":
            return {
                type: "blogSubtitle",
                data
            }
        case "blogCategory":
            return {
                type: "blogCategory",
                data
            }
        case "blogClear":
            return {
                type: "blogClear"
            }
    }
};

/*删除博客
 @param commentId
 */
export const blogArticleDelete = function () {
    return (dispatch)=>{
        fetch(requestAPI + location.pathname.slice(1),{
            method: "DELETE",
            credentials: 'include'
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if(data.code===1000) {
                    _alertStore(dispatch, data.message);
                    browserHistory.push('/blog');
                }
                if(data.code===1009) {
                    _alertStore(dispatch, data.message);
                }
            })
            .catch(function(e) {
                console.error(e);
            });
    }
};


/* ==============
    聊天
 =============== */


/*聊天信息
 @type
 */
export const chatBox = (type, data) => {
    switch (type) {
        case "sendMessage":
            return {
                type: "sendMessage",
                data
            }
        case "chatClear":
            return {
                type: "chatClear"
            }
    }
};

/*聊天用户信息
 @type
 */
export const chatList = (type, data) => {
    switch (type) {
        case "chatList":
            return {
                type: "chatList",
                data
            }
    }
};

/* ==============
 动画
 =============== */
/*过场动画
 @type
 */
export const loadingBar = (type, data) => {
    switch (type) {
        case "loadingBar":
        {
            return {
                type: "loadingBar",
                data
            }
        }
    }
};

