import React from  'react';
import { IndexLink,Link } from 'react-router';

import './Header.scss';
import avatar from '../../styles/avatar.png';
import {socket} from '../../containers/Chat/Chat';

export class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this.props.getUserInfo();
    }
    isShow(){
        this.nav.style.height = this.nav.style.height =='300px'? '0':'300px';
        this.cover.style.display=this.cover.style.display=='block'?'none':'block';
    }
    isHide(){
        this.cover.style.display='none';
        this.nav.style.height='0';
    }


    render() {
        const {modBoxAction, loginBoxData, loginSubmit,chatBox} = this.props;
        return (
            <header>
                <div className="wrap clearfix">
                    <h1><IndexLink to="/" activeClassName="active" className='link'>blog</IndexLink></h1>
                    <nav>
                        <i className='icon-category' onClick={()=>this.isShow()}></i>
                        <div className="nav-app">
                            <ul className="nav"  ref={ref=>{this.nav=ref}} onClick={()=>this.isHide()}>
                                <li className="nav-item"><IndexLink to="/" activeClassName="active"
                                                                    className='link'>首页</IndexLink></li>
                                <li className="nav-item"><Link to="/blog" activeClassName="active"
                                                               className='link'>博客</Link></li>
                                <li className="nav-item"><Link to="/page" activeClassName="active"
                                                               className='link'>文章</Link></li>
                                <li className="nav-item"><Link to="/publish" activeClassName="active"
                                                               className='link'>发表文章</Link></li>
                                {
                                    loginBoxData.name == 'admin' ?
                                        <li className="nav-item"><Link to="/create" activeClassName="active"
                                                                       className='link'>发表Blog</Link></li>:
                                        null
                                }
                                <li className="nav-item"><Link to="/chat" activeClassName="active"
                                                               className='link'>聊天室</Link></li>

                                {
                                    !loginBoxData.isLogin ? null:
                                        <li className="nav-item nav-item-only">
                                            <span className="link" onClick={()=>loginSubmit('loginOut')}>退出</span>
                                        </li>
                                }
                            </ul>
                            <div className="nav-cover"  ref={ref=>{this.cover=ref}} onClick={()=>this.isHide()}></div>
                        </div>
                    </nav>



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
                                    <span className="login-icon" onClick={()=>{loginSubmit('loginOut');chatBox('chatClear');socket.emit('changeUser')}}>退出</span>
                                </li>
                            </ul>
                        </div>
                    }
                </div>
            </header>
        )
    }
};

export default Header;
