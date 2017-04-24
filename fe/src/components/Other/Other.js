import React from  'react';
import {Link} from 'react-router';
import './Other.scss'

import Footer from './../Footer/Footer';

const Other = ({}) => (
    <div>
    <ul className="other">
        <li className="otherItem">
            <Link to="/canvasBg" className="link otherLink">
                <p className="title">Canvas</p>
            </Link>
        </li>
    </ul>
    <Footer />
    </div>
);

export default Other;