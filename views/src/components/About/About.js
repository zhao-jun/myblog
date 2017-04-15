import React from  'react';
import './About.scss';

import Banner from './../Banner/Banner';
import Footer from './../Footer/Footer';

import AboutBgLarge from './AboutBgLarge.png';
import AboutBgMiddle from './AboutBgMiddle.png';
import AboutBgSmall from './AboutBgSmall.png';
import AboutBgApp from './AboutBgApp.png';


export class About extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillUpdate() {
    }

    render() {
        let AboutBg;
        if(window.innerWidth>1280){
            AboutBg = AboutBgLarge;
        } else if (window.innerWidth>750) {
            AboutBg = AboutBgMiddle;
        } else if (window.innerWidth>450){
            AboutBg = AboutBgSmall;
        }else {
            AboutBg = AboutBgApp;
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
                                <h3>网站</h3>
                                    <ul>
                                        <li>更新技术文章、教程和日志</li>
                                        <li>尝试新技术改版</li>
                                    </ul>
                                    <h3>联系方式</h3>
                                    <ul>
                                        <li className="item"><a className="github" href="http://github.com/zhao-jun"/>zhao-jun
                                        </li>
                                        <li className="item"><a className="mail"/>@foxmail.com</li>
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