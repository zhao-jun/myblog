import React from  'react';
import { Link } from 'react-router';

import './Tags.scss';

const Tags = ({getBlogData}) => (
    <div className="tags">
        <h3>Tags</h3>
        <ul>
            <li className='tag-item'><Link to="/blog" onClick={()=>getBlogData()} className="link">all</Link></li>
            <li className='tag-item'><Link to="/blog?category=日志" onClick={()=>getBlogData('?category=日志')} className="link">日志</Link></li>
        </ul>
    </div>
);

export default Tags;