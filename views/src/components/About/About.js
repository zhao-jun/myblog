import React from  'react';
import './About.scss';

import Banner from './../Banner/Banner';

const About = () => (
    <div>
        <Banner />
        <div className="about">
            <div className="aboutWrap">
                <h3>关于网站</h3>
                <ul>
                    <li>主要更新技术文章、教程和日志</li>
                    <li>不断用些新技术改版</li>
                </ul>
                <h3>联系方式</h3>
                <ul>
                    <li className="item"><a className="github" href="http://github.com/zhao-jun" />https://github.com/zhao-jun</li>
                    <li className="item"><a className="mail" /></li>
                </ul>
            </div>
        </div>
    </div>
);

export default About;