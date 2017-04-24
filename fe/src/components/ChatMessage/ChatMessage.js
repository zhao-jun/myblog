import React from  'react';
import './ChatMessage.scss';

import avatar from '../../styles/avatar.png';

const ChatMessage = ({data,loginBoxData}) => (
    (loginBoxData.name == data.name)?
        <li className="chatMessageSelf">
            <img className="chatAvatar" src={avatar} />
            <div className="chatWrap">
                <p className="info"><span className="chatTime">{data.time}</span><span className="chatName">{data.name}</span></p>
                <p className="chatMsg">{data.message}</p>
            </div>
        </li>:
        <li className="chatMessage">
            <img className="chatAvatar" src={avatar} />
            <div className="chatWrap">
                <p><span className="chatName">{data.name}</span><span className="chatTime">{data.time}</span></p>
                <p className="chatMsg">{data.message}</p>
            </div>
        </li>
);

export default ChatMessage;
