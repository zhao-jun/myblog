import React from  'react';
import './Register.scss';

export class Register extends React.Component{
    constructor(props) {
        super(props);
    }
    componentWillUpdate(){
        this.userName.value="";
        this.password.value="";
        this.repassword.value="";
    }
    submitReg(){
        const {_alert, loginSubmit} = this.props;
        if(this.userName.value.length<2 && this.userName.value.length>10 ){
            _alert("用户名长度为2-10位数");
            return;
        }
        if((/\s/g).test(this.userName.value)){
            _alert("用户名不能有空格");
            return
        }
        if(!/^[a-zA-Z\u4E00-\uFA29][a-zA-Z0-9_\u4E00-\uFA29]+$/g.test(this.userName.value)){
            _alert("用户名英文或中文开头,只能用中文、英文、数字、下划线");
            return
        }
        if((/\s/g).test(this.userName.value)){
            _alert("用户名不能有空格");
            return
        }
        if(this.password.value.length<6){
            _alert("密码长度为6-16位数");
            return
        }
        if((/\s/ig).test(this.password.value)){
            _alert("密码不能有空格");
            return
        }
        if(!/^[0-9a-zA-Z]{6,16}$/g.test(this.password.value)){
            _alert("密码为字母或数字");
            return
        }
        if(this.password.value!==this.repassword.value){
            _alert("两次输入的密码不一致");
            return
        }
        let formData = new FormData(this.register);
        loginSubmit("regSubmit",formData);
    }
    render(){
        const {modBoxAction}=this.props;
        return (
            <form className="register" onClick={(e)=>{e.stopPropagation()}} ref={ref=>{this.register=ref}}>
                <i className="close" onClick={()=>{modBoxAction("modBoxClose")}}>×</i>
                <div className="title">欢迎注册</div>
                <div className="item">
                    <label htmlFor="userName" className="name">用户名</label>
                    <input type="text" name="userName" id="userName" className="input" ref={ref=>{this.userName=ref}} maxLength="10" placeholder="长度为2-10"/>
                </div>
                <div className="item">
                    <label htmlFor="password" className="name">密码</label>
                    <input type="password" name="password" id="password" className="input" ref={ref=>{this.password=ref}} maxLength="16"  placeholder="长度为6-16"/>
                </div>
                <div className="item">
                    <label htmlFor="repassword" className="name">确认密码</label>
                    <input type="password" name="repassword" id="repassword" className="input" maxLength="16" ref={ref=>{this.repassword=ref}}  placeholder="长度为6-16"/>
                </div>
                <div className="submit">
                    <div className="btn" onClick={()=>{this.submitReg()}}>注册</div>
                    <div className="ease"></div>
                </div>
            </form>
        )
    }
}

export default Register;