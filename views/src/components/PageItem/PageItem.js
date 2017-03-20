import React from  'react';
import './PageItem.scss';

const PageItem = ({page}) => (
    <li className="pageItem">
        <div className="title">{page.title}</div>
        <div className="describe">{page.content}</div>
        <div className="info">
            作者：{page.author.name} &nbsp;&nbsp;
            发布时间：{page.date}&nbsp;&nbsp;
            阅读量：{page.pv}&nbsp;&nbsp;
        </div>
    </li>
);

export default PageItem;