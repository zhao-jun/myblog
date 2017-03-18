import React from  'react';
import './Login.scss';

export class Login extends React.Component{
    constructor(props) {
        super(props);
    }
    submitLogin(){
        const {_alert} = this.props;
        if(this.userName.value.length<2){
            _alert("用户名格式不正确");
            return
        }
        if(this.password.value.length<6){
            _alert("密码格式不正确");
            return
        }
        let data="userName="+this.userName.value+"&password="+this.password.value;
        this.props.actions.loginSubmit("loginSubmit",data)
    }
    render(){
        const {modBoxAction} = this.props;
        return(
            <form className="login" onClick={(e)=>{e.stopPropagation()}}>
                <i className="close" onClick={()=>{modBoxAction("modBoxClose")}}>x</i>
                <div className="title">欢迎登录</div>
                <div className="item">
                    <label htmlFor="userName" className="name">用户名</label>
                    <input type="text" name="userName" id="userName" className="input" ref={el=>{this.userName=el}} maxLength="10" placeholder="用户名" />
                </div>
                <div className="item">
                    <label htmlFor="password" className="name">密码</label>
                    <input type="password" name="password" id="password" className="input" ref={el=>{this.password=el}} maxLength="16" placeholder="密码" />
                </div>
                <div className="btn" onClick={()=>{this.submitLogin()}}>登录</div>
            </form>
        )
    }
}

export default Login;