import React from  'react';
import {Link} from 'react-router';

import './Page404.scss';

const Page404 = () => (
    <div className="page404">
        <p className="describe">404,来到了未知地带</p>
        <Link to="/" className="link">回到首页</Link>
    </div>
);

export default Page404;