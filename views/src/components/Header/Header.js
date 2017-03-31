import React from  'react';
import { IndexLink,Link } from 'react-router';

import './Header.scss';
import avatar from '../../styles/avatar.png';

export class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this.props.getUserInfo();
    }
    render() {
        const {modBoxAction, loginBoxData, loginSubmit} = this.props;
        let categoryClass = 'icon-category';
        categoryClass+=' open';
        return (
            <header>
                <div className="wrap clearfix">
                    <h1><IndexLink to="/" activeClassName="active" className='link'>blog</IndexLink></h1>
                    <nav>
                        <div className="nav-app">
                            <i className={categoryClass}></i>
                            <ul className="nav">
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

                            </ul>
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
                                    <span className="login-icon" onClick={()=>loginSubmit('loginOut')}>退出</span>
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
