import React from  'react';
import './ChatInfo.scss';

import avatar from '../../styles/avatar.png';

const ChatInfo = ({data}) => (
    data.type == 'in'?
    <li className="ChatInfo">
        <span>欢迎</span>
        <img className="chatAvatar" src={avatar} />
        <span className="chatName">{data.user.name}</span>
        <span>加入聊天室</span>
    </li>:
    <li className="ChatInfo">
        <img className="chatAvatar" src={avatar} />
        <span className="chatName">{data.user.name}</span>
        <span>离开了聊天室</span>
    </li>
);

export default ChatInfo;