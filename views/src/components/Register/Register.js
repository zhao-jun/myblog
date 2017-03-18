import React from  'react';
import './Register.scss';

export class Register extends React.Component{
    constructor(props) {
        super(props);
    }
    submitReg(){
        const {_alert, loginSubmit} = this.props;
        if(this.userName.value.length<2){
            _alert("用户名长度为2-10位数");
            return;
        }
        if((/\s/ig).test(this.userName.value)){
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
        if(this.password.value!==this.repassword.value){
            _alert("两次输入的密码不一致");
            return
        }
        let data ={
            "userName":this.userName.value,
            "password":this.password.value
        };
        loginSubmit("regSubmit",data)
    }
    render(){
        const {modBoxAction}=this.props;
        return (
            <form className="register" onClick={(e)=>{e.stopPropagation()}}>
                <i className="close" onClick={()=>{modBoxAction("modBoxClose")}}>x</i>
                <div className="title">欢迎注册</div>
                <div className="item">
                    <label htmlFor="userName" className="name">用户名：</label>
                    <input type="text" name="userName" id="userName" className="input" ref={el=>{this.userName=el}} maxLength="10" placeholder="长度为2-10"/>
                </div>
                <div className="item">
                    <label htmlFor="password" className="name">密码：</label>
                    <input type="password" name="password" id="password" className="input" ref={el=>{this.password=el}} maxLength="16"  placeholder="长度为6-16"/>
                </div>
                <div className="item">
                    <label htmlFor="repassword" className="name">确认密码：</label>
                    <input type="password" name="repassword" id="repassword" className="input" maxLength="16" ref={el=>{this.repassword=el}}  placeholder="长度为6-16"/>
                </div>
                <div className="btn" onClick={()=>{this.submitReg()}}>注册</div>
            </form>
        )
    }
}

export default Register;