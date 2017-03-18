import React from  'react';
import { IndexLink,Link } from 'react-router';

import './Header.scss';

const Header = ({modBoxAction}) => (
    <header>
        <div className="wrap">
            <h1>my blog</h1>
            <nav>
                <ul className="nav">
                    <li className = "nav-item"><IndexLink to="/" activeClassName="active" className = 'link'>首页</IndexLink></li>
                    <li className = "nav-item"><Link to="/blog" activeClassName="active" className = 'link'>博客</Link></li>
                    <li className = "nav-item"><Link to="/page" activeClassName="active" className = 'link'>文章</Link></li>
                    <li className = "nav-item"><Link to="/post" activeClassName="active" className = 'link'>发表文章</Link></li>
                </ul>
            </nav>
            <div className="profile">
                <span className="register-icon" onClick={()=>modBoxAction('regShow')}>注册</span>
                <span className="login-icon" onClick={()=>modBoxAction('loginShow')}>登录</span>
            </div>
        </div>
    </header>
);

export default Header;
