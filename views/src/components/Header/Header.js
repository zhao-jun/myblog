import React from  'react';
import { IndexLink,Link } from 'react-router';

import './Header.scss';

export class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this.props.getUserInfo();
    }
    render() {
        const {modBoxAction, loginBoxData, loginSubmit} = this.props;
        return (
            <header>
                <div className="wrap">
                    <h1>my blog</h1>
                    <nav>
                        <ul className="nav">
                            <li className="nav-item"><IndexLink to="/" activeClassName="active"
                                                                className='link'>首页</IndexLink></li>
                            <li className="nav-item"><Link to="/blog" activeClassName="active"
                                                           className='link'>博客</Link></li>
                            <li className="nav-item"><Link to="/page" activeClassName="active"
                                                           className='link'>文章</Link></li>
                            <li className="nav-item"><Link to="/publish" activeClassName="active"
                                                           className='link'>发表文章</Link></li>
                        </ul>
                    </nav>
                    {   !loginBoxData.isLogin ?
                        <div className="profile">
                            <span className="register-icon" onClick={()=>modBoxAction('regShow')}>注册</span>
                            <span className="login-icon" onClick={()=>modBoxAction('loginShow')}>登录</span>
                        </div> :
                        <div className="profile">
                            <span className="register-icon">{loginBoxData.name}</span>
                            <span className="login-icon" onClick={()=>loginSubmit('loginOut')}>退出</span>
                        </div>
                    }
                </div>
            </header>
        )
    }
};

export default Header;
