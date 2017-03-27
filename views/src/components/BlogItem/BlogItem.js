import React from  'react';
import { Link } from 'react-router';

import './BlogItem.scss';

const BlogItem = () => (
    <li className="blogItem">
        <h2><Link>我是主标题</Link></h2>
        <p className="summary">概述内容概述内容概述内容概述内容概述内容概述内容概述内容概述内容概述内容概述内容概述内容概述内容概述内容概述内容概述内容概述内容概述内容概述内容</p>
        <div className="info"><span>发表时间:</span><span>分类:</span></div>
    </li>
);

export default BlogItem;