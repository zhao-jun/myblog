import React from  'react';
import {Link} from 'react-router';
import './Other.scss'

const Other = ({}) => (
    <ul className="other">
        <li className="otherItem">
            <Link to="/canvasBg" className="link otherLink">
                <p className="title">Canvas</p>
            </Link>
        </li>
    </ul>
);

export default Other;