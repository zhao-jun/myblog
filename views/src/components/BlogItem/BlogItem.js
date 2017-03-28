import React from  'react';
import { Link } from 'react-router';

import './BlogItem.scss';

const BlogItem = ({blog}) => (
    <li className="blogItem">
        <h2><Link className="link" to={"/blog/"+blog._id}>{blog.title}</Link></h2>
        <p className="summary">{blog.content.replace(/#|\s/g,'').slice(0,100)+'...'}</p>
        <div className="info"><span>发表时间:{blog.date}</span><span>分类:{blog.category}</span></div>
    </li>
);

export default BlogItem;