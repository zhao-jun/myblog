import React from  'react';
import { IndexLink,Link } from 'react-router';

import './Header.scss';
import avatar from '../../styles/avatar.png';
import {socket} from '../../containers/Chat/Chat';

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animationShow:null,
            userHide:null,
            navBtnOne:'nav-Btn-line',
            navBtnTwo:'nav-Btn-line',
            navBtnThree:'nav-Btn-line'
        }
    }
    componentWillMount(){
        this.props.getUserInfo();
    }
    isShow(){
        this.setState({
            animationShow : this.state.animationShow == "activeShow" ? "activeHide" : "activeShow",
            userHide : this.state.userHide ? null : "userHide",
            navBtnOne:this.state.userHide ?'nav-Btn-line':"nav-Btn-line nav-Btn-one",
            navBtnTwo:this.state.userHide ?'nav-Btn-line':"nav-Btn-line nav-Btn-two",
            navBtnThree:this.state.userHide ?'nav-Btn-line':"nav-Btn-line nav-Btn-three"
        })
        this.nav.style.height = this.nav.style.height =='410px'? '0':'410px';
        this.cover.style.display=this.cover.style.display=='block'?'none':'block';
    }
    isHide(){
        this.setState({
            animationShow :  "activeHide" ,
            userHide : null,
            navBtnOne:'nav-Btn-line',
            navBtnTwo:'nav-Btn-line',
            navBtnThree:'nav-Btn-line'
        })
        this.cover.style.display='none';
        this.nav.style.height='0';
    }

    alert(){
        const {_alert} = this.props;
        _alert('请先登录');
    }

    render() {
        const {modBoxAction, loginBoxData, loginSubmit,chatBox} = this.props;
        return (
            <header>
                <div className="wrap clearfix">
                    <h1 className={this.state.animationShow}><IndexLink to="/" activeClassName="active" className='link'>blog</IndexLink></h1>
                    <nav>
                        <div className="nav-app">
                            <ul className="nav"  ref={ref=>{this.nav=ref}} onClick={()=>this.isHide()}>
                                <li className="nav-item"><IndexLink to="/" activeClassName="active"
                                                                    className='link'>首页</IndexLink></li>
                                <li className="nav-item"><Link to="/blog" activeClassName="active"
                                                               className='link'>博客</Link></li>
                                <li className="nav-item"><Link to="/page" activeClassName="active"
                                                               className='link'>文章</Link></li>
                                <li className="nav-item"><Link to="/publish" activeClassName="active"
                                                               className='link'>发表</Link></li>
                                {
                                    loginBoxData.name == 'admin' ?
                                        <li className="nav-item"><Link to="/create" activeClassName="active"
                                                                       className='link'>发表Blog</Link></li>:
                                        null
                                }
                                {
                                    loginBoxData.isLogin ?
                                        <li className="nav-item"><Link to="/chat" activeClassName="active"
                                                                       className='link'>聊天</Link></li>
                                        :
                                        <li className="nav-item"><Link activeClassName="active" onClick={()=>this.alert()}
                                                                       className='link'>聊天</Link></li>
                                }


                                <li className="nav-item"><Link to="/other" activeClassName="active"
                                                               className='link'>其他</Link></li>
                                <li className="nav-item"><Link to="/about" activeClassName="active"
                                                               className='link'>关于</Link></li>

                                {
                                    !loginBoxData.isLogin ?
                                        <li className="nav-item nav-item-only clearfix">
                                            <span className="link link-item-left" onClick={()=>modBoxAction('regShow')}>注册</span>
                                            <span className="link link-item-right" onClick={()=>modBoxAction('loginShow')}>登录</span>                                        
                                        </li>
                                        :
                                        <li className="nav-item nav-item-only">
                                            <span className="link" onClick={()=>loginSubmit('loginOut')}>退出</span>
                                        </li>
                                }
                            </ul>
                            <div className="nav-cover"  ref={ref=>{this.cover=ref}} onClick={()=>this.isHide()}></div>
                        </div>
                    </nav>
                    <div className='icon-category' onClick={()=>this.isShow()}>
                        <span className={this.state.navBtnOne}></span>
                        <span className={this.state.navBtnTwo}></span>
                        <span className={this.state.navBtnThree}></span>
                    </div>



                    <div className={this.state.userHide}>
                        {   !loginBoxData.isLogin ?
                            <div className="profile">
                                <span className="register-icon" onClick={()=>modBoxAction('regShow')}>注册</span>
                                <span className="login-icon" onClick={()=>modBoxAction('loginShow')}>登录</span>
                            </div> :
                            <div className="avatar">
                                <div className="user">
                                    <img className="photo" src={avatar} />
                                    <span className="user-name">{loginBoxData.name}</span>
                                </div>
                                <ul className="menu">
                                    <li className="menuItem">
                                        <span className="login-icon">功能待开通</span>
                                    </li>
                                    <li className="menuItem">
                                        <span className="login-icon" onClick={()=>{loginSubmit('loginOut');chatBox('chatClear');if(socket){socket.emit('changeUser');}}}>退出</span>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </header>
        )
    }
};

export default Header;
