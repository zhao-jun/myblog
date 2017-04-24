import React from  'react';
import './About.scss';

import Banner from './../Banner/Banner';
import Footer from './../Footer/Footer';


export class About extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillUpdate() {
    }

    render() {
        let AboutBg;
        if(window.innerWidth>1280){
            AboutBg = "http://blogimg-1253575000.cossh.myqcloud.com/AboutBgLarge.png?sign=0ivA5tMFmRrZSaK6a/qhnZlbv65hPTEyNTM1NzUwMDAmaz1BS0lEVHZBQnpaajF0WHc2MGV2QTFjeTR2V3UydVdzeXNEemEmZT0xNDk0ODY4MzQzJnQ9MTQ5MjI3NjM0MyZyPTE0MTM1OTAxNiZmPS9BYm91dEJnTGFyZ2UucG5nJmI9YmxvZ2ltZw==";
        } else if (window.innerWidth>750) {
            // AboutBg = AboutBgMiddle;
            AboutBg = "http://blogimg-1253575000.cossh.myqcloud.com/AboutBgMiddle.png?sign=mm0k7e3Hi13fkWjsCIMCFgT9IA9hPTEyNTM1NzUwMDAmaz1BS0lEVHZBQnpaajF0WHc2MGV2QTFjeTR2V3UydVdzeXNEemEmZT0xNDk0ODY4MzQzJnQ9MTQ5MjI3NjM0MyZyPTE5MDAyODEyNTQmZj0vQWJvdXRCZ01pZGRsZS5wbmcmYj1ibG9naW1n";
        } else if (window.innerWidth>450){
            AboutBg = "http://blogimg-1253575000.cossh.myqcloud.com/AboutBgSmall.png?sign=jZHaK99+UE9n9ZdTAZl+JoAN0ylhPTEyNTM1NzUwMDAmaz1BS0lEVHZBQnpaajF0WHc2MGV2QTFjeTR2V3UydVdzeXNEemEmZT0xNDk0ODY4MzQzJnQ9MTQ5MjI3NjM0MyZyPTg2MzA4MDczNiZmPS9BYm91dEJnU21hbGwucG5nJmI9YmxvZ2ltZw==";
        }else {
            AboutBg = "http://blogimg-1253575000.cossh.myqcloud.com/AboutBgApp.png?sign=t4q3MBVLZAGHe/rZgyGjx/1Q/tBhPTEyNTM1NzUwMDAmaz1BS0lEVHZBQnpaajF0WHc2MGV2QTFjeTR2V3UydVdzeXNEemEmZT0xNDk0ODY4MzQzJnQ9MTQ5MjI3NjM0MyZyPTEyNTMwMDkxNTEmZj0vQWJvdXRCZ0FwcC5wbmcmYj1ibG9naW1n";
        }
        return (
            <div>
                <div className="about">
                    <figure>
                        <img className="aboutBg" src={AboutBg}></img>
                        <figcaption>
                            <div className="aboutWrap">
                                <h2>关于</h2>
                                <div className="aboutContent">
                                    <h3>网站内容</h3>
                                    <ul>
                                        <li><span className="describe">更新技术文章、教程和日志</span></li>
                                        <li><span className="describe">尝试新技术改版</span></li>
                                    </ul>
                                    <h3>联系方式</h3>
                                    <ul>
                                        <li className="item"><a className="github" href="http://github.com/zhao-jun"/>zhao-jun
                                        </li>
                                        <li className="item"><a className="mail"/>j_z@foxmail.com</li>
                                    </ul>
                                    <h3>网站架构</h3>
                                    <ul>
                                        <li><span className="describe">前端：React Redux React-Router</span></li>
                                        <li><span className="describe">后端：Express MongoDB</span></li>
                                    </ul>
                                </div>
                            </div>
                        </figcaption>
                    </figure>
                </div>
                <Footer />
            </div>
        )
    }
}

/*const About = () => (
    <div>
        <div className="about">
            <figure>
                <img className="aboutBg" src={AboutBg} style={{height:window.innerHeight}}></img>
                <figcaption>
                    <div className="aboutWrap">
                        <h3>关于网站</h3>
                        <ul>
                            <li>主要更新技术文章、教程和日志</li>
                            <li>不断用些新技术改版</li>
                        </ul>
                        <h3>联系方式</h3>
                        <ul>
                            <li className="item"><a className="github" href="http://github.com/zhao-jun" />https://github.com/zhao-jun</li>
                            <li className="item"><a className="mail" />@foxmail.com</li>
                        </ul>
                    </div>
                </figcaption>
            </figure>
        </div>
        <Footer />
    </div>
);*/

export default About;