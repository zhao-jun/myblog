import React from  'react';
import './PageItem.scss';
import { Link } from 'react-router';

import avatar from '../../styles/avatar.png';

const PageItem = ({page,loginBoxData,getPageData}) => (
    <li className="pageItem">
        <div className="left">
            <div className="comment">
                <span>{page.commentsCount || 0}</span>
                <span>评论</span>
            </div>
            <span className="pv">
                <span>{page.pv || 0}</span>
                <span>阅读</span>
            </span>
        </div>
        <div className="right">
            <div className="title"><Link className="link" to={"/a/"+page._id}>{page.title}</Link></div>
            <div className="describe">{page.content.replace(/#|\s/g,'')}</div>
            <div className="user">
                <img className="photo" src={avatar} />
                <span className="user-name"><Link to={"/page?author="+page.name} className="nameLink link" onClick={()=>getPageData("?author="+page.name)}>{page.author.name}</Link></span>
                <span className="date">{page.date}</span>
            </div>
            <div style={{display:loginBoxData.name == page.author.name?'none':'none'}}>删除</div>
        </div>
    </li>
);

export default PageItem;